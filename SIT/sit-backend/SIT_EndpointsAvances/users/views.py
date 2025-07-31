from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, get_user_model
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from academics.models import Students

from .serializers import UserSerializer, LoginSerializer, UserUpdateSerializer
from .tokens import account_activation_token

User = get_user_model()

class UserRegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        token = account_activation_token.make_token(user)
        activation_link = f"http://localhost:8000/api/users/activate/{user.id_user}/{token}/"
        print(f"\n🔗 Enlace de activación: {activation_link}\n")
        return user

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({"message": "Usuario registrado. Revisa el enlace de activación en consola."}, status=status.HTTP_201_CREATED)


class ActivateUserView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uid, token):
        user = get_object_or_404(User, id_user=uid)

        if account_activation_token.check_token(user, token):
            user.status = 'A'
            user.is_active = True
            user.save()

            # 🔁 Actualiza el estado del estudiante
            try:
                student = Students.objects.get(email=user.email)
                student.status = 'A'
                student.save(using='default')  # Asegura que se guarde si tienes múltiples DBs
            except Students.DoesNotExist:
                pass  # Puedes registrar un log si lo necesitas

            return Response({"message": "Cuenta activada correctamente."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Token inválido o expirado."}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    @swagger_auto_schema(
        operation_summary="Login de usuario",
        request_body=LoginSerializer,
        responses={
            200: openapi.Response(
                description="Login exitoso",
                examples={
                    "application/json": {
                        "refresh": "token_refresh",
                        "access": "token_access"
                    }
                }
            ),
            401: "Credenciales inválidas",
            403: "Cuenta no activada"
        },
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = authenticate(request, username=email, password=password)

        if user is not None:
            if user.status != 'A':
                return Response({"error": "Cuenta no activada."}, status=status.HTTP_403_FORBIDDEN)

            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        return Response({"error": "Credenciales inválidas."}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Logout del usuario",
        security=[{'Bearer': []}],  # Aquí decimos que esta ruta usa autenticación Bearer JWT
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["refresh"],
            properties={
                "refresh": openapi.Schema(type=openapi.TYPE_STRING, description="Refresh token para invalidar")
            }
        ),
        responses={
            200: openapi.Response(description="Logout exitoso"),
            400: openapi.Response(description="Token inválido o expirado"),
            401: openapi.Response(description="No autenticado"),
        },
    )
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logout exitoso."}, status=200)
        except TokenError as e:
            return Response({"error": f"Token inválido o expirado: {str(e)}"}, status=400)
        

class ListUsersView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Puedes personalizar el permiso según el rol


class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, user_id):
        user = get_object_or_404(User, id_user=user_id)
        
        
        try:
            student = Students.objects.get(email=user.email)
            student.delete()
        except Students.DoesNotExist:
            pass

        user.delete()
        return Response({"message": "Usuario eliminado correctamente."}, status=status.HTTP_200_OK)


class UpdateUserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=UserUpdateSerializer)
    def put(self, request):
        user = request.user
        serializer = UserUpdateSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        for field, value in serializer.validated_data.items():
            setattr(user, field, value)
        user.save()

        return Response({
            "message": "Datos actualizados correctamente.",
            "user": {
                "id_user": user.id_user,
                "name": user.name,
                "last_name": user.last_name,
                "email": user.email,
                "status": user.status
            }
        }, status=status.HTTP_200_OK)
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from academics.models import Students

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id_user', 'name', 'last_name', 'email', 'password', 'status', 'id_role']
        extra_kwargs = {
            'password': {'write_only': True},
            'id_user': {'read_only': True},
            'status': {'read_only': True},
            'id_role': {'read_only': True},
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("El email ya está registrado.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # Usa método de Django para hashear la contraseña
        user.status = 'I'  # Inactivo por defecto
        user.id_role = 1   # Rol estudiante por defecto
        user.save()

        Students.objects.create(
            id_student=user.id_user,
            name=user.name,
            last_name=user.last_name,
            email=user.email,
            status='I'
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(required=False, max_length=150)
    last_name = serializers.CharField(required=False, max_length=150)
    email = serializers.EmailField(required=False)

    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.filter(email=value).exclude(id_user=user.id_user).exists():
            raise serializers.ValidationError("Este correo ya está en uso por otro usuario.")
        return value

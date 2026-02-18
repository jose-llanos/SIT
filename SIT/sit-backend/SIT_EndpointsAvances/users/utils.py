# users/utils.py
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from urllib.parse import urlencode

def generate_activation_token(user):
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token)

def send_activation_email(user, token):
    base_url = "http://localhost:8000/api/users/activate/"  # Ajusta si es necesario
    params = urlencode({"token": token})
    activation_link = f"{base_url}?{params}"

    subject = "Activa tu cuenta"
    message = f"Hola {user.name},\n\nActiva tu cuenta haciendo clic en el siguiente enlace:\n\n{activation_link}\n\nGracias por registrarte."
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list)

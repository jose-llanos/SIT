# settings.py

from pathlib import Path
from datetime import timedelta

# === BASE PATH ===
BASE_DIR = Path(__file__).resolve().parent.parent


# === SEGURIDAD ===
SECRET_KEY = 'django-insecure-l3r*jxcj=l)b)v$puz7_%ngm=4pjhp*nfk+vcwzl6^mco@t8ty'
DEBUG = True
ALLOWED_HOSTS = []

# === APLICACIONES INSTALADAS ===
INSTALLED_APPS = [
    # Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Terceros
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',  # Necesario para logout con blacklist
    'drf_yasg',
    'corsheaders',

    # Apps propias
    'academics',
    'users',
]

# === MIDDLEWARE ===
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# === CORS ===
CORS_ALLOW_ALL_ORIGINS = True  # Permitir frontend externo durante desarrollo


# === URLs y WSGI ===
ROOT_URLCONF = 'microservices_project.urls'
WSGI_APPLICATION = 'microservices_project.wsgi.application'


# === TEMPLATES ===
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# === BASE DE DATOS ===
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'sit',
        'USER': 'postgres',
        'PASSWORD': '1306',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


# === AUTH ===
# Si usas modelo personalizado:
AUTH_USER_MODEL = 'users.User'

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# === INTERNACIONALIZACIÓN ===
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# === ARCHIVOS ESTÁTICOS ===
STATIC_URL = 'static/'


# === CONFIG GLOBAL ===
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# === EMAIL (consola / SMTP real) ===
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
DEFAULT_FROM_EMAIL = 'no-reply@tuservicio.com'

# Para SMTP real (descomenta y configura):
# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
# EMAIL_HOST = "smtp.gmail.com"
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = "tu_correo@gmail.com"
# EMAIL_HOST_PASSWORD = "tu_contraseña_o_token"
# DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


# === DRF ===
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}


# === JWT SIMPLEJWT ===
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,

    'USER_ID_FIELD': 'id_user',  # tu campo PK personalizado
    'USER_ID_CLAIM': 'user_id',  # claim en el token para identificar usuario

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),

    # Añadir esta línea para que use tu modelo User en blacklist y token outstanding
    'TOKEN_USER_CLASS': 'users.models.User',
}

##Swagger settings

SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'Bearer': {
            'type': 'apiKey',
            'description': 'JWT Authorization header usando el esquema Bearer. Ejemplo: "Bearer {token}"',
            'name': 'Authorization',
            'in': 'header',
        }
    },
}


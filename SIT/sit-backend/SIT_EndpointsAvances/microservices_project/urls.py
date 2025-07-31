# microservices_project/urls.py

from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from academics.views import api_home

schema_view = get_schema_view(
    openapi.Info(
        title="SIT - Sistema de Intervención Temprana",
        default_version='v1',
        description="Plataforma para la gestión académica ...",
        terms_of_service="https://www.situacion-temprana.edu/terminos/",
        contact=openapi.Contact(email="soporte@sit.edu"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('', api_home, name='api-home'),  # Página principal
    path('admin/', admin.site.urls),
    path('api/', include('academics.urls')),
    path('api/users/', include('users.urls')),

    # Documentación Swagger + JSON/YAML
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    # Documentación bonita ReDoc
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

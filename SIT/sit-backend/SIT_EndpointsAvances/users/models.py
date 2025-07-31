from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El email es obligatorio")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.status = user.status or 'I'  # por defecto inactivo
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('id_role', 0)  # ajustar según convenga
        extra_fields.setdefault('status', 'A')
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser debe tener is_staff=True")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser debe tener is_superuser=True")

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    id_user = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    status = models.CharField(max_length=1)
    id_role = models.IntegerField()

    is_staff = models.BooleanField(default=False)  # para admin panel
    is_active = models.BooleanField(default=True)

    objects = UserManager()



    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'last_name', 'id_role']

    class Meta:
        db_table = 'user'
        managed = False  # Muy importante: NO Django no creará/alterará esta tabla

    def save(self, *args, **kwargs):
        self.is_active = (self.status == 'A')
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.email} ({self.name} {self.last_name})"

from django.urls import path
from .views import DeleteUserView, ListUsersView, LogoutView, UpdateUserInfoView, UserRegisterView, ActivateUserView, LoginView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('activate/<int:uid>/<str:token>/', ActivateUserView.as_view(), name='user-activate'),
    path('login/', LoginView.as_view(), name='user-login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('all/', ListUsersView.as_view(), name='list-users'),
    path('delete/<int:user_id>/', DeleteUserView.as_view(), name='delete-user'),
    path('update-profile/', UpdateUserInfoView.as_view(), name='update-profile'),

]

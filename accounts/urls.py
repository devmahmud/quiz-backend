from django.urls import path
from rest_framework.generics import ListAPIView


from .views import (
    UserView,
    LoginApiView,
    RetrieveUpdateProfileView
)

urlpatterns = [
    path('users/', UserView.as_view(), name="users"),
    path('auth/login/', LoginApiView.as_view(), name="login"),
    path('auth/profile/', RetrieveUpdateProfileView.as_view(), name="profile"),
    path('logout/', LogoutView.as_view(), name="logout")

    path('auth/change-password/',
         ChangePasswordView.as_view(), name="change_password"),

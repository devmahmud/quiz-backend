from django.urls import path

from .views import (
    UserView,
    CreateTokenView,
    RetrieveUpdateProfileView,
    ChangePasswordView,
    LogoutView
)

urlpatterns = [
    path('users/', UserView.as_view(), name="users"),
    path('auth/token/', CreateTokenView.as_view(), name="login"),
    path('auth/profile/', RetrieveUpdateProfileView.as_view(), name="profile"),
    path('auth/logout/', LogoutView.as_view(), name="logout"),
    path('auth/change-password/',
         ChangePasswordView.as_view(), name="change_password"),
]

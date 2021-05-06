from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q
from django.contrib.auth import get_user_model

User = get_user_model()


class EmailOrPhoneModelBackend(ModelBackend):
    """
    Authentication backend which allows users to authenticate using either their
    email or phone number
    """

    def authenticate(self, request, email_or_phone=None, password=None):
        try:
            user = User.objects.get(
                Q(email=email_or_phone) | Q(phone=email_or_phone)
            )
            pwd_valid = user.check_password(password)
            if pwd_valid:
                return user
            return None
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

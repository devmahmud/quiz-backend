from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.db.models import Q


User = get_user_model()


class UserView(generics.CreateAPIView):
    serializer_class = UserSerializer

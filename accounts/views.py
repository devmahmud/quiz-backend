from django.contrib.auth import logout
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from rest_framework.authtoken.views import ObtainAuthToken


from .serializers import (
    UserSerializer, ChangePasswordSerializer, AuthTokenSerializer)

User = get_user_model()


class UserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    serializer_class = AuthTokenSerializer


class RetrieveUpdateProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)
    authentication_classes = [TokenAuthentication, BasicAuthentication]

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    authentication_classes = [TokenAuthentication, BasicAuthentication]

    def get(self, request, format=None):
        logout(request)
        return Response(status=status.HTTP_200_OK)

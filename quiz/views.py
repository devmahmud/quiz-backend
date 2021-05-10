from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User

from .models import Quiz, Sitting
from .serializers import QuizDetailSerializer, QuizSerializer, SittingSerializer


class QuizListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()


class QuizDetailView(RetrieveAPIView):
    serializer_class = QuizDetailSerializer
    queryset = Quiz.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class SittingApiView(RetrieveAPIView):
    queryset = Quiz.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        sitting = Sitting.objects.user_sitting(request.user, instance)

        if sitting:
            serializer = SittingSerializer(sitting)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_226_IM_USED)

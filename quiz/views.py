from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Quiz
from .serializers import QuizDetailSerializer, QuizSerializer


class QuizListView(ListAPIView):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()


class QuizDetailView(RetrieveAPIView):
    serializer_class = QuizDetailSerializer
    queryset = Quiz.objects.all()

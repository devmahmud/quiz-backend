from rest_framework.generics import ListAPIView

from .models import Quiz
from .serializers import QuizSerializer


class QuizListView(ListAPIView):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()

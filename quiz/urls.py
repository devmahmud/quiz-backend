from django.urls import path

from .views import (
    QuizListView
)

urlpatterns = [
    path('quizzes/', QuizListView.as_view(), name="quiz_list"),
]

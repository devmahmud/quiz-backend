from django.urls import path

from .views import (
    QuizListView,
    QuizDetailView,
    SittingApiView
)

urlpatterns = [
    path('quizzes/', QuizListView.as_view(), name="quiz_list"),
    path('quizzes/<int:pk>/', QuizDetailView.as_view(), name="quiz_details"),
    path('quizzes/<int:pk>/sitting/',
         SittingApiView.as_view(), name="quiz_details"),
]

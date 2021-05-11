from django.urls import path

from .views import (
    QuizListView,
    QuizDetailView,
    SittingApiView,
    QuestionApiView,
    SummaryApiView
)

urlpatterns = [
    path('quizzes/', QuizListView.as_view(), name="quiz_list"),
    path('quizzes/<int:pk>/', QuizDetailView.as_view(), name="quiz_details"),
    path('quizzes/<int:pk>/sitting/',
         SittingApiView.as_view(), name="user_sitting"),
    path('sitting/<int:pk>/question/',
         QuestionApiView.as_view(), name="question_details"),
    path('sitting/<int:pk>/summary/',
         SummaryApiView.as_view(), name="summary"),
]

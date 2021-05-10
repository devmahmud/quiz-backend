from quiz.models import Quiz
from rest_framework import serializers

from .models import Question, Quiz, Sitting


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class QuizSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Quiz
        fields = ['id', 'name', 'category']


class QuizDetailSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Quiz
        fields = ['id', 'name', 'category', 'description',
                  'total_question',  'total_distance']


class SittingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sitting
        fields = "__all__"

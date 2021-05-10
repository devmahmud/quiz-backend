from quiz.models import Quiz
from rest_framework import serializers

from .models import Quiz


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

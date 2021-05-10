from quiz.models import Quiz
from django.db import models
from rest_framework import serializers

from .models import Quiz


class QuizSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Quiz
        fields = ['id', 'name', 'category']

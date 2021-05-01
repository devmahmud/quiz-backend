from django.contrib.gis.db import models
from django.contrib.gis.geos import Point


class DifficultyChoice(models.TextChoices):
    EASY = "1", "Easy"
    MEDIUM = "2", "Medium"
    HARD = "3", "Hard"


class Question(models.Model):
    pretext = models.TextField()
    question = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    hints = models.TextField(blank=True)
    theme_tag = models.CharField(max_length=100, blank=True)
    difficulty = models.CharField(
        max_length=2, choices=DifficultyChoice.choices)
    location = models.PointField(default=Point(13.4050, 52.5200))

    created = models.DateTimeField(auto_now_add=True)

    @property
    def longitude(self):
        return self.location.x

    @property
    def latitude(self):
        return self.location.y

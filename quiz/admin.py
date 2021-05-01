from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin

from .models import Question


@admin.register(Question)
class QuestionAdmin(OSMGeoAdmin):
    list_display = ('question', 'location')

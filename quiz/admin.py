from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin

from .models import Category, Question, Quiz, Sitting


@admin.register(Question)
class QuestionAdmin(OSMGeoAdmin):
    list_display = ('question', 'location')


admin.site.register(Category)
admin.site.register(Quiz)
admin.site.register(Sitting)

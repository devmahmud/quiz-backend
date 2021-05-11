import json
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from sortedm2m.fields import SortedManyToManyField
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model
from django.core.validators import validate_comma_separated_integer_list
from django.core.exceptions import ImproperlyConfigured
from django.utils.timezone import now
from geopy import distance


User = get_user_model()


class DifficultyChoice(models.TextChoices):
    EASY = "1", "Easy"
    MEDIUM = "2", "Medium"
    HARD = "3", "Hard"


class Category(models.Model):
    name = models.CharField(max_length=50)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Question(models.Model):
    pretext = models.TextField(verbose_name=_("Pre-Text"))
    question = models.CharField(max_length=255,  verbose_name=_("Question"))
    answer = models.CharField(max_length=255, verbose_name=_("Answer"))
    hints = models.TextField(blank=True, verbose_name=_("Hints"))
    theme_tag = models.CharField(
        max_length=100, blank=True, verbose_name=_("Theme Tag"))
    difficulty = models.CharField(
        max_length=2, choices=DifficultyChoice.choices, verbose_name=_("Difficulty"))
    location = models.PointField(
        geography=True, default=Point(13.4050, 52.5200), verbose_name=_("Geolocation"))

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)

    @property
    def longitude(self):
        return self.location.x

    @property
    def latitude(self):
        return self.location.y

    def __str__(self):
        return self.question


class Quiz(models.Model):
    name = models.CharField(max_length=255, verbose_name=_("Name"))
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="category_quizzes")
    description = models.TextField()
    questions = SortedManyToManyField(Question, verbose_name=_("Questions"))
    random_order = models.BooleanField(
        blank=False, default=False, verbose_name=_("Random Order"))
    single_attempt = models.BooleanField(
        blank=False, default=True, verbose_name=_("Single Attempt"))
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)

    @property
    def total_question(self):
        return self.questions.all().count()

    @property
    def total_distance(self):
        question_list = list(self.questions.values_list('location', flat=True))
        return round(distance.distance(*question_list).km, 2)

    class Meta:
        verbose_name_plural = 'Quizzes'

    def __str__(self):
        return self.name


class SittingManager(models.Manager):

    def new_sitting(self, user, quiz):
        if quiz.random_order is True:
            question_set = quiz.questions.all().order_by('?')
        else:
            question_set = quiz.questions.all()

        question_set = [item.id for item in question_set]

        if len(question_set) == 0:
            raise ImproperlyConfigured('Question set of the quiz is empty. '
                                       'Please configure questions properly')

        questions = ",".join(map(str, question_set)) + ","

        new_sitting = self.create(user=user,
                                  quiz=quiz,
                                  question_order=questions,
                                  question_list=questions,
                                  incorrect_questions="",
                                  current_score=0,
                                  complete=False,
                                  user_answers='{}')
        return new_sitting

    def user_sitting(self, user, quiz):
        if quiz.single_attempt is True and self.filter(user=user, quiz=quiz, complete=True).exists():
            return False

        try:
            sitting = self.get(user=user, quiz=quiz, complete=False)
        except Sitting.DoesNotExist:
            sitting = self.new_sitting(user, quiz)
        except Sitting.MultipleObjectsReturned:
            sitting = self.filter(user=user, quiz=quiz, complete=False)[0]
        return sitting


class Sitting(models.Model):
    user = models.ForeignKey(User, verbose_name=_(
        "User"), on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, verbose_name=_(
        "Quiz"), on_delete=models.CASCADE)

    question_order = models.CharField(
        max_length=1024,
        verbose_name=_("Question Order"),
        validators=[validate_comma_separated_integer_list])

    question_list = models.CharField(
        max_length=1024,
        verbose_name=_("Question List"),
        validators=[validate_comma_separated_integer_list])

    incorrect_questions = models.CharField(
        max_length=1024,
        blank=True,
        verbose_name=_("Incorrect questions"),
        validators=[validate_comma_separated_integer_list])
    current_score = models.IntegerField(verbose_name=_("Current Score"))
    complete = models.BooleanField(default=False, blank=False,
                                   verbose_name=_("Complete"))
    user_answers = models.TextField(blank=True, default='{}',
                                    verbose_name=_("User Answers"))
    start = models.DateTimeField(auto_now_add=True,
                                 verbose_name=_("Start"))
    end = models.DateTimeField(null=True, blank=True, verbose_name=_("End"))

    objects = SittingManager()

    def __str__(self):
        return f"{self.user.username} - {self.quiz.name}"

    def get_first_question(self):
        """
        Returns the next question.
        If no question is found, returns False
        Does NOT remove the question from the front of the list.
        """
        if not self.question_list:
            return False

        first, _ = self.question_list.split(',', 1)
        question_id = int(first)
        return Question.objects.filter(id=question_id).first()

    def remove_first_question(self):
        if not self.question_list:
            return

        _, others = self.question_list.split(',', 1)
        self.question_list = others
        self.save()

    def add_to_score(self, points):
        self.current_score += int(points)
        self.save()

    def _question_ids(self):
        return [int(n) for n in self.question_order.split(',') if n]

    @property
    def get_percent_correct(self):
        dividend = float(self.current_score)
        divisor = len(self._question_ids())
        if divisor < 1:
            return 0

        if dividend > divisor:
            return 100

        correct = int(round((dividend / divisor) * 100))

        if correct >= 1:
            return correct
        else:
            return 0

    def mark_quiz_complete(self):
        self.complete = True
        self.end = now()
        self.save()

    def add_incorrect_question(self, question):
        """
        Adds uid of incorrect question to the list.
        The question object must be passed in.
        """
        if len(self.incorrect_questions) > 0:
            self.incorrect_questions += ','
        self.incorrect_questions += str(question.id) + ","
        if self.complete:
            self.add_to_score(-1)
        self.save()

    @property
    def get_incorrect_questions(self):
        """
        Returns a list of non empty integers, representing the pk of
        questions
        """
        return [int(q) for q in self.incorrect_questions.split(',') if q]

    def remove_incorrect_question(self, question):
        current = self.get_incorrect_questions
        current.remove(question.id)
        self.incorrect_questions = ','.join(map(str, current))
        self.add_to_score(1)
        self.save()

    def add_user_answer(self, question, guess):
        current = json.loads(self.user_answers)
        current[question.id] = guess
        self.user_answers = json.dumps(current)
        self.save()

    def get_questions(self, with_answers=False):
        question_ids = self._question_ids()
        questions = sorted(
            self.quiz.questions.filter(id__in=question_ids),
            key=lambda q: question_ids.index(q.id))

        if with_answers:
            user_answers = json.loads(self.user_answers)
            for question in questions:
                question.user_answer = user_answers[str(question.id)]

        return questions

    @property
    def questions_with_user_answers(self):
        return {
            q: q.user_answer for q in self.get_questions(with_answers=True)
        }

    @property
    def correct_amount(self):
        return self.quiz.total_question - len(self.get_incorrect_questions)

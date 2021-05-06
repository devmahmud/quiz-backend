from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **options):
        USERNAME = "admin"
        PASSWORD = "admin"
        EMAIL = "admin@adbazar.net"

        User = get_user_model()
        if not User.objects.filter(username=USERNAME).exists():
            User.objects.create_superuser(
                USERNAME, EMAIL, PASSWORD)
            self.stdout.write(self.style.SUCCESS('Admin user has created'))
        else:
            self.stdout.write(self.style.ERROR('Admin user already exists'))

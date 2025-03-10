import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from movies_collection.models import Movie, Reaction


class Command(BaseCommand):
    help = "Генерация случайных реакций для фильмов"

    def handle(self, *args, **kwargs):
        users = list(get_user_model().objects.exclude(username="admin"))
        movies = list(Movie.objects.all())
        reaction_types = [choice[0] for choice in Reaction.REACTION_CHOICES]

        if not users:
            self.stdout.write(self.style.ERROR("Нет доступных пользователей (кроме admin)!"))
            return

        if not movies:
            self.stdout.write(self.style.ERROR("Нет фильмов в базе!"))
            return

        count = 0
        for movie in movies:
            selected_reactions = random.sample(reaction_types, 5)

            for reaction_type in selected_reactions:
                num_reactions = random.randint(3, 10)
                selected_users = random.sample(users, min(num_reactions, len(users)))

                for user in selected_users:
                    Reaction.objects.get_or_create(user=user, movie=movie, reaction=reaction_type)
                    count += 1

        self.stdout.write(self.style.SUCCESS(f"Добавлено {count} случайных реакций!"))

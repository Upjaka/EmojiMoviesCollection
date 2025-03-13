from django.db import models
from django.contrib.auth import get_user_model


class Movie(models.Model):
    title = models.TextField(max_length=255, verbose_name="Название")
    year = models.PositiveIntegerField(verbose_name="Год выпуска")
    genres = models.TextField(verbose_name="Жанры")
    director = models.CharField(max_length=255, blank=True, verbose_name="Режиссер")
    poster = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.title


class Reaction(models.Model):
    REACTION_CHOICES = [
        ('like', '👍 Нравится'),
        ('funny', '🤣 Смешно'),
        ('love', '😍 Обожаю'),
        ('sad', '😢 Грустно'),
        ('shocked', '😱 Шок'),
        ('mindblown', '🤯 Взрыв мозга'),
        ('respect', '\U0001FAE1 Уважение'),
        ('dislike', '👎 Не нравится'),
        ('clown', '🤡 Клоун'),
        ('poop', '💩 Полный отстой'),
        ('heart', '❤️ Любовь'),
        ('thinking', '🤔 Думаю'),
        ('angry', '😡 Злюсь'),
        ('fire', '🔥 Огонь'),
        ('ghost', '👻 Жутко'),
    ]

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='reactions',
                             verbose_name="Пользователь")
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reactions', verbose_name="Фильм")
    reaction = models.CharField(max_length=10, choices=REACTION_CHOICES, verbose_name="Реакция")

    def __str__(self):
        return f'{self.user.username} - {self.reaction} on {self.movie.title}'

    class Meta:
        verbose_name = "Reactions"
        verbose_name_plural = "Reactions"

        constraints = [
            models.UniqueConstraint(
                fields=["user", "movie", "reaction"],
                name="unique_user_movie_reaction"
            )
        ]

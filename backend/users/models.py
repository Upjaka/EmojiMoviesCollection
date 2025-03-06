from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):

    GENRE_CHOICES = [
        ('action', 'Боевик'),
        ('comedy', 'Комедия'),
        ('drama', 'Драма'),
        ('fantasy', 'Фэнтези'),
        ('horror', 'Ужасы'),
        ('romance', 'Романтика'),
        ('sci-fi', 'Научная фантастика'),
        ('thriller', 'Триллер'),
        ('animation', 'Анимация'),
    ]

    age = models.PositiveIntegerField(null=True, blank=True, verbose_name="Возраст")
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True, verbose_name="Аватар")
    favorite_genres = models.CharField(max_length=50, choices=GENRE_CHOICES, null=True, blank=True, verbose_name="Любимые жанры")

    def __str__(self):
        return self.username

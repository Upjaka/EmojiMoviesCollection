from django.db import models

class Movie(models.Model):
    GENRE_CHOICES = [
        ('Action', 'Боевик'),
        ('Comedy', 'Комедия'),
        ('Drama', 'Драма'),
        ('Fantasy', 'Фэнтези'),
        ('Horror', 'Ужасы'),
        ('Mystery', 'Мистика'),
        ('Romance', 'Романтика'),
        ('Sci-Fi', 'Научная фантастика'),
        ('Thriller', 'Триллер'),
        ('Animation', 'Анимация'),
        ('Documentary', 'Документальный'),
    ]

    title = models.CharField(max_length=255, verbose_name="Название")
    release_year = models.PositiveIntegerField(verbose_name="Год выпуска")
    genres = models.CharField(max_length=255, choices=GENRE_CHOICES, verbose_name="Жанр")
    director = models.CharField(max_length=255, blank=True, verbose_name="Режиссер")

    def __str__(self):
        return self.title

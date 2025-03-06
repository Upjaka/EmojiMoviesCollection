from django.contrib import admin
from .models import Movie, Reaction


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_year', 'genres', 'director')
    list_filter = ('genres', 'release_year')
    search_fields = ['title']


@admin.register(Reaction)
class ReactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'movie', 'reaction')
    list_filter = ('reaction', 'movie', 'user')
    search_fields = ('user__username', 'movie__title', 'reaction')

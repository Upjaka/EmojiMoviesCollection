from django.contrib import admin
from .models import Movie

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_year', 'genres', 'director')
    list_filter = ('genres', 'release_year')
    search_fields = ['title']

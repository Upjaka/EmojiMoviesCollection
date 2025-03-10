import requests
from django.core.management.base import BaseCommand

from backend.movies_collection.models import Movie

BASE_URL = "https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=id&selectFields=externalId&selectFields=name&selectFields=enName&selectFields=type&selectFields=year&selectFields=releaseYears&selectFields=rating&selectFields=movieLength&selectFields=genres&selectFields=countries&selectFields=poster&selectFields=logo&selectFields=votes&selectFields=persons&notNullFields=name&notNullFields=enName&notNullFields=votes.kp&sortField=name&sortType=1&type=movie&status=&year=1990-2025&votes.kp=1000-9999999&persons.enProfession=director"

HEADERS = {
    "accept": "application/json",
    "X-API-KEY": "E0FJS8P-3834HFY-PJ46CDK-6HTT00C"
}

def fetch_movies():
    response = requests.get(BASE_URL, headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    else:
        print("Ошибка запроса:", response.status_code)
        return None


def extract_director(persons):
    """Ищет первого режиссера в списке persons"""
    if not persons:
        return ""  # Если список пустой, возвращаем пустую строку
    for person in persons:
        if person.get("enProfession") == "director":
            return person.get("name", "")
    return ""  # Если режиссер не найден, возвращаем пустую строку


def save_movies_to_db(movies_data):
    for movie_data in movies_data:
        title = movie_data.get("name")
        release_year = movie_data.get("year")

        genres = movie_data.get("genres", [])
        genres_text = ', '.join([genre['name'] for genre in genres])  # Список жанров в строку

        poster_url = movie_data.get("poster", {}).get("url")

        director = extract_director(movie_data.get("persons", []))  # Извлекаем режиссера

        movie, created = Movie.objects.get_or_create(
            title=title,
            release_year=release_year,
            defaults={
                "genres": genres_text,
                "director": director,
                "poster": poster_url
            }
        )

        if created:
            print(f"Добавлен фильм: {title} ({release_year})")
        else:
            print(f"Фильм уже существует: {title} ({release_year})")


class Command(BaseCommand):
    help = "Fetch movies from Kinopoisk API and save them to the database."

    def handle(self, *args, **kwargs):
        movies_data = fetch_movies()
        if movies_data:
            save_movies_to_db(movies_data.get("docs", []))
            self.stdout.write(self.style.SUCCESS("Фильмы загружены в базу!"))

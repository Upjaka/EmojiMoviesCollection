import requests
from django.core.management.base import BaseCommand
from movies_collection.models import Movie

BASE_URL = "https://api.kinopoisk.dev/v1.4/movie"
HEADERS = {
    "accept": "application/json",
    "X-API-KEY": "E0FJS8P-3834HFY-PJ46CDK-6HTT00C"
}
PARAMS = {
    "page": 1,
    "limit": 12,
    "selectFields": [
        "id", "externalId", "name", "enName", "type", "year", "movieLength",
        "genres", "countries", "poster", "votes", "persons"
    ],
    "notNullFields": ["name", "votes.kp", "persons.enProfession"],
    "sortField": "votes.imdb",
    "sortType": -1,
    "type": "movie",
    "year": "1990-2025",
    "votes.kp": "1000-9999999",
    "persons.enProfession": "director"
}


def fetch_movies(num_pages=1):
    """Загружает указанное количество страниц с фильмами"""
    all_movies = []
    for page in range(1, num_pages + 1):
        PARAMS["page"] = page
        response = requests.get(BASE_URL, headers=HEADERS, params=PARAMS)

        if response.status_code != 200:
            print(f"Ошибка запроса (страница {page}):", response.status_code)
            break

        data = response.json()
        movies = data.get("docs", [])
        if not movies:
            print("Фильмы закончились.")
            break

        all_movies.extend(movies)
        print(f"Загружена страница {page}, фильмов: {len(movies)}")

    return all_movies


def extract_director(persons):
    """Ищет первого режиссера в списке persons"""
    for person in persons or []:
        if person.get("enProfession") == "director":
            return person.get("name", "")
    return ""


def save_movies_to_db(movies_data):
    for movie_data in movies_data:
        title = movie_data.get("name")
        release_year = movie_data.get("year")
        genres_text = ', '.join([genre['name'] for genre in movie_data.get("genres", [])])
        poster_url = movie_data.get("poster", {}).get("url")
        director = extract_director(movie_data.get("persons", []))

        movie, created = Movie.objects.get_or_create(
            title=title,
            year=release_year,
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

    def add_arguments(self, parser):
        parser.add_argument("num_pages", type=int, nargs="?", default=1, help="Количество страниц для загрузки")

    def handle(self, *args, **options):
        num_pages = options["num_pages"]
        movies_data = fetch_movies(num_pages)
        if movies_data:
            save_movies_to_db(movies_data)
            self.stdout.write(self.style.SUCCESS(f"Загружено {len(movies_data)} фильмов в базу!"))

from django.db.models import Q, Count
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Movie, Reaction
from .serializers import MovieSerializer


@api_view(['GET'])
def movie_list(request):
    movies = Movie.objects.all()

    # Аннотируем каждый фильм количеством реакций
    movies_with_reactions = movies.annotate(
        like_count=Count('reactions', filter=Q(reactions__reaction='like')),
        funny_count=Count('reactions', filter=Q(reactions__reaction='funny')),
        love_count=Count('reactions', filter=Q(reactions__reaction='love')),
        sad_count=Count('reactions', filter=Q(reactions__reaction='sad')),
        shocked_count=Count('reactions', filter=Q(reactions__reaction='shocked')),
        mindblown_count=Count('reactions', filter=Q(reactions__reaction='mindblown')),
        respect_count=Count('reactions', filter=Q(reactions__reaction='respect')),
        dislike_count=Count('reactions', filter=Q(reactions__reaction='dislike')),
        clown_count=Count('reactions', filter=Q(reactions__reaction='clown')),
        poop_count=Count('reactions', filter=Q(reactions__reaction='poop')),
        heart_count=Count('reactions', filter=Q(reactions__reaction='heart')),
        thinking_count=Count('reactions', filter=Q(reactions__reaction='thinking')),
        angry_count=Count('reactions', filter=Q(reactions__reaction='angry')),
        fire_count=Count('reactions', filter=Q(reactions__reaction='fire')),
        ghost_count=Count('reactions', filter=Q(reactions__reaction='ghost'))
    )

    # Формируем список реакций для каждого фильма
    movie_data = []
    for movie in movies_with_reactions:
        reactions_dict = {
            'like': movie.like_count,
            'funny': movie.funny_count,
            'love': movie.love_count,
            'sad': movie.sad_count,
            'shocked': movie.shocked_count,
            'mindblown': movie.mindblown_count,
            'respect': movie.respect_count,
            'dislike': movie.dislike_count,
            'clown': movie.clown_count,
            'poop': movie.poop_count,
            'heart': movie.heart_count,
            'thinking': movie.thinking_count,
            'angry': movie.angry_count,
            'fire': movie.fire_count,
            'ghost': movie.ghost_count
        }

        # Сортируем реакции по количеству в убывающем порядке
        sorted_reactions = dict(sorted(reactions_dict.items(), key=lambda item: item[1], reverse=True))

        # Сериализуем фильм с добавлением отсортированных реакций
        movie_serializer = MovieSerializer(movie)
        movie_data.append({
            **movie_serializer.data,
            'reactions_count': sorted_reactions
        })

    return Response(movie_data)

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

    # Сериализуем фильмы
    serializer = MovieSerializer(movies_with_reactions, many=True)

    return Response(serializer.data)

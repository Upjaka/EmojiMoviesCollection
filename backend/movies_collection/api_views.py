from rest_framework import viewsets
from .models import Movie, Reaction
from .serializers import MovieSerializer, ReactionSerializer
from django.contrib.auth import get_user_model

# ViewSet для фильма
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

# ViewSet для реакции
class ReactionViewSet(viewsets.ModelViewSet):
    queryset = Reaction.objects.all()
    serializer_class = ReactionSerializer

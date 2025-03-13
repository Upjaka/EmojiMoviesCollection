from django.db.models import Q, Count
from rest_framework import generics, status
from rest_framework.exceptions import NotFound
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Movie, Reaction
from .pagination import MoviePagination
from .serializers import MovieSerializer, ReactionSerializer


class MovieListAPIView(generics.ListAPIView):
    serializer_class = MovieSerializer
    pagination_class = MoviePagination  # Use the pagination class

    def get_queryset(self):
        search_query = self.request.GET.get('search', '')
        selected_year = self.request.GET.get('year', '')

        queryset = Movie.objects.all()

        if search_query:
            queryset = queryset.filter(Q(title__icontains=search_query) |
                                       Q(genres__icontains=search_query))

        if selected_year and selected_year != "all":
            queryset = queryset.filter(year=selected_year)

        return queryset.annotate(
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

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page_size = 12  # Define how many items per page
        page = int(self.request.GET.get('page', 1))  # Get the page from query parameters

        # Pagination logic
        start_index = (page - 1) * page_size
        end_index = start_index + page_size
        paginated_movies = queryset[start_index:end_index]

        # Calculate total pages
        total_count = queryset.count()
        total_pages = (total_count + page_size - 1) // page_size  # Round up to get the number of pages

        movie_data = []

        for movie in paginated_movies:
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

            sorted_reactions = dict(sorted(reactions_dict.items(), key=lambda item: item[1], reverse=True))
            movie_serializer = MovieSerializer(movie)
            movie_data.append({
                **movie_serializer.data,
                'reactions_count': sorted_reactions
            })

        return Response({
            'movies': movie_data,
            'count': total_count,
            'next': f"http://127.0.0.1:8000/api/movies/?page={page + 1}" if page < total_pages else None,
            'previous': f"http://127.0.0.1:8000/api/movies/?page={page - 1}" if page > 1 else None,
        })


class ReactionListCreateView(generics.ListCreateAPIView):
    queryset = Reaction.objects.all()
    serializer_class = ReactionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Добавляем текущего пользователя как создателя реакции
        serializer.save(user=self.request.user)

    # Переопределение метода для фильтрации реакций по текущему пользователю
    def get_queryset(self):
        return Reaction.objects.filter(user=self.request.user)


class ReactionDestroyView(DestroyAPIView):
    queryset = Reaction.objects.all()
    serializer_class = ReactionSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Получаем объект реакции на основе запроса
        user = self.request.user
        movie_id = self.kwargs['movie_id']
        reaction_type = self.kwargs['reaction']

        # Ищем реакцию, которая соответствует текущему пользователю, фильму и типу реакции
        try:
            reaction = Reaction.objects.get(user=user, movie_id=movie_id, reaction=reaction_type)
            return reaction
        except Reaction.DoesNotExist:
            raise NotFound(detail="Reaction not found.")

    def perform_destroy(self, instance):
        # Удаляем реакцию
        instance.delete()
        return Response({"detail": "Reaction deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

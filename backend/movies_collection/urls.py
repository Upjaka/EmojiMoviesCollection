from django.urls import path
from .views import ReactionListCreateView, ReactionDestroyView, MovieListAPIView

urlpatterns = [
    # path("api/", include(router.urls)),
    path("movies/", MovieListAPIView.as_view(), name="movie_list"),
    path("reactions/", ReactionListCreateView.as_view(), name='create_reaction'),
    path('reactions/<int:movie_id>/<str:reaction>/', ReactionDestroyView.as_view(), name='reaction-destroy'),
]

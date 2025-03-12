from django.urls import path
from .views import movie_list, CreateReactionView

urlpatterns = [
    # path("api/", include(router.urls)),
    path("movies/", movie_list, name="movie_list"),
    path("create_reaction/", CreateReactionView.as_view(), name='create_reaction'),
]

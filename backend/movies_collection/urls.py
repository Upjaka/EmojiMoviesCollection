from django.urls import path
from .views import movie_list

urlpatterns = [
    # path("api/", include(router.urls)),
    path("api/movies/", movie_list, name="movie_list")
]

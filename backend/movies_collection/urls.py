from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import MovieViewSet, ReactionViewSet

# Настройка роутера
router = DefaultRouter()
router.register(r'movies', MovieViewSet)
router.register(r'reactions', ReactionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]

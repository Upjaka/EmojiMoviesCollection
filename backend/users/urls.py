from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import CustomUserViewSet

# Настройка роутера
router = DefaultRouter()
router.register(r'users', CustomUserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]

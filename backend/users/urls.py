from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import CustomUserViewSet
from .views import protected_view, register_user

# Настройка роутера
router = DefaultRouter()
router.register(r'users', CustomUserViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/protected/", protected_view, name="protected"),
    path("api/register/", register_user, name="register"),
]

from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .serializers import CustomUserSerializer

# ViewSet для кастомного пользователя
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer

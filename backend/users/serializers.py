from rest_framework import serializers
from django.contrib.auth import get_user_model

# Сериализатор для кастомного пользователя
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'age', 'avatar', 'favorite_genres']

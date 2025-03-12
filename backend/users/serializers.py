from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from rest_framework import serializers


# Сериализатор для кастомного пользователя
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'age', 'avatar', 'favorite_genres']


# Сериализатор для регистрации
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'password', ]

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            is_staff = True,
        )
        return user


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=3)
    confirm_new_password = serializers.CharField(write_only=True, min_length=3)

    def validate(self, data):
        # Проверка, что новый пароль и подтвержденный пароль совпадают
        if data["new_password"] != data["confirm_new_password"]:
            raise ValidationError("Пароли не совпадают.")
        return data

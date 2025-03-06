from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser

    fieldsets = UserAdmin.fieldsets + (  # Добавляем новые поля в админку
        ("Дополнительная информация", {
            "fields": ("avatar", "age", "favorite_genres"),
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (  # Добавляем поля при создании нового пользователя
        ("Дополнительная информация", {
            "fields": ("avatar", "age", "favorite_genres"),
        }),
    )

    list_display = ("username", "email", "age", "favorite_genres", "is_staff")
    list_filter = ("favorite_genres", "age", "is_staff")
    search_fields = ("username", "email")

admin.site.register(CustomUser, CustomUserAdmin)

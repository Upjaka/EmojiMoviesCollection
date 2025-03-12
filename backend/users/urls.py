from django.urls import path
from .views import register_user, ChangePasswordView

urlpatterns = [
    path("register/", register_user, name="register"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password")
]

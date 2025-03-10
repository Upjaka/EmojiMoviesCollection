from rest_framework import serializers
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    reactions_count = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = ["id", "title", "year", "genres", "director", "poster", "reactions_count"]

    def get_reactions_count(self, obj):
        # Собираем реакцию в словарь
        return {
            'like': obj.like_count,
            'funny': obj.funny_count,
            'love': obj.love_count,
            'sad': obj.sad_count,
            'shocked': obj.shocked_count,
            'mindblown': obj.mindblown_count,
            'respect': obj.respect_count,
            'dislike': obj.dislike_count,
            'clown': obj.clown_count,
            'poop': obj.poop_count,
            'heart': obj.heart_count,
            'thinking': obj.thinking_count,
            'angry': obj.angry_count,
            'fire': obj.fire_count,
            'ghost': obj.ghost_count
        }

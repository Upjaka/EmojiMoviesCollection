from rest_framework import serializers
from .models import Movie, Reaction


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


class ReactionSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Reaction
        fields = ['id', 'user', 'movie', 'reaction']

    def validate(self, data):
        user = self.context["request"].user  # Получаем пользователя из запроса
        movie = data["movie"]
        reaction_type = data["reaction_type"]

        if Reaction.objects.filter(user=user, movie=movie, reaction_type=reaction_type).exists():
            raise serializers.ValidationError(
                {"non_field_errors": ["Вы уже оставили такую же реакцию на этот фильм."]}
            )

        return data
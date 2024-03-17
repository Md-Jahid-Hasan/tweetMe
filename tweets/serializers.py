from rest_framework import serializers
from .models import Tweet
from accounts.serializers import UserDescriptionSerializer


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        value = value.lower().strip()  # "Like " -> "like"
        if value not in ['like', 'unlike', 'retweet']:
            raise serializers.ValidationError("This is not a valid function for tweets")
        return value


class TweetCreateSerializer(serializers.ModelSerializer):
    isLike = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'likes', 'isLike', 'total_likes']

    def validate_content(self, value):
        if len(value) > 240:
            raise serializers.ValidationError("This tweet is too long.")
        return value

    def get_isLike(self, obj):
        request = self.context['request']
        return obj.likes.filter(username=request.user).exists()


class ReTweetSerializer(serializers.ModelSerializer):
    isLike = serializers.SerializerMethodField(read_only=True)
    user = UserDescriptionSerializer(read_only=True)
    timestamp = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'likes', 'isLike', 'total_likes', 'image', 'user', 'timestamp']

    def get_isLike(self, obj):
        request = self.context['request']
        return obj.likes.filter(username=request.user).exists()


class TweetSerializer(serializers.ModelSerializer):
    isLike = serializers.SerializerMethodField(read_only=True)
    retweet = ReTweetSerializer(read_only=True)
    user = UserDescriptionSerializer(read_only=True)
    timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S%z")

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'likes', 'is_retweet', 'retweet', 'isLike', 'total_likes', 'image', 'user', 'timestamp']

    def get_isLike(self, obj):
        request = self.context['request']
        return obj.likes.filter(username=request.user).exists()



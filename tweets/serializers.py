from rest_framework import serializers
from .models import Tweet, TweetMedia, TweetComments
from accounts.serializers import UserDescriptionSerializer


class TweetCommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TweetComments
        fields = ['content']


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        value = value.lower().strip()  # "Like " -> "like"
        if value not in ['like', 'unlike', 'retweet']:
            raise serializers.ValidationError("This is not a valid function for tweets")
        return value


class TweetMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TweetMedia
        fields = ['image', 'video', "media_type"]


class TweetCreateSerializer(serializers.ModelSerializer):
    isLike = serializers.SerializerMethodField(read_only=True)
    user = UserDescriptionSerializer(read_only=True)
    tweet_media = TweetMediaSerializer(read_only=True, many=True)
    images = serializers.ListField(child=serializers.FileField(), required=False, write_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'likes', 'isLike', 'total_likes', 'user', 'tweet_media', 'images']

    def validate(self, attrs):
        if len(attrs['content']) > 240:
            raise serializers.ValidationError("This tweet is too long.")
        return attrs

    def get_isLike(self, obj):
        request = self.context['request']
        return obj.likes.filter(username=request.user).exists()

    def create(self, validated_data):
        all_images = validated_data.pop('images', [])

        tweet = super().create(validated_data)

        if all_images and len(all_images):
            data = []
            for image in all_images:
                data.append({"image": image})
            tweet_media = TweetMediaSerializer(data=data, many=True)
            tweet_media.is_valid()
            tweet_media.save(tweet=tweet)
        return tweet


class ReTweetSerializer(serializers.ModelSerializer):
    isLike = serializers.SerializerMethodField(read_only=True)
    user = UserDescriptionSerializer(read_only=True)
    timestamp = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    tweet_media = TweetMediaSerializer(many=True, allow_null=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'likes', 'isLike', 'total_likes', 'tweet_media', 'user', 'timestamp']

    def get_isLike(self, obj):
        request = self.context['request']
        return obj.likes.filter(username=request.user).exists()


class TweetSerializer(serializers.ModelSerializer):
    isLike = serializers.SerializerMethodField(read_only=True)
    retweet = ReTweetSerializer(read_only=True)
    user = UserDescriptionSerializer(read_only=True)
    timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S%z")
    tweet_media = TweetMediaSerializer(many=True, allow_null=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'likes', 'is_retweet', 'retweet', 'isLike', 'total_likes', 'tweet_media', 'user',
                  'timestamp', 'total_comments']

    def get_isLike(self, obj):
        request = self.context['request']
        return obj.likes.filter(username=request.user).exists()


class TweetDetailSerializer(TweetSerializer):
    all_tweet_comments = TweetCommentCreateSerializer(many=True, read_only=True)

    class Meta(TweetSerializer.Meta):
        fields = TweetSerializer.Meta.fields + ['all_tweet_comments']

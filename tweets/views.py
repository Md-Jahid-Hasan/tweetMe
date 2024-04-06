from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count

from .models import Tweet
from .serializers import TweetSerializer, TweetCreateSerializer, \
    TweetActionSerializer


@api_view(['GET'])
def tweet_list(request, *args, **kwargs):
    all_tweet = Tweet.objects.all()
    serializer = TweetSerializer(all_tweet, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


class TweetCreateView(CreateAPIView):
    serializer_class = TweetCreateSerializer
    # permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action(request, *args, **kwargs):
    """Id of tweet and action what have to done need to provide"""
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get('id')
        action = data.get('action')
        content = data.get('content')
        try:
            tweet = Tweet.objects.get(id=tweet_id)
        except:
            return Response({"error": "This tweet doesn't exists"},
                            status=status.HTTP_404_NOT_FOUND)

        if action == 'like':
            tweet.likes.add(request.user)
            serializer = TweetSerializer(tweet, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif action == 'unlike':
            tweet.likes.remove(request.user)
            serializer = TweetSerializer(tweet, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif action == 'retweet':
            new_tweet = Tweet.objects.create(
                user=request.user,
                retweet=tweet,
                content=content,
            )
            serializer = TweetSerializer(new_tweet, context={'request': request})
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response({}, status=status.HTTP_200_OK)


class TweetDetailView(ListAPIView):
    serializer_class = TweetSerializer

    def get_queryset(self):
        id = self.kwargs['tweet_id']
        return Tweet.objects.filter(pk=id)

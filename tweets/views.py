from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Prefetch

from .models import Tweet, TweetComments
from .serializers import TweetSerializer, TweetCreateSerializer, TweetActionSerializer, TweetCommentCreateSerializer, \
    TweetDetailSerializer


@api_view(['GET'])
def tweet_list(request, *args, **kwargs):
    all_tweet = Tweet.objects.all()
    serializer = TweetSerializer(all_tweet, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


class TweetCreateView(CreateAPIView):
    serializer_class = TweetCreateSerializer
    permission_classes = (IsAuthenticated,)

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


class TweetDetailView(RetrieveAPIView):
    serializer_class = TweetDetailSerializer

    def get_object(self):
        tweet = Tweet.objects.prefetch_related(
            Prefetch('all_tweet_comments', queryset=TweetComments.objects.filter(reply_to=None))
        ).get(pk=self.kwargs['pk'])
        return tweet


class TweetCommentCreateView(CreateAPIView):
    serializer_class = TweetCommentCreateSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        content = request.data.get('content')
        if not content:
            return Response({"created": False}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tweet = Tweet.objects.get(pk=self.kwargs['tweet_id'])
        except Tweet.DoesNotExist:
            return Response({"created": False}, status=status.HTTP_404_NOT_FOUND)

        payload = {
            'content': content,
            'tweet': tweet,
            'user': request.user,
        }
        reply_to = request.data.get('reply_to')
        if reply_to:
            try:
                parent_comment = TweetComments.objects.get(pk=reply_to)
                payload['reply_to'] = parent_comment
            except TweetComments.DoesNotExist:
                return Response({"created": False}, status=status.HTTP_404_NOT_FOUND)

        try:
            TweetComments.objects.create(**payload)
        except TweetComments.DoesNotExist:
            return Response({"created": False}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"created": True}, status=status.HTTP_200_OK)

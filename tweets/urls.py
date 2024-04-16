from django.urls import path

from . import views

urlpatterns = [
    path('tweets/', views.tweet_list, name="tweet_list"),
    path('tweets/create/', views.TweetCreateView.as_view(), name="tweet_create"),
    path('tweets/action/', views.tweet_action, name="tweet_action"),
    path('tweet/details/<int:pk>/', views.TweetDetailView.as_view(), name="tweet_details"),
    path('tweet/comments/<int:tweet_id>/', views.TweetCommentCreateView.as_view(), name="tweet_comments"),
]
from django.contrib.auth import get_user_model
from django.db.models.signals import m2m_changed, post_save
from django.dispatch import receiver
from django.db import models
from django.conf import settings


class TweetLike(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class TweetComments(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE, related_name="all_tweet_comments")
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    reply_to = models.ForeignKey("self", null=True, on_delete=models.CASCADE, related_name='replies', blank=True)

    class Meta:
        ordering = ('-timestamp',)


class Tweet(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='tweet_user', blank=True, through=TweetLike)
    timestamp = models.DateTimeField(auto_now_add=True)
    retweet = models.ForeignKey("self", null=True, on_delete=models.SET_NULL, blank=True)
    total_likes = models.IntegerField(default=0)
    total_comments = models.IntegerField(default=0)

    class Meta:
        ordering = ['-id']

    @property
    def is_retweet(self):
        return self.retweet is not None


@receiver(m2m_changed, sender=Tweet.likes.through)
def update_total_likes(sender, instance, **kwargs):
    instance.total_likes = instance.likes.count()
    instance.save()


@receiver(post_save, sender=TweetComments)
def update_total_comments(sender, instance, **kwargs):
    tweet = instance.tweet
    tweet.total_comments += 1
    tweet.save()


class TweetMedia(models.Model):
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE, related_name='tweet_media')
    image = models.FileField(upload_to='images/', blank=True, null=True)
    video = models.FileField(upload_to='video/', blank=True, null=True)

    @property
    def media_type(self):
        return "image" if self.image is not None else "video"

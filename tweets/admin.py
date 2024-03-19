from django.contrib import admin
from .models import Tweet, TweetLike, TweetMedia


class TweetLikeAdmin(admin.TabularInline):
    model = TweetLike


class TweetMediaAdmin(admin.TabularInline):
    model = TweetMedia


class TweetAdmin(admin.ModelAdmin):
    inlines = [TweetLikeAdmin, TweetMediaAdmin]
    list_display = ['__str__', 'user']
    search_fields = ['content', 'user']

    class Meta:
        model = Tweet


admin.site.register(Tweet, TweetAdmin)
admin.site.register(TweetLike)

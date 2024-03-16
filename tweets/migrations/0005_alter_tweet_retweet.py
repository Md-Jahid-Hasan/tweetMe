# Generated by Django 5.0.3 on 2024-03-16 13:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0004_alter_tweet_total_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tweet',
            name='retweet',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tweets.tweet'),
        ),
    ]
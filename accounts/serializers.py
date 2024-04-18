from rest_framework import serializers
from django.contrib.auth import get_user_model as User


class UserDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = User()
        fields = ('username', 'id',)

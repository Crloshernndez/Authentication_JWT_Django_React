from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    """
    Custom serializer for User model that extends UserCreateSerializer.
    """

    class Meta():
        model = User
        fields = [
            'id',
            'email',
            'name',
            'is_active',
            'is_staff',
            'password'
        ]

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(
            name=validated_data['name'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'name',
        ]

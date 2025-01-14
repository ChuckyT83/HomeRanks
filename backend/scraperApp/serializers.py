from rest_framework import serializers
from scraperApp.models import Home, HomeList, APIKeys
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
import asyncio
from asgiref.sync import sync_to_async
from rest_framework.fields import CurrentUserDefault
from adrf import serializers as async_serializers

class HomeSerializer(async_serializers.ModelSerializer):
    #get_user = serializers.SerializerMethodField()
    class Meta:
        model = Home
        fields = '__all__'

    # def create(self, validated_data):
    #     return Home.objects.create(**validated_data)
    
    # def get_context(self, instance):
    #     return HomeListSerializer(instance=instance.get_user, context=self.context).data


class HomeListSerializer(async_serializers.ModelSerializer):
    num_homes = serializers.SerializerMethodField()
    class Meta:
        model = HomeList
        fields = '__all__'
        read_only_fields = ['user']

    def update(self, instance, validated_data):
        return instance


    
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return HomeList.objects.create(**validated_data)
    
    def get_num_homes(self, obj):
        if obj.homes.count() == 0:
            return "Empty"
        return str(obj.homes.count())
    
    
    
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data you want to include
        data.update({'user': self.user.username})
        data.update({'id': self.user.id})
        # and everything else you want to send in the response
        return data
    
class GetAPIKeySerializer(async_serializers.ModelSerializer):
    class Meta:
        model = APIKeys
        fields = '__all__'
        read_only_fields = ['Key']
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from . models import *
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets, status
from . serializers import *
from scripts import zillowScraper, zillowSearch
import json
from contextlib import suppress


# Create your views here.

class IndexViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, ) 

    def get(self, request):
        content = {'message': 'Hello, world!'}
        return Response(content)      
    

class LogoutViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    

class HomeListViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    serializer_class = HomeListSerializer
    def list(self, request):
        list_name = self.request.query_params.get('list_name')
        user_homelist = HomeList.objects.get(name=list_name)
        queryset = user_homelist.homes.all()
        serializer = HomeSerializer(queryset, many=True)
        return Response(serializer.data)

    # def perform_create(self, serializer):
    #     response = super().perform_create(serializer)
    #     instance = serializer.instance
    #     return response
    
    
class SelectHomeListViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    serializers = HomeListSerializer
    def list(self, request):
        queryset = HomeList.objects.filter(user=self.request.user)
        serializer = HomeListSerializer(queryset, many=True)
        return Response(serializer.data)
        


class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer
from django.urls import path, include
from django.contrib import admin
from .views import *
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView





router = DefaultRouter()
router.register(r'homelist', HomeListViewSet, basename='homelist')
router.register(r'selecthomelist', SelectHomeListViewSet, basename='showhomelists')
router.register(r'homes', HomeViewSet, basename='homes')
router.register(r'index', IndexViewSet, basename='index')
router.register(r'logout', LogoutViewSet, basename='logout')
router.register(r'getKey', GetAPIKeyViewSet, basename='getKey')
#router.register(r'auth', CustomObtainAuthToken, basename='auth')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('scraperApp/', include(router.urls)),
]
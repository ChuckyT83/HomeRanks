from django.contrib import admin

from .models import Home, HomeList, APIKeys
# Register your models here.

class HomeAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

class HomeListAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

class APIKeyAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

admin.site.register(Home, HomeAdmin)
admin.site.register(HomeList, HomeListAdmin)
admin.site.register(APIKeys, APIKeyAdmin)
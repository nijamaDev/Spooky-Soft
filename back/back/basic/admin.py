from django.contrib import admin
from .models import People, Roles, Status, Users, Stores, Products, News

# Register your models here.
admin.site.register(People)
admin.site.register(Roles)
admin.site.register(Status)
admin.site.register(Users)
admin.site.register(Stores)
admin.site.register(Products)
admin.site.register(News)
from rest_framework import serializers
from .models import Stores, People, Roles, Status, Users, News

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stores
        fields = ('id','name','url_store')

class PoepleSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = '__all__'

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'
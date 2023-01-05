from rest_framework import serializers
from .models import Stores, People, Roles, Status, Users, News, GoogleUsers
from .models import Stores, People, Roles, Status, Users, News, ProductRegisters

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

class GoogleUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoogleUsers

8
class ProductRegistersSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRegisters
        fields = '__all__'
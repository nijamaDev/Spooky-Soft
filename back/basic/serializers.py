from rest_framework import serializers
from .models import Stores, People, Roles, Status, Users, News, GoogleUsers, ProductRegisters, Products


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
    name = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = Users
        fields = ('email', 'id', 'name', 'role', 'status')

    def get_name(self, obj):
        return obj.person.name

    def get_role(self, obj):
        return obj.role.name

    def get_status(self, obj):
        return obj.status.name

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'

class GoogleUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoogleUsers
        fields = '__all__'

class ProductRegistersSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRegisters
        fields = '__all__'

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

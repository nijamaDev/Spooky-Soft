from .models import Stores, People, Status, Roles, Users, News, GoogleUsers, ProductRegisters, Products
from rest_framework import viewsets, permissions
from .serializers import StoreSerializer, PoepleSerializer, RolesSerializer, StatusSerializer, UserSerializer, NewsSerializer, GoogleUsersSerializer, ProductRegistersSerializer, ProductsSerializer


class StoreViweSet(viewsets.ModelViewSet):
    queryset = Stores.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = StoreSerializer 

class PeopleViewSet(viewsets.ModelViewSet):
    queryset = People.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PoepleSerializer

class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RolesSerializer

class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = StatusSerializer

class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = NewsSerializer

class GoogleUsersViewSet(viewsets.ModelViewSet):
    queryset = GoogleUsers.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = GoogleUsersSerializer
    
class ProductRegistersViewSet(viewsets.ModelViewSet):
    queryset = ProductRegisters.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductRegistersSerializer

class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductsSerializer
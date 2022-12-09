from .models import Stores, People, Status, Roles, Users, News, GoogleUsers
from rest_framework import viewsets, permissions
from .serializers import StoreSerializer, PoepleSerializer, RolesSerializer, StatusSerializer, UserSerializer, NewsSerializer, GoogleUsersSerializer 

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
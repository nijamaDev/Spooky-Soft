from .models import Stores, People, Status, Roles
from rest_framework import viewsets, permissions
from .serializers import StoreSerializer, PoepleSerializer, RolesSerializer, StatusSerializer

class StoreViweSet(viewsets.ModelViewSet):
    queryset = Stores.objects.all()
    permissio_classes = [permissions.AllowAny]
    serializer_class = StoreSerializer 

class PeopleViewSet(viewsets.ModelViewSet):
    queryset = People.objects.all()
    permissio_classes = [permissions.AllowAny]
    serializer_class = PoepleSerializer

class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    permissio_classes = [permissions.AllowAny]
    serializer_class = RolesSerializer

class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    permissio_classes = [permissions.AllowAny]
    serializer_class = StatusSerializer
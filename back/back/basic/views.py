from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from .models import Users, Status, People

# Create your views here.

def index(req):
    # Espacio para hacer peticiones
    return JsonResponse({'title': "JIjijji ja"})

def getUsers(req):
    u = list(Users.objects.values())
    return JsonResponse(u, safe=False)

def getStatus(req):
    s = list(Status.objects.filter(id=4).values())
    return JsonResponse(s, safe=False)

def createPerson(req, name, lastname, identification):
    cp = People.objects.create(name=name, lastname=lastname, identification=identification)
    return JsonResponse({'insercion': cp})
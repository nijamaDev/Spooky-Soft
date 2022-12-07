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
    #print(req.POST['name'])
    return JsonResponse({'insercion': cp})


def logIn(req, email, password):
    res = {'status': 0, 'user':{}, 'msg':""}
    user =list(Users.objects.filter(mail=email).values())
    if len(user) > 0:
        if user[0]['password'] == password:
            res['status'] = 1
            res['user'] = user[0]
            res['msg'] = "Login Exitoso"
            return JsonResponse(res)
        else:
            res['msg'] = "Contraseña Incorecta"
            return JsonResponse(res)
    else:
        res['msg'] = "Usuario no Registrado"
        return JsonResponse(res)

def logInGoogle(req, emal):
    res = {'status': 0, 'user':{}, 'msg':""}
    #Buscar en tabla de gooale
    return JsonResponse(res)
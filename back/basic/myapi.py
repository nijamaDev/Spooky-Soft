from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Users, People

@api_view(['POST'])
def logIn(req):
    res = {'status': 0, 'user':{}, 'msg':""}
    try:
        user = list(Users.objects.filter(email=req.data['email']).values())
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if req.method == 'POST':
        if len(user)>0:
            if user[0]['password'] == req.data['password']:
                res['status'] = 1
                res['user'] = user[0]
                res['msg'] = "Login Exitoso"
                return Response(res)
            else:
                res['msg'] = "Contraseña Incorecta"
                return Response(res)
        else:
            res['msg'] = "Usuario no Registrado"
            return Response(res)

@api_view(['POST'])
def getPerson(req):
    res = { 'name': "", 'lastname': "", 'identification': "" }
    try:
        person = People.objects.get(id=req.data['id'])
    except People.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if req.method == 'POST':
        res['name'] = person.name
        res['lastname'] = person.lastname
        res['identification'] = person.identification
        return Response(res)
    else:
        return Response(res)
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
from .models import Users, People, Roles, Status, Stores, Products, ProductRegisters
from .scraping import scrapElement
from .serializers import UserSerializer

@api_view(['GET'])
def scarpInit(req):
    res = { 'status':0, 'element': "" }
    element = scrapElement()
    print(element)
    res['element'] = element
    res['status'] = 1
    return Response(res)

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
def createUser(req): 
    res = {'status': 0, 'user':{}, 'msg':""}
    data = req.data 
    if req.method == 'POST':
        try:
            Users.objects.get(email=req.data['email'])
            return Response('Email already in use')
        except Users.DoesNotExist:
            person = People.objects.create(name=data['people']['name'], lastname=data['people']['lastname'], identification=data['people']['identification']) 
            role = Roles.objects.get(name=data['role'])
            status = Status.objects.get(name=data['status'])
            user = Users.objects.create(person=person, role=role, status=status, email=data["email"], password=data["password"], imageUrl=data["imageUrl"]) 
            expectedUser =  {
                                "id": user.id,
                                "person_id": user.person.id,
                                "role_id": user.role.id,
                                "status_id": user.status.id, 
                                "email": user.email, 
                                "password": user.password, 
                                "imageUrl": user.imageUrl 
                            }
            res['status'] = 1
            res['user'] = expectedUser
            res['msg'] = "Usuario creado exitosamente"
            user.save()
    return Response(res)

@api_view(['POST'])
def createProduct(req):
    res = { 'id':"", 'status': 0, 'product':{}, 'msg':""}    
    data = req.data
    if req.method == 'POST':
        store = Stores.objects.get(name=data['store'])
        product = Products.objects.create(store=store, name=data['name'], description=data['description'], cover=data['cover'], redirect=data['redirect'], price=data['price'], priceSale=data['priceSale'], location=data['location'], colors=data['colors'])
        res['id'] = product.id
        res['status'] = 1
        res['product'] = req.data
        res['msg'] = "Producto creado exitosamente"
        product.save()
    return Response(res)

@api_view(['POST'])
def createProductRegister(req):
    res = {'product': "", 'date':"", 'visits':"", 'redirect':""}    
    data = req.data
    if req.method == 'POST':
        product = Products.objects.get(id=data['product'])
        productRegister = ProductRegisters.objects.create(product=product, date=datetime.now().date(), visits=0, redirect=0)
        res['product'] = product.name
        res['date'] = productRegister.date
        res['visits'] = productRegister.visits
        res['redirect'] = productRegister.redirect
        productRegister.save()
    return Response(res)

@api_view(['GET'])
def getAllUsers(req):
    if req.method == 'GET':
        users = Users.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

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

@api_view(['POST'])
def getRole(req):
    res = { 'name': "" }
    try:
        role = Roles.objects.get(id=req.data['id'])
    except Roles.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if req.method == 'POST':
        res['name'] = role.name
        return Response(res)
    else:
        return Response(res)

@api_view(['POST'])
def getStatus(req):
    res = { 'name': "" }
    try:
        statusObj = Status.objects.get(id=req.data['id'])
    except Status.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if req.method == 'POST':
        res['name'] = statusObj.name
        return Response(res)
    else:
        return Response(res)

@api_view(['PUT'])
def updateUserNoPassword(req, user_id):
    data = req.data
    user = Users.objects.get(id=user_id)
    if req.method == 'PUT':
        People.objects.filter(id=user.person.id).update(name=data.get('name'), lastname=data.get('lastname')) 
        person = People.objects.get(id=user.person.id)
        role = Roles.objects.get(name=data['role'])
        statusObj = Status.objects.get(name=data['status'])
        user.email = data.get('email')
        user.role.name = role.name
        user.status.name = statusObj.name
        user.person.name = person.name
        user.person.lastname = person.lastname
        user.save()
        return Response(status=status.HTTP_200_OK)

@api_view(['PUT'])
def updateUserPassword(req, user_id):
    user = Users.objects.get(id=user_id)
    if req.method == 'PUT':
        user.password = req.data.get('password')
        user.save()
        return Response(status=status.HTTP_200_OK)
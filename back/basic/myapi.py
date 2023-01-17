from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import date
from datetime import datetime
from .models import Users, People, Roles, Status, Stores, Products, ProductRegisters
from .scraping import descuentos
from .serializers import UserSerializer, ProductRegistersSerializer

@api_view(['POST'])
def scarpInit(req):
    res = { 'status':0, 'elements': "" }
    elements = descuentos(req.data['tipo'], req.data['prompt'], req.data['store'])
    res['elements'] = elements
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

#---------[ PEOPLE ]---------------------------------------------------------------------------------------------------
@api_view(['POST'])
def getPerson(req):
    res = { 'name': "", 'lastname': "", 'identification': "" }
    data = req.data
    try:
        person = People.objects.get(id=data['id'])
    except People.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if req.method == 'POST':
        res['name'] = person.name
        res['lastname'] = person.lastname
        res['identification'] = person.identification
        return Response(res)
    else:
        return Response(res)

#---------[ ROLES ]---------------------------------------------------------------------------------------------------
@api_view(['POST'])
def getRole(req):
    res = { 'name': "" }        
    data = req.data
    try:
        role = Roles.objects.get(id=data['id'])
    except Roles.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if req.method == 'POST':
        res['name'] = role.name
        return Response(res)
    else:
        return Response(res)

#---------[ STATUS ]---------------------------------------------------------------------------------------------------
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

#---------[ USERS ]---------------------------------------------------------------------------------------------------
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

@api_view(['GET'])
def getAllUsers(req):
    if req.method == 'GET':
        users = Users.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

@api_view(['PUT'])
def updateUserNoPassword(req, id):
    data = req.data
    user = Users.objects.get(id=id)
    if req.method == 'PUT':
        People.objects.filter(id=user.person.id).update(name=data.get('name'), lastname=data.get('lastname')) 
        Users.objects.filter(id=id).update(email=data['email'],role=data['role'],status=data['status'])
        return Response(status=status.HTTP_200_OK) 

@api_view(['PUT'])
def updateUserPassword(req, id):
    user = Users.objects.get(id=id)
    if req.method == 'PUT':
        user.password = req.data.get('password')
        user.save()
        return Response(status=status.HTTP_200_OK)

#---------[ PRODUCTS ]---------------------------------------------------------------------------------------------------
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
def createProducts(req):  
    data = req.data
    if req.method == 'POST':
        for i in range(len(data['products'])):
            store = Stores.objects.get(name=data['products'][i]['store'])
            product = Products.objects.create(store=store, name=data['products'][i]['name'], description=data['products'][i]['description'], cover=data['products'][i]['cover'], redirect=data['products'][i]['redirect'], price=data['products'][i]['price'], priceSale=data['products'][i]['priceSale'], location=data['products'][i]['location'], colors=data['products'][i]['colors'])
            product.save()
    return Response(status=status.HTTP_200_OK)

@api_view(['PUT'])
def updateProduct(req, id):
    if req.method == 'PUT':
        data = req.data
        product = Products.objects.get(id=id)
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.cover = data.get('cover', product.cover)
        product.redirect = data.get('redirect', product.redirect)
        product.price = data.get('price', product.price)
        product.priceSale = data.get('priceSale', product.priceSale)
        product.location = data.get('location', product.location)
        product.colors = data.get('colors', product.colors)
        product.save()
        return Response(status=status.HTTP_200_OK)

@api_view(['DELETE'])
def deleteProduct(req, id):
    if req.method == 'DELETE':
        product = Products.objects.get(id=id)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#---------[ PRODUCT REGISTERS ]---------------------------------------------------------------------------------------------------
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

@api_view(['POST'])
def createProductRegisterGivenDate(req):  
    data = req.data
    if req.method == 'POST':
        products = Products.objects.all()
        for i in range(len(products)):
            productRegister = ProductRegisters.objects.create(product=products[i], date=data['date'], visits=0, redirect=0)
            productRegister.save()
    return Response("REGISTROS CREADOS") 

@api_view(['POST'])
def createProductRegisterAllProducts(req):  
    if req.method == 'POST':
        products = Products.objects.all()
        for i in range(len(products)):
            productRegister = ProductRegisters.objects.create(product=products[i], date=datetime.now().date(), visits=0, redirect=0)
            productRegister.save()
    return Response("REGISTROS CREADOS") 

@api_view(['GET'])
def getTodayProductRegisters(req):
    if req.method == 'GET':
        today = date.today()
        product_registers = ProductRegisters.objects.filter(date=today)
        serializer = ProductRegistersSerializer(product_registers, many=True, context={'request': req})
        return Response(serializer.data)

@api_view(['PUT'])
def addVisit(req, id):
    if req.method == 'PUT':
        product_register = ProductRegisters.objects.get(id=id)
        product_register.visits += 1
        product_register.save()
        return Response(ProductRegistersSerializer(product_register).data)

@api_view(['PUT'])
def addRedirect(req, id):
    if req.method == 'PUT':
        product_register = ProductRegisters.objects.get(id=id)
        product_register.redirect += 1
        product_register.save()
        return Response(ProductRegistersSerializer(product_register).data)        

@api_view(['POST'])
def addVisitXD(req):
    try:
        pr = ProductRegisters.objects.get(product=req.data['p']['id'], date = req.data['date'])
        pr.visits += 1
        pr.save()
    except ProductRegisters.DoesNotExist:
        pr = ProductRegisters.objects.create(product=req.data['p']['id'], date = req.data['date'], visits=0, redirect=0)
    return Response(ProductRegistersSerializer(pr).data) 

@api_view(['POST'])
def addRedirectXD(req):
    try:
        pr = ProductRegisters.objects.get(product=req.data['p']['id'], date = req.data['date'])
        pr.redirect += 1
        pr.save()
    except ProductRegisters.DoesNotExist:
        pr = ProductRegisters.objects.create(product=req.data['p']['id'], date = req.data['date'], visits=0, redirect=0)
    return Response(ProductRegistersSerializer(pr).data) 
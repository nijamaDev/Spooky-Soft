from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Users, People, Roles, Status, Stores, Products
from .scraping import scrapElement

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

@api_view(['GET'])
def scarpInit(req):
    res = { 'status':0, 'element': "" }
    element = scrapElement()
    print(element)
    res['element'] = element
    res['status'] = 1
    return Response(res)

@api_view(['POST']) 
def createUser(req): 
    data = req.data 
    if req.method == 'POST':
        try:
            Users.objects.get(email=req.data['email'])
            return Response('Email already in use')
        except Users.DoesNotExist:
            people = People.objects.create(name=data['people']['name'], lastname=data['people']['lastname'], identification=data['people']['identification']) 
            role = Roles.objects.get(name=data['role'])
            status = Status.objects.get(name=data['status'])
            user = Users.objects.create(person=people, role=role, status=status, email=data["email"], password=data["password"], imageUrl=data["imageUrl"]) 
            user.save()
    return Response('User created succesfully')

@api_view(['POST'])
def createProduct(request):
    if request.method == 'POST':
        data = request.data
        store = Stores.objects.get(id=data['store_id'])
        product = Products.objects.create(store=store, name=data['name'], description=data['description'], url_picture=data['url_picture'], url_product=data['url_product'], price=data['price'],price_sale=data['price_sale'], location=data['location'])
        product.save()
    return Response('Product created succesfully')
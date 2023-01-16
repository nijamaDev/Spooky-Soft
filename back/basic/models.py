from django.db import models

# Create your models here.
class People(models.Model):
    name = models.CharField(max_length=100, null=False)
    lastname = models.CharField(max_length=100, null=False)
    identification = models.CharField(max_length=100, null=False, unique=True)

    def __str__(self):
        return self.name + ' ' + self.lastname

class Roles(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.name

class Status(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.name

class Users(models.Model):
    person = models.OneToOneField(People, on_delete=models.CASCADE, null=False,)
    role = models.ForeignKey(Roles, on_delete=models.CASCADE, null=False)
    status = models.ForeignKey(Status, on_delete=models.CASCADE, null=False)
    email = models.CharField(max_length=100, null=False, unique=True)
    password = models.CharField(max_length=100, null=False)
    imageUrl = models.CharField(max_length=500, null=True)

    def __str__(self):
        return self.person.name  + " - " + self.role.name + " - " + self.status.name + " - " + self.email        

class Stores(models.Model):
    name = models.CharField(max_length=100, null=False, unique=True)
    url_store = models.CharField(max_length=500, null=False, unique=True)

    def __str__(self):
        return self.name
        
class Products(models.Model):
    store = models.ForeignKey(Stores, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=500, null=False)
    cover = models.CharField(max_length=500, null=False)
    redirect = models.CharField(max_length=500, null=False)
    price = models.FloatField(max_length=100, null=False)
    priceSale = models.FloatField(max_length=100, null=True)
    location = models.CharField(max_length=100, null=False)   
    creation_date = models.DateField(auto_now_add=True, null=False)
    colors = models.CharField(max_length=50, null=True)   

    def __str__(self):
        return self.name + ' ' + self.description

class News(models.Model):
    title = models.CharField(max_length=100, null=False)
    createdAt = models.DateField(max_length=100, null=False)
    description = models.CharField(max_length=500, null=False)
    cover = models.CharField(max_length=500, null=False)
    redirect = models.CharField(max_length=500, null=False)

    def __str__(self):
        return self.title + ' ' + self.description

class GoogleUsers(models.Model):
    email: models.CharField(max_length=100, null=False, unique=True)
    googleId: models.CharField(max_length=100, null=False, unique=True)
    imageUrl: models.CharField(max_length=100, null=False)
    name: models.CharField(max_length=100,null=False)
    rol: models.ForeignKey(Roles, on_delete=models.CASCADE, null=False)

    def _str_(self):
        return self.email + ' ' + self.rol

class ProductRegisters(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE, null=False)
    date = models.DateField(max_length=100, null=False)
    visits = models.IntegerField()
    redirect = models.IntegerField()

    def __str__(self):
        return self.product.name + ' ' + str(self.redirect)
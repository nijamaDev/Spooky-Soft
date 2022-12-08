from django.db import models

# Create your models here.
class People(models.Model):
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    identification = models.CharField(max_length=100)

    def __str__(self):
        return self.name + ' ' + self.lastname

class Roles(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Status(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Users(models.Model):
    person = models.ForeignKey(People, on_delete=models.CASCADE)
    role = models.ForeignKey(Roles, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.person.name  + " - " + self.role.name + " - " + self.status.name + " - " + self.email        

class Stores(models.Model):
    name = models.CharField(max_length=100)
    url_store = models.CharField(max_length=500)

    def __str__(self):
        return self.name
        
class Products(models.Model):
    store = models.ForeignKey(Stores, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    url_picture = models.CharField(max_length=500)
    url_product = models.CharField(max_length=500)
    price = models.FloatField(max_length=100)
    price_sale = models.FloatField(max_length=100)
    location = models.CharField(max_length=100)   
    creation_date = models.DateField
    view_num = models.IntegerField

    def __str__(self):
        return self.name + ' ' + self.description

class News(models.Model):
    title = models.CharField(max_length=100)
    createdAt = models.DateField(max_length=100)
    description = models.CharField(max_length=500)
    cover = models.CharField(max_length=500)
    redirect = models.CharField(max_length=500)

    def __str__(self):
        return self.title + ' ' + self.description
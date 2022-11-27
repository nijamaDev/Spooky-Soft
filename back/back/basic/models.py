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
    id_person = models.ForeignKey(People, on_delete=models.CASCADE)
    id_role = models.ForeignKey(Roles, on_delete=models.CASCADE)
    id_status = models.ForeignKey(Status, on_delete=models.CASCADE)
    mail = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.id_person.name  + " - " + self.id_role.name + " - " + self.id_status.name + " - " + self.mail        

class Stores(models.Model):
    name = models.CharField(max_length=100)
    url_store = models.CharField(max_length=100)

    def __str__(self):
        return self.name
class Products(models.Model):
    id_store = models.ForeignKey(Stores, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    url_picture = models.CharField(max_length=100)
    url_product = models.CharField(max_length=100)
    price = models.FloatField(max_length=100)
    location = models.CharField(max_length=100)   
    view_num = models.IntegerField

    def __str__(self):
        return self.name + ' ' + self.description

class News(models.Model):
    name = models.CharField(max_length=100)
    creation_date = models.DateField(max_length=100)
    description = models.CharField(max_length=100)
    url_image = models.CharField(max_length=100)
    url_destiny = models.CharField(max_length=100)

    def __str__(self):
        return self.name + ' ' + self.description
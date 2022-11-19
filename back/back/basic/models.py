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
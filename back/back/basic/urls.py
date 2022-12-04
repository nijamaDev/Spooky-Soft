from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('getUsers/', views.getUsers),
    path('getStatus/', views.getStatus),
    path('createPerson/<str:name>/<str:lastname>/<str:identification>', views.createPerson)
]
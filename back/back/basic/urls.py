from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('getUsers/', views.getUsers),
    path('getStatus/', views.getStatus),
    path('createPerson/<str:name>/<str:lastname>/<str:identification>', views.createPerson),
    path('login/<str:email>/<str:password>', views.logIn),
    path('login/google/<str:email>', views.logInGoogle)

]
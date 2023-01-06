from django.urls import path
from . import views
from rest_framework import routers
from .api import StoreViweSet, StatusViewSet, PeopleViewSet, RolesViewSet, UsersViewSet, NewsViewSet, GoogleUsersViewSet
from .myapi import logIn, getPerson, scarpInit

router = routers.DefaultRouter()

router.register('api/stores', StoreViweSet, 'stores')
router.register('api/status', StatusViewSet, 'status')
router.register('api/people', PeopleViewSet, 'people')
router.register('api/roles', RolesViewSet, 'roles')
router.register('api/users', UsersViewSet, 'users')
router.register('api/news', NewsViewSet, 'news')
router.register('api/googleusers', GoogleUsersViewSet, 'news')

# urlpatterns = [
#     path('', views.index),
#     path('getUsers/', views.getUsers),
#     path('getStatus/', views.getStatus),
#     path('createPerson/<str:name>/<str:lastname>/<str:identification>', views.createPerson),
#     path('login/', views.logIn),
#     path('login/google/<str:email>', views.logInGoogle)

# ]

urlpatterns = router.urls
urlpatterns.append(path('api/login/', logIn, name='login'))
urlpatterns.append(path('api/get_person/', getPerson, name='get_person'))
urlpatterns.append(path('api/scrap/', scarpInit, name='scrap'))
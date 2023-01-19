from django.urls import path
from . import views
from rest_framework import routers
from .api import StoreViweSet, StatusViewSet, PeopleViewSet, RolesViewSet, UsersViewSet, NewsViewSet, GoogleUsersViewSet, ProductRegistersViewSet, ProductsViewSet
from .myapi import getAllUsers, getProductsNumber, getUsersNumber, scarpInit, logIn, createUser, createProduct, createProducts, sumTodayRedirects, sumTodayVisits, updateProducts, createProductRegister, createProductRegisterGivenDate, createProductRegisterAllProducts, getPerson, getRole, getStatus, getTodayProductRegisters, updateUserNoPassword, updateUserPassword, updateProduct, addVisit, addRedirect, deleteProduct, addVisitXD, addRedirectXD, sortByRedirects, sortByVisits, getAlejoReport

router = routers.DefaultRouter()

router.register('api/stores', StoreViweSet, 'stores')
router.register('api/status', StatusViewSet, 'status')
router.register('api/people', PeopleViewSet, 'people')
router.register('api/roles', RolesViewSet, 'roles')
router.register('api/users', UsersViewSet, 'users')
router.register('api/news', NewsViewSet, 'news')
router.register('api/googleusers', GoogleUsersViewSet, 'google')
router.register('api/products', ProductsViewSet, 'products')
router.register('api/productRegisters', ProductRegistersViewSet, 'registers')

# urlpatterns = [
#     path('', views.index),
#     path('getUsers/', views.getUsers),
#     path('getStatus/', views.getStatus),
#     path('createPerson/<str:name>/<str:lastname>/<str:identification>', views.createPerson),
#     path('login/', views.logIn),
#     path('login/google/<str:email>', views.logInGoogle)

# ]

urlpatterns = router.urls
urlpatterns.append(path('api/scrap/', scarpInit, name='scrap'))
urlpatterns.append(path('api/login/', logIn, name='login'))
urlpatterns.append(path('api/alejo_report/', getAlejoReport, name='alejoReport'))
#---------[ PEOPLE ]---------------------------------------------------------------------------------------------------
urlpatterns.append(path('api/get_person/', getPerson, name='get_person'))
#---------[ ROLES ]---------------------------------------------------------------------------------------------------
urlpatterns.append(path('api/get_role/', getRole, name='get_role'))
#---------[ STATUS ]---------------------------------------------------------------------------------------------------
urlpatterns.append(path('api/get_status/', getStatus, name='get_status'))
#---------[ USERS ]---------------------------------------------------------------------------------------------------
urlpatterns.append(path('api/create_user/', createUser, name='create_user'))
urlpatterns.append(path('api/getUsersNumber/', getUsersNumber, name='getUsersNumber'))
urlpatterns.append(path('api/getAllUsers/', getAllUsers, name= 'getAllUsers'))
urlpatterns.append(path('api/update_user/<str:id>/', updateUserNoPassword, name='update_user'))
urlpatterns.append(path('api/update_user_password/<str:id>/', updateUserPassword, name='update_user_password'))
#---------[ PRODUCTS ]---------------------------------------------------------------------------------------------------
urlpatterns.append(path('api/getProductsNumber/', getProductsNumber, name='getProductsNumber'))
urlpatterns.append(path('api/create_product/', createProduct, name='create_product'))
urlpatterns.append(path('api/create_products/', createProducts, name='create_products'))
urlpatterns.append(path('api/update_products/', updateProducts, name='update_products'))
urlpatterns.append(path('api/update_product/<str:id>/', updateProduct, name='update_product'))
urlpatterns.append(path('api/delete_product/<str:id>/', deleteProduct, name='delete_product'))
#---------[ PRODUCT REGISTERS ]---------------------------------------------------------------------------------------------------
urlpatterns.append(path('api/create_product_register/', createProductRegister, name='create_product_register'))
urlpatterns.append(path('api/create_product_register_date/', createProductRegisterGivenDate, name='create_product_register_date'))
urlpatterns.append(path('api/create_product_register_all/', createProductRegisterAllProducts, name='create_product_register_all'))
urlpatterns.append(path('api/today_product_registers/', getTodayProductRegisters, name='get_today_product_registers'))
urlpatterns.append(path('api/add_visit/<str:id>/', addVisit, name='add_visit'))
urlpatterns.append(path('api/add_visit_xd/', addVisitXD, name='add_visit_XD'))
urlpatterns.append(path('api/add_redirect/<str:id>/', addRedirect, name='add_redirect'))
#---------[REPORTS]-------------------------------------------------------------------------------------------------------
urlpatterns.append(path('api/sortByRedirects/', sortByRedirects, name='sortByRedirects'))
urlpatterns.append(path('api/sortByVisits/', sortByVisits, name='sortByVisits'))
urlpatterns.append(path('api/sumTodayVisits/', sumTodayVisits, name='sumTodayVisits'))
urlpatterns.append(path('api/sumTodayRedirects/', sumTodayRedirects, name='sumTodayRedirects'))
#urlpatterns.append(path('api/sumVisitsByMonth/', sumVisitsByMonth, name='sumVisitsByMonth'))
#urlpatterns.append(path('api/sumRedirectsByMonth/', sumRedirectsByMonth, name='sumRedirectsByMonth'))
urlpatterns.append(path('api/add_redirect_xd/', addRedirectXD, name='add_redirect_XD'))




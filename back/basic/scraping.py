# Importar el módulo de Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup

def scrapElement():
    # Establecer parametros
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--incognito')
    options.add_argument('--headless')
    # Crear una instancia del navegador
    browser = webdriver.Chrome(chrome_options=options)

    # Usar el método get para abrir una página web
    browser.get('https://www.falabella.com.co/')

    # Realizar Busqueda
    SearchInput = browser.find_element(By.ID, "testId-SearchBar-Input")
    SearchInput.send_keys("Botas" + Keys.ENTER)
    page_sourse = browser.page_source
    #print(page_sourse)
    
    #e = link_element.text
    # Hacer clic en el elemento
    # link_element.click()

    # Scrapping
    soup = BeautifulSoup(page_sourse, 'html.parser')


    # Salir
    browser.quit()
    
    return " "

'''
@api_view(['GET'])
def scarpInit(req):
    res = { 'status':0, 'element': "" }
    element = scrapElement()
    print(element)
    res['element'] = element
    res['status'] = 1
    return Response(res)
'''
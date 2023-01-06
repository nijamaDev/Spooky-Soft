# Importar el módulo de Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
#from selenium.webdriver.chrome.service import Service
#from chromedriver_py import binary_path # this will get you the path variable
#from selenium_firefox import Firefox
#from selenium.webdriver.firefox.options import Options

def scrapElement():
    # Establecer parametros
    #browser = Firefox()

    #options = webdriver.ChromeOptions()
    #options.add_argument('--ignore-certificate-errors')
    #options.add_argument('--incognito')
    #options.add_argument('--headless')
    options = webdriver.FirefoxOptions()
    options.add_argument('-headless')
    browser = webdriver.Firefox(executable_path='./geckodriver', options=options, log_path='/dev/null', service_log_path='/dev/null')
    # Crear una instancia del navegador
    #service_object = Service(binary_path)
    #browser = webdriver.Chrome(service=service_object,chrome_options=options)
    #browser = webdriver.Chrome(executable_path='chromedriver',chrome_options=options)
    #browser = webdriver.Chrome(chrome_options=options)

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
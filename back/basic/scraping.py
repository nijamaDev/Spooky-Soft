# Importar el módulo de Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

def scrapElement():
    # Establecer parametros
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--incognito')
    #options.add_argument('--headless')

    browser = webdriver.Chrome(chrome_options=options)

    # Usar el método get para abrir una página web
    browser.get('https://www.falabella.com.co/falabella-co/collection/calzado?facetSelected=true&f.product.attribute.G%C3%A9nero=Hombre&f.range.derived.variant.discount=20%25+dcto+y+m%C3%A1s')

    # Realizar Busqueda
    WebDriverWait(browser, timeout=3).until(EC.presence_of_element_located((By.ID, "testId-searchResults-products")))


    #SearchInput = browser.find_element(By.ID, "testId-SearchBar-Input")
    #SearchInput.send_keys("Botas" + Keys.ENTER)
    #browser.implicitly_wait(10)
    page_sourse = browser.page_source
    #print(page_sourse)
    
    #e = link_element.text
    # Hacer clic en el elemento
    # link_element.click()

    # Scrapping
    soup = BeautifulSoup(page_sourse, 'html.parser')
    botas = soup.find(id='testId-searchResults-products')
    print(botas['class'])

    # Salir
    browser.quit()
    
    return " "

# Importar el módulo de Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
#import time

def scrapElement():
    # Establecer parametros
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--incognito')
    options.add_argument("window-size=1920,1080")
    options.add_argument('--headless')

    browser = webdriver.Chrome(chrome_options=options)

    # Usar el método get para abrir una página web
    browser.get('https://www.falabella.com.co/falabella-co/collection/calzado?facetSelected=true&f.product.attribute.G%C3%A9nero=Hombre&f.range.derived.variant.discount=20%25+dcto+y+m%C3%A1s')

    print(browser.get_window_size())
    # Espera a que el elemento este listo
    WebDriverWait(browser, timeout=4).until(EC.presence_of_element_located((By.ID, "testId-searchResults-products")))

    # Scroll down para cargar los productos
    total_height = int(browser.execute_script("return document.body.scrollHeight"))
    for i in range(1, total_height, 40):
        browser.execute_script("window.scrollTo(0, {});".format(i))
        #time.sleep(0.1)
    #browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")

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
    serchResults = soup.find(id='testId-searchResults-products')
    zapatos = serchResults.find_all('div', attrs={"data-pod": "catalyst-pod"})
    res = []
    aux = 1
    for zapato in zapatos:
        item = {
            'dataKey': zapato['data-key'],
            'url_product': zapato.a['href'],
            'url_picture': zapato.div.div.a.img['src'],    
        }
        print(zapato.div.next_sibling.next_sibling)
            
        print(aux)
        aux += 1
        #print(zapato['data-key'])

    # Salir
    browser.quit()
    
    return " "

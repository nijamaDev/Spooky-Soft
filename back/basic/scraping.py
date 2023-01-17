# Importar el módulo de Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

def descuentos(tipo,prompt):
    # Establecer parametros
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--incognito')
    options.add_argument("window-size=1920,1080")
    options.add_argument('--headless')

    browser = webdriver.Chrome(chrome_options=options)

    # Usar el método get para abrir una página web
    if tipo == 'Hombre':
        browser.get('https://www.falabella.com.co/falabella-co/collection/calzado?facetSelected=true&f.product.attribute.G%C3%A9nero=Hombre&f.range.derived.variant.discount=20%25+dcto+y+m%C3%A1s')
    elif tipo == 'Mujer':
        browser.get('https://www.falabella.com.co/falabella-co/collection/calzado?&facetSelected=true&f.product.attribute.G%C3%A9nero=Mujer&f.range.derived.variant.discount=20%25+dcto+y+m%C3%A1s')
    elif tipo == 'Niños':
        browser.get('https://www.falabella.com.co/falabella-co/collection/calzado?facetSelected=true&f.product.attribute.G%C3%A9nero=Ni%C3%B1o&f.range.derived.variant.discount=20%25+dcto+y+m%C3%A1s')
    elif tipo == 'Niñas':
        browser.get('https://www.falabella.com.co/falabella-co/collection/calzado?facetSelected=true&f.product.attribute.G%C3%A9nero=Ni%C3%B1a&f.range.derived.variant.discount=20%25+dcto+y+m%C3%A1s')
    elif tipo == 'Personalizada':
        browser.get('https://www.falabella.com.co/falabella-co')
        SearchInput = browser.find_element(By.ID, "testId-SearchBar-Input")
        SearchInput.send_keys(prompt + Keys.ENTER)
    

    # Espera a que el elemento este listo
    WebDriverWait(browser, timeout=4).until(EC.presence_of_element_located((By.ID, "testId-searchResults-products")))

    # Scroll down para cargar los productos
    total_height = int(browser.execute_script("return document.body.scrollHeight"))
    for i in range(1, total_height, 30):
        browser.execute_script("window.scrollTo(0, {});".format(i))
        #time.sleep(0.1)
    #browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    #browser.implicitly_wait(10)
    page_sourse = browser.page_source

    # Scrapping
    soup = BeautifulSoup(page_sourse, 'html.parser')
    serchResults = soup.find(id='testId-searchResults-products')
    zapatos = serchResults.find_all('div', attrs={"data-pod": "catalyst-pod"})
    res = []

    for zapato in zapatos:
        marca = zapato.div.next_sibling.a.div.get_text()
        nombre = zapato.div.next_sibling.a.div.next_sibling.get_text()
        idn = zapato.div.next_sibling.a.div.next_sibling.next_sibling.get_text()
        colorStr = ""
        precios = [" ", " "]
        aux=0
        # Buscar Colores
        if zapato.div.next_sibling.ul != None:
            for c in zapato.div.next_sibling.ul.find_all('li'):
                colorStr += c.button['style']
        # Buscar Precios
        for p in zapato.div.next_sibling.next_sibling.ol.find_all('li'):
            precios[aux] = p.get_text()
            aux += 1
        price = precios[0].split(" ")[2]
        if precios[1] != " ":
            priceSale = precios[1].split(" ")[2]
        else:
            priceSale = " "
        
        item = {
            'store': 'Falabella',
            'name': nombre,
            'description': f'{marca} - {nombre} \nDisponible ahora. {idn}',
            'price': price if price != "-" else precios[0].split(" ")[1],
            'priceSale': priceSale,
            'location': zapato['data-key'],
            'redirect': zapato.a['href'],
            'cover': zapato.div.div.a.img['src'],
            'colors': colorStr,
        }
        res.append(item)
        
    # Salir
    browser.quit()
    
    return res

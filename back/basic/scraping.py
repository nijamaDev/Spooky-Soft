# Importar el módulo de Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
from selenium.common.exceptions import TimeoutException

def descuentos(tipo,prompt,store):
    # Establecer parametros
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--incognito')
    options.add_argument("window-size=1920,1080")
    options.add_argument('--headless')

    if store == "Falabella":
        res = falabellaScrap(options,tipo,prompt)
    elif store == "Croydon":
        res = croydonScrap(options,tipo,prompt)
    
    return res

def calzatodoScrap(browser,tipo,prompt):
    res = []
    return res

def croydonScrap(options,tipo,prompt):
    browser = webdriver.Chrome(chrome_options=options)
    if tipo == 'Hombre':
        browser.get('https://www.croydon.com.co/hombre-calzado_Discount_5-100_GENDER_339666#applied_filter_id%3Ddiscount%26applied_filter_name%3DDescuentos%26applied_filter_order%3D5%26applied_value_id%3D5-100%26applied_value_name%3DDesde+5%25+OFF%26applied_value_order%3D1%26applied_value_results%3D38%26is_custom%3Dfalse')
    elif tipo == 'Mujer':
        browser.get('https://www.croydon.com.co/mujer-calzado_Discount_5-100_GENDER_339665#applied_filter_id%3Ddiscount%26applied_filter_name%3DDescuentos%26applied_filter_order%3D5%26applied_value_id%3D5-100%26applied_value_name%3DDesde+5%25+OFF%26applied_value_order%3D1%26applied_value_results%3D56%26is_custom%3Dfalse')
    elif tipo == 'Niños':
        browser.get('https://www.croydon.com.co/ni%C3%B1os-calzado_Discount_5-100_GENDER_339667#applied_filter_id%3Ddiscount%26applied_filter_name%3DDescuentos%26applied_filter_order%3D5%26applied_value_id%3D5-100%26applied_value_name%3DDesde+5%25+OFF%26applied_value_order%3D1%26applied_value_results%3D30%26is_custom%3Dfalse')
    elif tipo == 'Niñas':
        browser.get('https://www.croydon.com.co/ni%C3%B1as-calzado_Discount_5-100#applied_filter_id%3Ddiscount%26applied_filter_name%3DDescuentos%26applied_filter_order%3D6%26applied_value_id%3D5-100%26applied_value_name%3DDesde+5%25+OFF%26applied_value_order%3D1%26applied_value_results%3D147%26is_custom%3Dfalse')
    elif tipo == 'Personalizada':
        browser.get('https://www.croydon.com.co/')
        SearchInput = browser.find_element(By.ID, "search-input")
        SearchInput.send_keys(prompt + Keys.ENTER)

    # Scroll down para cargar los productos
    total_height = int(browser.execute_script("return document.body.scrollHeight"))
    for i in range(1, total_height, 50):
        browser.execute_script("window.scrollTo(0, {});".format(i))

    page_sourse = browser.page_source

    soup = BeautifulSoup(page_sourse, 'html.parser')
    if soup.find('main').section == None:
        res = []
    else:
        serchResults = soup.ol.find_all('div',class_="ui-search-result__wrapper shops__result-wrapper")

        res = []

        for zapato in serchResults:
            nombre =zapato.div.div.next_sibling.div.get_text()
            idn = zapato.div.div.next_sibling.div.next_sibling.div.div.div.next_sibling.get_text()
            if zapato.div.div.next_sibling.div.next_sibling.s != None:
                price = zapato.div.div.next_sibling.div.next_sibling.s.next_sibling.span.get_text().split("$")[1]
                priceSale = zapato.div.div.next_sibling.div.next_sibling.s.get_text().split("$")[1]
            else:
                #print(zapato.div.div.next_sibling.div.next_sibling.div.div.div.get_text())
                price = zapato.div.div.next_sibling.div.next_sibling.div.div.div.get_text().split("$")[1]
                priceSale = None
            colorStr = ""
            item = {
                'store': 'Croydon',
                'name': nombre,
                'description': f'{nombre} \nDisponible ahora {idn}',
                'price': price,
                'priceSale': priceSale,
                'location': zapato.a['href'],
                'redirect': zapato.a['href'],
                'cover': zapato.img['src'],
                'colors': colorStr,
            }
            res.append(item)

    browser.quit()
    return res


    
def falabellaScrap(options,tipo,prompt):
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
        #print("Perso")
        browser.get('https://www.falabella.com.co/falabella-co')
        SearchInput = browser.find_element(By.ID, "testId-SearchBar-Input")
        SearchInput.send_keys(prompt + Keys.ENTER)
        time.sleep(10)
    

    # Espera a que el elemento este listo
    try:
        #print("try")
        WebDriverWait(browser, timeout=4).until(EC.presence_of_element_located((By.ID, "testId-searchResults-products")))

        # Scroll down para cargar los productos
        total_height = int(browser.execute_script("return document.body.scrollHeight"))
        for i in range(1, total_height, 30):
            #print("scroll")
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
        #count = 1
        for zapato in zapatos:
            #print(count)
            marca = zapato.div.next_sibling.a.div.get_text()
            nombre = zapato.div.next_sibling.a.div.next_sibling.get_text()
            idn = zapato.div.next_sibling.a.div.next_sibling.next_sibling.get_text()
            colorStr = ""
            precios = [" ", " "]
            aux=0
            # Buscar Colores
            if zapato.div.next_sibling.ul != None:
                for c in zapato.div.next_sibling.ul.find_all('li'):
                    cssColor = c.button['style'].split(":")[1]
                    if "#" in cssColor:
                        colorStr += f' {cssColor};'
                    else :
                        colorStr += cssColor
            # Buscar Precios
            for p in zapato.div.next_sibling.next_sibling.ol.find_all('li'):
                precios[aux] = p.get_text()
                aux += 1
            price = precios[0].split(" ")[2]
            if precios[1] != " ":
                priceSale = precios[1].split(" ")[2]
            else:
                priceSale = None
            
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
            #count += 1
            res.append(item)
    except TimeoutException:
        res = []
    
    browser.quit()
    return res


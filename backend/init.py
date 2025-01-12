import os
import time
import requests  
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from PIL import Image
import io

def get_images_from_google(driver, delay, max_images):
    def scroll_down(driver):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(delay)

    image_urls = set()
    skips = 0

    while len(image_urls) + skips < max_images:
        scroll_down(driver)

        thumbnails = driver.find_elements(By.CSS_SELECTOR, '.rg_i, .Q4LuWd')
        for img in thumbnails[len(image_urls) + skips:max_images]:
            try:
                img.click()
                time.sleep(delay)
            except:
                continue

            images = driver.find_elements(By.CSS_SELECTOR, '.r48jcc, .pT0Scc, .iPVvYb')
            for image in images:
                if image.get_attribute('src') in image_urls:
                    max_images += 1
                    skips += 1
                    break

                if image.get_attribute('src') and 'http' in image.get_attribute('src'):
                    image_urls.add(image.get_attribute('src'))
                    print(f"Found {len(image_urls)}")

    return image_urls

for _ in range(10):  
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)  

try:
    img_elements = driver.find_elements_by_css_selector('img.rg_i')
    print(img_elements)
except Exception as e:
    print(f"An error occurred: {str(e)}")

for i, img in enumerate(img_elements):
    img_url = img.get_attribute("src")
    if img_url and img_url.startswith('http'):
        img_response = requests.get(img_url)
        img_name = f"{i + 1}.jpg"  
        img_path = os.path.join(folder_name, img_name)

        with open(img_path, "wb") as img_file:
            img_file.write(img_response.content)
    elif img_url and img_url.startswith('data:image/jpeg;base64'):
        # Decode base64 image data and save it
        img_data = img_url.split('base64,')[1]
        img = Image.open(io.BytesIO(base64.b64decode(img_data)))
        img_name = f"{i + 1}.jpg"  
        img_path = os.path.join(folder_name, img_name)
        img.save(img_path)

print(f"Images have been downloaded and saved in the folder: {folder_name}")

driver.quit()

def download_image(download_path, url, file_name):
    try:
        image_content = requests.get(url).content
        image_file = io.BytesIO(image_content)
        image = Image.open(image_file)

        if image.format not in ["JPEG", "PNG"]:
            print(f"Skipping image with unsupported format: {url}")
            return

        file_path = os.path.join(download_path, file_name)   

        with open(file_path, "wb") as f:
            image.save(f, "JPEG")

        print("Success")
    except Exception as e:
        print('FAILED -', e)


search_query = input("Enter your Google Images search query: ")

download_path = "./imgs"
os.makedirs(download_path, exist_ok=True)

options = Options()
options.add_argument("--start-maximized")
driver = webdriver.Chrome(options=options)

search_url = f"https://www.google.com/search?q={search_query}&tbm=isch"
driver.get(search_url)

urls = get_images_from_google(driver, 2, 7)

for i, url in enumerate(urls):
    download_image(download_path, url, str(i) + ".jpg")

driver.quit()
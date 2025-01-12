import os
import io
import time
import base64  
import requests
from PIL import Image
from urllib.parse import quote
from selenium import webdriver

url = f"https://www.google.com/search?q={query_url}&tbm=isch"

driver.get(url)


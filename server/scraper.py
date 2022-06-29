import time
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By

def make_sample_info(name: str) -> dict:
    res = {
        'firstName': name.split(' ')[0],
        'lastName': name.split(' ')[1],
        'email': f"{name.split(' ')[0]}.{name.split(' ')[1]}@generated-email.com",
        'password': f"{name}-generated-password123"
    }

if __name__ == "__main__":
    driver = webdriver.Chrome()
    driver.minimize_window()
    driver.get("https://www.name-generator.org.uk/quick/")
    time.sleep(10)
    element = driver.find_element(By.XPATH, "//input[@name='count']").send_keys('100')
    time.sleep(3)
    element = driver.find_element(By.XPATH, "//input[@value='Write me some names']").click()
    time.sleep(3)
    all_names = {}
    for element in driver.find_elements(By.XPATH, "//form[@name='form']//div[@class='name_heading']"):
        name = element.text
        response = requests.post(url="http://localhost/users/", params=make_sample_info(name))
        print(f"Response for user {name}: {response}")



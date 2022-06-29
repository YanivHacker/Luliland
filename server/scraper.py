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
    return res

if __name__ == "__main__":
    driver = webdriver.Chrome()
    # driver.minimize_window()
    driver.get("https://fossbytes.com/tools/random-name-generator")
    time.sleep(10)
    element = driver.find_element(By.XPATH, "//input[@name='totalNames']").send_keys('100')
    time.sleep(3)
    element = driver.find_element(By.XPATH, "//button[text()='Generate Names']").click()
    time.sleep(5)
    all_names = {}
    for element in driver.find_elements(By.XPATH, "/html/body/div/div[1]/div/div[3]/div[2]/div/div[2]/div[2]/ul//li"):
        name = element.text
        response = requests.post(url="http://localhost:5001/users/", data=make_sample_info(name))
        print(f"Response for user {name}: {response}")

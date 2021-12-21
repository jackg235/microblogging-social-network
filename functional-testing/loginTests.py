#!/usr/bin/python
import datetime
from bs4 import BeautifulSoup
from selenium import webdriver

def setup():
    chrome_driver_path = '/opt/homebrew/bin/chromedriver' # DOWNLOAD CHROME DRIVER, REPLACE W YOUR PATH
    driver = webdriver.Chrome(executable_path = chrome_driver_path)
    url = 'http://localhost:3000/'
    driver.get(url)
    driver.implicitly_wait(100)
    return driver

def test_login_failure_missing_fields(driver):
    input_element = driver.find_element_by_id("email")
    input_element.send_keys('dag@gmail.com')
    submit_button = driver.find_element_by_id("submit-btn")
    submit_button.click()
    assert ("Sign In" in driver.page_source), "Shouldn't login because missing password"

def test_login_failure_incorrect_password(driver):
    email = driver.find_element_by_id("email")
    email.send_keys('test@test.com')
    password = driver.find_element_by_id("password")
    password.send_keys('bad password')
    submit_button = driver.find_element_by_id("submit-btn")
    submit_button.click()
    assert ("Sign In" in driver.page_source), "Shouldn't login because incorrect password"

def test_login_failure_bad_format_email(driver):
    email = driver.find_element_by_id("email")
    email.send_keys('email_that_is_not_formatted_correctly')
    password = driver.find_element_by_id("password")
    password.send_keys('password')
    submit_button = driver.find_element_by_id("submit-btn")
    submit_button.click()
    assert ("Sign In" in driver.page_source), "Shouldn't login because email is formatted incorrectly"

def test_login_success(driver):
    email = driver.find_element_by_id("email")
    email.send_keys('demo1@gmail.com')
    password = driver.find_element_by_id("password")
    password.send_keys('password')
    submit_button = driver.find_element_by_id("submit-btn")
    submit_button.click()
    while True:
        if driver.current_url == "http://localhost:3000/home" :
            assert ("Log In" not in driver.page_source), "Should navigate to login on success"
            return

def clear(driver):
    email = driver.find_element_by_id("email")
    email.clear()
    password = driver.find_element_by_id("password")
    password.clear()

def teardown(driver):
    driver.quit()

if __name__ == "__main__":
    driver = setup()
    test_login_failure_missing_fields(driver)
    clear(driver)
    test_login_failure_incorrect_password(driver)
    clear(driver)
    test_login_failure_bad_format_email(driver)
    clear(driver)
    test_login_success(driver)
    teardown(driver)
    print("Everything passed")
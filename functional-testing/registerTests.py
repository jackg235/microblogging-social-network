#!/usr/bin/python
import datetime
from bs4 import BeautifulSoup
from selenium import webdriver

def setup():
    chrome_driver_path = '/opt/homebrew/bin/chromedriver' # DOWNLOAD CHROME DRIVER, REPLACE W YOUR PATH
    driver = webdriver.Chrome(executable_path = chrome_driver_path)
    url = 'http://localhost:3000/register'
    driver.get(url)
    driver.implicitly_wait(100)
    return driver

def test_registration_failure_missing_fields(driver):
    input_element = driver.find_element_by_id("first")
    input_element.send_keys('dag')
    submit_button = driver.find_element_by_id("submit-btn")
    submit_button.click()
    assert ("Create an Account" in driver.page_source), "Shouldn't navigate because you must fill in all fields"

def test_registration_failure_duplicate_username(driver):
    first = driver.find_element_by_id("first")
    first.send_keys('jack')
    last = driver.find_element_by_id("last")
    last.send_keys('goettle')
    username = driver.find_element_by_id("username")
    username.send_keys('testuser') # duplicate username
    email = driver.find_element_by_id("email")
    email.send_keys('email')
    password = driver.find_element_by_id("password")
    password.send_keys('password')
    submit_button = driver.find_element_by_id("submit-btn")
    submit_button.click()
    assert ("Create an Account" in driver.page_source), "Shouldn't navigate because usernames must be unique"

def test_registration_failure_bad_format_email(driver):
    first = driver.find_element_by_id("first")
    first.send_keys('jack')
    last = driver.find_element_by_id("last")
    last.send_keys('goettle')
    username = driver.find_element_by_id("username")
    username.send_keys('fake_user_55') # duplicate username
    email = driver.find_element_by_id("email")
    email.send_keys('email_that_is_not_formatted_correctly')
    password = driver.find_element_by_id("password")
    password.send_keys('password')
    submit_button = driver.find_element_by_id("submit-btn")
    submit_button.click()
    assert ("Create an Account" in driver.page_source), "Shouldn't navigate because emails must be formatted correctly"

def test_registration_success(driver):
    first = driver.find_element_by_id("first")
    first.send_keys('jack')
    last = driver.find_element_by_id("last")
    last.send_keys('goettle')
    username = driver.find_element_by_id("username")
    username.send_keys('username_to_delete') # duplicate username
    email = driver.find_element_by_id("email")
    email.send_keys('email_to_delete@gmail.com')
    password = driver.find_element_by_id("password")
    password.send_keys('password')
    submit_button = driver.find_element_by_id("submit-btn")
    submit_button.click()
    while True:
        if driver.current_url == "http://localhost:3000/" :
            assert ("Create an Account" not in driver.page_source), "Should navigate to login on success"
            return

def clear(driver):
    first = driver.find_element_by_id("first")
    first.clear()
    last = driver.find_element_by_id("last")
    last.clear()
    username = driver.find_element_by_id("username")
    username.clear()
    email = driver.find_element_by_id("email")
    email.clear()
    password = driver.find_element_by_id("password")
    password.clear()

def teardown(driver):
    driver.quit()

if __name__ == "__main__":
    driver = setup()
    test_registration_failure_missing_fields(driver)
    clear(driver)
    test_registration_failure_duplicate_username(driver)
    clear(driver)
    test_registration_failure_bad_format_email(driver)
    clear(driver)
    test_registration_success(driver)
    teardown(driver)
    print("Everything passed")
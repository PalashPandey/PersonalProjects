from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup as soup
import sys
import codecs 
driver = webdriver.Chrome()
driver.implicitly_wait(10)
driver.get('https://one.drexel.edu/web/university')
username = driver.find_element_by_id('username')
password = driver.find_element_by_id('password')

username.send_keys('USERNAMEREDACTED')
password.send_keys('PASSWORDREDACTED')
driver.find_element_by_name('_eventId_proceed').click()
driver.find_element_by_xpath("//a[contains(.,'View/Update Address(es) and Phone(s)')]").click()
home_page = driver.window_handles[0]
second_page = driver.window_handles[1]
driver.switch_to_window(second_page)

driver.find_element_by_link_text("SCDC Services").click()
driver.find_element_by_link_text("Search the ES&P Archives").click()
select = Select(driver.find_element_by_id('i_a_majors_id'))
driver.find_element_by_id('i_a_majors_id').send_keys(Keys.CONTROL)
select.select_by_value('CI-ISYS')
select.select_by_value('CI-CS')
select.select_by_value('CI-CST')
select.select_by_value('CI-DSCI')
select.select_by_value('CI-IMAT')
select.select_by_value('CI-IT')
select.select_by_value('CI-SE')
select.select_by_value('I-ISYS')
select.select_by_value('I-IT')
select.select_by_value('I-SE')
select_status  = Select(driver.find_element_by_id('i_wa_search_id'))
#select_status.select_by_visible_text('International Citizen (non-US)')
select_status.select_by_visible_text("International Citizen (non-US)")

#driver.find_element_by_xpath("//select[@name='i_a_majors']/option[text()='Data Science']").click()
driver.find_element_by_xpath("//input[@type='submit' and @value='Search']").click()
page_nu = 1
def scraper(page_number_page):
    driver.find_element_by_link_text(str(page_number_page)).click()
    links = driver.find_elements_by_xpath("//a[@href]")
    is_links =[]
    job_html_source = []
    #driver.get(links[10])

    for i in range(20, len(links)-19):
        is_links.append(links[i].get_attribute('href'))
    global page_nu 
    for j in is_links:
        driver.get(j)
        table = driver.find_element_by_class_name("datadisplaytable")
        elem = table.find_elements_by_tag_name("a")
        elem[0].click()
        #driver.find_element_by_xpath("//a[contains(.,'Data Analytics I Tech Dev Intern ')]").click()
        source = driver.page_source
        #soup = soup(source, 'html.parser')
        with open(str(page_nu+ 99) + '.txt', 'w+', encoding='utf-8') as f:
            print(driver.page_source, file=f)
        
        page_nu += 1
    f.close()
    print(elem[0])
    driver.find_element_by_name('Return Button').click()
    driver.find_element_by_name('Return Button').click()


for i in range(2,7):
    scraper(i)
















##    if sys.stdout.encoding != 'cp850':
##      sys.stdout =  codecs.getwriter('cp850')(sys.stdout.buffer, 'xmlcharrefreplace')
##    if sys.stderr.encoding != 'cp850':
##      sys.stderr = codecs.getwriter('cp850')(sys.stderr.buffer, 'xmlcharrefreplace')
    #sys.stdout = codecs.getwriter("iso-8859-1")(sys.stdout, 'xmlcharrefreplace')
        
    #job_html_source.append(driver.page_source)
    #print(source)
#print(is_links)
#print(job_html_source)

##userId = driver.find_element_by_id('UserID')
##pin = driver.find_element_by_name('PIN')
##
##userId.send_keys('pp535')
##pin.send_keys('636433.')

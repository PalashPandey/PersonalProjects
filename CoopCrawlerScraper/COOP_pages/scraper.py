from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import io
##my_url = 'http://web.stanford.edu/~zlotnick/TextAsData/Web_Scraping_with_Beautiful_Soup.html'
##client = uReq(my_url)

##client.close()

#files = ['page1.txt', 'page2.txt', 'page3.txt' , 'page4.txt' , 'page5.txt']
##try:

filename = 'listings2.csv'
f = open(filename, 'w+')
headers = 'Company Name,     Designation ,                              Type(Coop),            Cycle,               No_Terms,             Status,               SCDC_ID_Number,          Company_description,                      Job_description,                                Unpaid,             Location,               Number_of_openings,       Recommended_qualifications,    Minimum_GPA ,                                                   Coop_level,            Majors \n   '
f.write(headers)    
for page_nu in range(100, 710 ):
    try:
        print(page_nu)
        script =open(str(page_nu) + '.txt', 'r', encoding="UTF-8")
        html = script.read()
        page_soup = soup(html, 'html.parser')
    #page_soup = page_soup.encode('utf-8')
        companies = page_soup.findAll('p')
        start = page_soup.findAll('span', {'class':'smallertext'})
        designation =  page_soup.findAll('span', {'class':'largertext'})
        titles =  page_soup.findAll('span', {'class':'bluesmallertext'})
        strong_titles = page_soup.findAll('span', {'class':'strongtext'})
        script.close()
    
        f.write( str((' '.join(companies[1].text.replace('Employer:', '').strip().split()).encode('utf-8')).decode('utf-8')) + ',' + designation[0].text.replace(',', '')  + ',' + str(start[0].text.encode('utf-8')) + ',' + str(start[1].text.encode('utf-8')) + ',' + str(start[2].text.encode('utf-8')) + ',' + str(start[3].text.encode('utf-8')) + ',' + str(start[4].text.encode('utf-8')) + ','   + str(' '.join(start[5].text.replace(',', '').strip().split()).encode('utf-8')) + ','    + str(' '.join(start[7].text.replace(',', '').strip().split()).encode('utf-8')) + ',' + str(start[8].text.encode('utf-8')) + ',' + str(start[9].text.encode('utf-8')) + ',' + str(start[11].text.encode('utf-8')) + ',' +    str(' '.join(start[14].text.replace(',', '').strip().split()).encode('utf-8')) + ',' +         str(' '.join(start[15].text.replace(',', '').strip().split()).encode('utf-8')) + ',' + str(' '.join(start[17].text.replace('Â', '').strip().split()).encode('utf-8')) + ',' + str(' '.join(start[18].text.replace(',', '').strip().split()).encode('utf-8')) + ',' + '\n' )
    except:
        pass 
f.close()

##except:
##    print('something is wrong with this file') 
#print(page_soup)
#print(soup.find_all('span', string='Employer: '))
#print(soup.find_all('span', string='Hiring Office Location: '))
print(start[0].text)
print(type(designation[0].text))
##for i in titles:
##    print(i.text)
##for i in strong_titles:
##    print(i.text)
##for i in range(len(start)):
##    if i < 11 :
##        print(strong_titles[i+2].text)
##    elif i > 11:
##        print(titles[i].text)
##    print(start[i].text)


#text = page_soup.select('.dddefault .strongtext').text
#text = page_soup.select('.dddefault .strongtext')
#employer_name = page_soup.findAll('a', {'class':'.dddefault .strongtext'})
#employer_names = page_soup.findAll('td', {'class':'dddefault'})
#print((employer_names))
##k = employer_names.a
##for j in k:
##    print(type(employer_names.findAll('a')))
##    
##    print(j.string)
##
##for i in text:
##    print(i.text)
    
#print(employer_name.text)

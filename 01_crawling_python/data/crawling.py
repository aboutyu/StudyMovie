import requests
from requests_file import FileAdapter
from bs4 import BeautifulSoup
import pymysql

# # 영화 기초정보 1차 크롤링 (소스파일을 크롤링)
# s = requests.Session()
# s.mount('file://', FileAdapter())

# resp = s.get('file:///Volumes/ESD-USB/source/01_crawling_python/data/lib/makefile.txt')
# if resp.status_code == 200:
#     soup = BeautifulSoup(resp.text, 'html.parser')
#     # print(soup)

#     for i in range(500, 500):
#         item = "tr_tot" + str(i)
#         tag = soup.find("tr", {"id":item})
#         # print(tag)

#         s = tag.find("a").get("onclick").split("'")
#         sequence = s[3]                                                            # 시퀀스

#         rank = tag.find("td", {"id" : "td_rank"}).get_text().strip()               # 순위
#         title = tag.find("td", {"id" : "td_movie"}).get_text().strip()             # 타이틀
#         opendate = tag.find("td", {"id" : "td_openDt"}).get_text().strip()         # 개봉일
#         totsales = tag.find("td", {"id" : "td_totSalesAcc"}).get_text().strip().replace(',', '')    # 매출액
#         totaudit = tag.find("td", {"id" : "td_totAudiAcc"}).get_text().strip().replace(',', '')     # 관객수
#         totScreen = tag.find("td", {"id" : "td_totScrnCnt"}).get_text().strip().replace(',', '')    # 상영관수

#         if totsales == "":
#             totsales = "0"

#         # prt = str(rank) + " / " + str(sequence) + " / " + str(title) + " / " + str(opendate) + " / " + str(totsales) + " / " + str(totaudit) + " / " + str(totScreen)
#         # print(prt)

#         # stmt = "INSERT INTO movie_db(sequence, ranking, title, opendate, totsales, totaudit, totScreen) VALUES ('" + str(sequence) + "', '" + str(rank) + "', '" + str(title) + "', '" + str(opendate) + "', " + str(totsales) + ", " + str(totaudit) + ", " + str(totScreen) + ");"
#         # print(stmt)
#         connection = pymysql.connect(host = '127.0.0.1', user = 'wproject_user', password = 'qweasd123' ,db = 'wproject')
#         try:
#             with connection.cursor() as cursor:
#                 stmt = "INSERT INTO movie_db(sequence, ranking, title, opendate, totsales, totaudit, totScreen) VALUES ('" + str(sequence) + "', '" + str(rank) + "', '" + str(title) + "', '" + str(opendate) + "', " + str(totsales) + ", " + str(totaudit) + ", " + str(totScreen) + ");"
#                 print(stmt)
#                 cursor.execute(stmt)

#             connection.commit()
#         finally:
#             connection.close()
#         print("################")


# # 2차 영화 상세정보 html 다운로드 (영화 상세화면에서 request 후 파일 저장)
# url = "http://m.kobis.or.kr/kobis/mobile/mast/mvie/searchMovieDtl.do?movieCd="
# connection = pymysql.connect(host = '127.0.0.1', user = 'wproject_user', password = 'qweasd123' ,db = 'wproject')
# try:
#     with connection.cursor() as cursor:
#         stmt = "SELECT seq, sequence, title FROM movie_db;"
#         print(stmt)
#         cursor.execute(stmt)
#         result = cursor.fetchall()
#         for seq, s, title in result:
#             req_url = url + str(s)
#             print(str(title) + ": " + req_url)

#             req = requests.get(req_url)
#             html = req.text

#             f_name = "/Volumes/ESD-USB/source/01_crawling_python/data/lib/movie_detail/" + str(seq) + "_" + str(s)
#             f = open(f_name, "w")
#             f.write(html)
#             f.close()
# finally:
#     connection.close()

# 3차 저장한 html 파일에서 원하는 데이터를 크롤링 후 상세정보 db에 insert
# f_name = "/Volumes/ESD-USB/source/01_crawling_python/data/lib/movie_detail/"   # + str(seq) + "_" + str(s)
# connection = pymysql.connect(host = '127.0.0.1', user = 'wproject_user', password = 'qweasd123' ,db = 'wproject')
# try:
#     with connection.cursor() as cursor:
#         stmt = "SELECT seq, sequence, title FROM movie_db;"
#         cursor.execute(stmt)
#         result = cursor.fetchall()
#         for seq, s, title in result:
#             req_file = f_name + str(seq) + "_" + str(s)
#             print(str(seq) + " " + str(title) + ": " + req_file)

#             s = requests.Session()
#             s.mount('file://', FileAdapter())
#             resp = s.get("file://" + req_file)
#             if resp.status_code == 200:
#                 soup = BeautifulSoup(resp.text, 'html.parser')

#                 # 썸네일이미지
#                 tmp_img = soup.select("#contents > div > div.info_basic > a > div > img")
#                 thumbnail = tmp_img[0].get("src")
#                 print("썸네일이미지: ", str(thumbnail))

#                 # 제작국가
#                 tmp_country = soup.select("#contents > div > div.info_basic > div > dl > dd:nth-child(4)")
#                 country = tmp_country[0].get_text().strip()
#                 print("제작국가: ", str(country))

#                 # 장르
#                 tmp_genre = soup.select("#contents > div > div.info_basic > div > dl > dd:nth-child(6)")
#                 genre = tmp_genre[0].get_text().strip()
#                 print("장르: ", str(genre))

#                 # 러닝타임 
#                 tmp_running = soup.select("#contents > div > div.info_basic > div > dl > dd:nth-child(10)")
#                 running = tmp_running[0].get_text().strip()
#                 print("러닝타임: ", str(running))

#                 # 관람등급
#                 tmp_rating = soup.select("#contents > div > div.info_basic > div > dl > dd:nth-child(12)")
#                 rating = tmp_rating[0].get_text().strip()
#                 print("관람등급: ", str(rating))

#                 # 감독
#                 tmp_director = soup.select("#contents > div > div:nth-child(2) > dl > dd:nth-child(2) > a")
#                 director = tmp_director[0].get_text().strip()
#                 print("감독: ", str(director))

#                 conn = pymysql.connect(host = '127.0.0.1', user = 'wproject_user', password = 'qweasd123' ,db = 'wproject')
#                 try:
#                     with conn.cursor() as cursor:
#                         stmt = "INSERT INTO movie_detail_info(movie_seq, thumbnail_image, country, genre, running, rating, director) VALUES ("
#                         stmt = stmt + "" + str(seq) + ", '" + str(thumbnail) + "', '" + str(country) + "', '" + str(genre) + "', '" + str(running) + "', '" + str(rating) + "', '" + str(director) + "');"
#                         cursor.execute(stmt)

#                     conn.commit()
#                 finally:
#                     conn.close()
#                 print("############################################")
# finally:
#     connection.close()







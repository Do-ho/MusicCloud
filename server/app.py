from flask import Flask
from flask import render_template
from db import mysql
import json
import requests

app = Flask(__name__)
db = mysql.Testdb()


@app.route("/")
def hello():
    result = db.select_all()

    text = str(result[0][0])

    return text


@app.route("/home")
def home():
    return render_template("index.html")


@app.route("/testApi")
def testApi():
    ID = "*" # 인증 정보의 Client ID
    Secret = "*" # 인증 정보의 Client Secret

    # CSR (음성 인식 API 사용 코드)
    csrdata = open("./static/voice/test.mp3", "rb") # STT를 진행하고자 하는 음성 파일

    Lang = "Kor" # Kor / Jpn / Chn / Eng
    csrURL = "https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=" + Lang
        
    csrheaders = {
        "Content-Type": "application/octet-stream", # Fix
        "X-NCP-APIGW-API-KEY-ID": ID,
        "X-NCP-APIGW-API-KEY": Secret,
    }

    csrresponse = requests.post(csrURL,  data=csrdata, headers=csrheaders)
    csrrescode = csrresponse.status_code


    # CFR(얼굴 인식 API 사용 코드)
    cfrdata = {'image': open('./static/img/이동욱.jpg', 'rb')} # 얼굴감지 데이터 파일

    cfrURL = "https://naveropenapi.apigw.ntruss.com/vision/v1/face"

    cfrheaders = {
        "X-NCP-APIGW-API-KEY-ID": ID,
        "X-NCP-APIGW-API-KEY": Secret,
    }

    cfrresponse = requests.post(cfrURL,  files=cfrdata, headers=cfrheaders)
    cfrrescode = cfrresponse.status_code

    #json 파싱
    jsonObject = json.loads(cfrresponse.text)
    jsonArray = jsonObject.get("faces")

    # 
    if(cfrrescode == 200):
        for list in jsonArray:
            print (list.get("emotion").get("value"))
            print(csrresponse.text)

            data = list.get("emotion").get("value")

        #@app.route('/')
        #def index():
        #    return emotion
    else:
        print("Error : " + cfrresponse.text)

    return render_template("testapi.html", data = data)

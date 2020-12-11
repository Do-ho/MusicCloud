from flask import Flask
from flask import render_template
import json
import requests
from flask import request
import os
from dotenv import load_dotenv
load_dotenv()

CSR_CLIENT_ID = os.getenv("CSR_CLIENT_ID")
CSR_SECRET = os.getenv("CSR_SECRET")
ADAMS_KEY = os.getenv("ADAMS_KEY")
SHUTTERSTOCK_TOKEN = os.getenv("SHUTTERSTOCK_TOKEN")

app = Flask(__name__)

@app.route("/home")
def home():
    #return render_template("index.html")
    return render_template("index.html")

# 음성인식을 통한 감정분석 기반 음악 추천
@app.route("/testApi1", methods=['POST'])
def testApi1():
    ID = CSR_CLIENT_ID # 인증 정보의 Client ID
    Secret = CSR_SECRET # 인증 정보의 Client Secret
    Key = ADAMS_KEY # ADAMS API KEY

    # CSR (음성 인식 API 사용 코드)
    f = request.files['file']
    csrdata = f.read()

    Lang = "Kor" # Kor / Jpn / Chn / Eng
    csrURL = "https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=" + Lang
        
    csrheaders = {
        "Content-Type": "application/octet-stream", # Fix
        "X-NCP-APIGW-API-KEY-ID": ID,
        "X-NCP-APIGW-API-KEY": Secret,
    }

    csrresponse = requests.post(csrURL,  data=csrdata, headers=csrheaders)
    csrrescode = csrresponse.status_code

    # text -> 감정 분석 (adams api)
    adamsURL = "http://api.adams.ai/datamixiApi/omAnalysis?" + "key=" + Key + "&query=" + csrresponse.text + "&type=0"
    adamsresponse = requests.post(adamsURL)
    adamsrescode = adamsresponse.status_code

    #json 파싱 (adams)
    jsonObject2 = json.loads(adamsresponse.text)

    emotion = jsonObject2.get("return_object").get("label")

    if emotion == "긍정":
        emotion = "happy"
    elif emotion == "부정":
        emotion = "sad"
    else :
        emotion = "inspiring"

    # ShutterStock API
    ShutterStockURL = "https://api.shutterstock.com/v2/audio/search?moods="+emotion

    ShutterStockheader = {
        "Authorization": "Bearer " + SHUTTERSTOCK_TOKEN
    }
    ShutterStockresponse = requests.get(ShutterStockURL, headers=ShutterStockheader)
    ShutterStockrescode = ShutterStockresponse.status_code
    # 
    if(csrrescode == 200):
        
        print(csrresponse.text)
        print(jsonObject2.get("return_object").get("label"))
        print(ShutterStockresponse.text)

        data = ShutterStockresponse.text

    else:
        print("Error : " + csrresponse.text)

    return data

# 텍스트를 통한 감정분석 기반 음악 추천
@app.route("/testApi2", methods=['POST'])
def testApi2():

    ID = CSR_CLIENT_ID # 인증 정보의 Client ID
    Secret = CSR_SECRET # 인증 정보의 Client Secret
    Key = ADAMS_KEY # ADAMS API KEY

    moodText = request.form["text"]
    print(moodText)

    # text -> 감정 분석 (adams api)
    adamsURL = "http://api.adams.ai/datamixiApi/omAnalysis?" + "key=" + Key + "&query=" + moodText + "&type=0"
    adamsresponse = requests.post(adamsURL)
    adamsrescode = adamsresponse.status_code

    #json 파싱 (adams)
    jsonObject2 = json.loads(adamsresponse.text)

    emotion = jsonObject2.get("return_object").get("label")

    if emotion == "긍정":
        emotion = "happy"
    elif emotion == "부정":
        emotion = "sad"
    else :
        emotion = "inspiring"

    # ShutterStock API
    ShutterStockURL = "https://api.shutterstock.com/v2/audio/search?moods="+emotion

    ShutterStockheader = {
        "Authorization": "Bearer " + SHUTTERSTOCK_TOKEN
    }
    ShutterStockresponse = requests.get(ShutterStockURL, headers=ShutterStockheader)
    ShutterStockrescode = ShutterStockresponse.status_code
    # 
    if(ShutterStockrescode == 200):
        
        print(jsonObject2.get("return_object").get("label"))
        print(ShutterStockresponse.text)

        data = ShutterStockresponse.text

    else:
        print("Error : " + ShutterStockresponse.text)

    return data



# 얼굴인식을 통한 감정분석 기반 음악 추천
@app.route("/testApi3", methods=['POST'])
def testApi3():

    ID = CSR_CLIENT_ID # 인증 정보의 Client ID
    Secret = CSR_SECRET # 인증 정보의 Client Secret

    # CFR(얼굴 인식 API 사용 코드)
    #cfrdata = {'image': open('./static/img/이동욱.jpg', 'rb')} # 얼굴감지 데이터 파일
    
    f = request.files['file']
    temp = f.read()
    cfrdata = {'image': temp}

    cfrURL = "https://naveropenapi.apigw.ntruss.com/vision/v1/face"

    cfrheaders = {
        "X-NCP-APIGW-API-KEY-ID": ID,
        "X-NCP-APIGW-API-KEY": Secret,
    }

    cfrresponse = requests.post(cfrURL,  files=cfrdata, headers=cfrheaders)
    cfrrescode = cfrresponse.status_code

    #json 파싱 (cfr)
    jsonObject = json.loads(cfrresponse.text)
    jsonArray = jsonObject.get("faces")

    #감정 결과
    if(cfrrescode == 200):
        for list in jsonArray:
            print (list.get("emotion").get("value"))

        emotion = list.get("emotion").get("value")

    else:
        print("Error : " + cfrresponse.text)

    if emotion == ["laugh", "smile", "suprise"]:
        emotion = "happy"
    elif emotion == ["angry", "disgust", "fear", "sad"]:
        emotion = "sad"
    else:
        emotion = "inspiring"

    # ShutterStock API
    ShutterStockURL = "https://api.shutterstock.com/v2/audio/search?moods="+emotion

    ShutterStockheader = {
        "Authorization": "Bearer " + SHUTTERSTOCK_TOKEN
    }
    ShutterStockresponse = requests.get(ShutterStockURL, headers=ShutterStockheader)
    ShutterStockrescode = ShutterStockresponse.status_code
    
    data = ShutterStockresponse.text
    print(ShutterStockresponse.text)

    return data

from flask import Flask
import json
import requests

app = Flask(__name__)

# 공통 데이터(ID, Secret)
ID = "insert your ID" # 인증 정보의 Client ID
Secret = "insert your secret" # 인증 정보의 Client Secret

# CSR (음성 인식 API 사용 코드)
csrdata = open("./voice/test.mp3", "rb") # STT를 진행하고자 하는 음성 파일

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
cfrdata = {'image': open('./images/이동욱.jpg', 'rb')} # 얼굴감지 데이터 파일

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
    #@app.route('/')
    #def index():
    #    return emotion
else:
    print("Error : " + cfrresponse.text)

    
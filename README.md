![logo](https://user-images.githubusercontent.com/33643752/97843021-ece28700-1d2b-11eb-934b-1668d4c9b862.png)



## :tipping_hand_man: Introduce

   Music Cloud는 사용자의 감정을 텍스트, 음성, 영상을 통해 추출하고 해당 감정에 맞는 음악을 추천해주는 서비스입니다.



## :busts_in_silhouette: User Scenario

![image](https://user-images.githubusercontent.com/33643752/102004429-ddefeb00-3d53-11eb-9396-c637cf98ceef.png)



## :eyes: API Logic

![image](https://user-images.githubusercontent.com/33643752/102004401-ab45f280-3d53-11eb-83e7-4cbf400fdba3.png)



## :hammer: How to start?

(1) Clone

```
git clone https://github.com/Do-ho/MusicCloud.git
```



(2) Front-End

```
cd client
npm install
npm start
```



(3) Back-End

```
cd server

python -m venv myvenv (Window)
python3 -m venv myvenv (Mac)

source myvenv/Scripts/activate (Window)
source myvenv/bin/activate (Mac)

pip install -r requirements.txt (Window)
pip3 install -r requirements.txt (Mac)

flask run
```



(4) flask .env 설정

```
CSR_CLIENT_ID=<CSR_CLIENT_ID>
CSR_SECRET=<CSR_SECRET>
ADAMS_KEY=<ADAMS_KEY>
SHUTTERSTOCK_TOKEN=<SHUTTERSTOCK_TOKEN>
```



## :family_man_boy_boy: Contributor

- 이동욱
- 김도호
- 김의현

# YUNA
discord.js 기반의 디스코드 봇 애플리케이션

axios, cheerio를 사용하여 maple.gg에서 웹 크롤링을 하여 정보를 유저에게 출력 
기본적으로 닉네임을 검색하여 캐릭터의 사진, 직업, 서버, 길드명, 인기도를 파싱해오며, 이후 추가 정보도 가져오도록 제작할 예정

현재는 정보 검색 기능만 있지만 추후 DB 연동을 통해 각각 유저의 주간 보스 상황을 기록할 수 있는 기능을 제작할 예정 

https://discord.com/api/oauth2/authorize?client_id=389043660215549952&permissions=8&scope=bot
봇 테스트를 위한 링크 

-- 명령어 --
!정보 닉네임 //해당 닉네임의 캐릭터 정보 검색

!주간보스 //주간보스 종류 및 결정석 가격 조회

!계정생성 닉네임 //주간보스 및 추후 제작 될 기능의 기록에 사용될 닉네임 생성

!계정삭제 닉네임 //생성된 계정의 삭제 (생성당시 discord id와 일치해야함)

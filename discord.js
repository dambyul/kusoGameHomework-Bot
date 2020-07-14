//npm 사용 선언
const Discord = require('discord.js');
const axios = require("axios");
const cheerio = require("cheerio");
var Sequelize = require('sequelize');
const pad = require('pad')
//discord client 선언
const client = new Discord.Client();
const key = require('./key/key.js');
//db 연동
const sequelize = new Sequelize(
    'YUNA', // 데이터베이스 이름
    'root', // 유저 명
    key.db_pw, // 비밀번호
    {
        'host': 'localhost', // 데이터베이스 호스트
        'dialect': 'mariadb', // 사용할 데이터베이스 종류
    }
);
//테이블 정의
const user = sequelize.define('user', {
    user_name: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    user_discord: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    classMethods: {},
    tableName: 'user',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});
user.sync();

const boss = sequelize.define('boss', {
    boss_code: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    boss_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    boss_diff: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    boss_money: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
	if_weekly: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    classMethods: {},
    tableName: 'boss',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});
boss.sync();
/* 보스 정보 DB추가 영역... 나중에 이미지 넣을일 생기면 수정해야함
boss.create({boss_code:"이자쿰",boss_name:"자쿰",boss_diff:"1",boss_money:200000,if_weekly:false})
boss.create({boss_code:"노자쿰",boss_name:"자쿰",boss_diff:"2",boss_money:612500,if_weekly:false})
boss.create({boss_code:"카자쿰",boss_name:"자쿰",boss_diff:"3",boss_money:16200000,if_weekly:true})
boss.create({boss_code:"이혼테",boss_name:"혼테일",boss_diff:"1",boss_money:882000,if_weekly:false})
boss.create({boss_code:"노혼테",boss_name:"혼테일",boss_diff:"2",boss_money:1012500,if_weekly:false})
boss.create({boss_code:"카혼테",boss_name:"혼테일",boss_diff:"3",boss_money:1352000,if_weekly:false})
boss.create({boss_code:"노카웅",boss_name:"카웅",boss_diff:"2",boss_money:1250000,if_weekly:false})
boss.create({boss_code:"노핑빈",boss_name:"핑크빈",boss_diff:"2",boss_money:1404500,if_weekly:false})
boss.create({boss_code:"카핑빈",boss_name:"핑크빈",boss_diff:"3",boss_money:12800000,if_weekly:true})
boss.create({boss_code:"이파풀",boss_name:"파풀라투스",boss_diff:"1",boss_money:684500,if_weekly:false})
boss.create({boss_code:"노파풀",boss_name:"파풀라투스",boss_diff:"2",boss_money:2664500,if_weekly:false})
boss.create({boss_code:"카파풀",boss_name:"파풀라투스",boss_diff:"3",boss_money:26450000,if_weekly:true})
boss.create({boss_code:"이시그",boss_name:"시그너스",boss_diff:"1",boss_money:9112500,if_weekly:true})
boss.create({boss_code:"노시그",boss_name:"시그너스",boss_diff:"2",boss_money:14450000,if_weekly:true})
boss.create({boss_code:"노더스",boss_name:"더스크",boss_diff:"2",boss_money:49612500,if_weekly:true})
boss.create({boss_code:"카더스",boss_name:"더스크",boss_diff:"3",boss_money:92450000,if_weekly:true})
boss.create({boss_code:"노반반",boss_name:"반반",boss_diff:"2",boss_money:968000,if_weekly:false})
boss.create({boss_code:"카반반",boss_name:"반반",boss_diff:"3",boss_money:16200000,if_weekly:true})
boss.create({boss_code:"노피에",boss_name:"피에르",boss_diff:"2",boss_money:968000,if_weekly:false})
boss.create({boss_code:"카피에",boss_name:"피에르",boss_diff:"3",boss_money:16200000,if_weekly:true})
boss.create({boss_code:"노블퀸",boss_name:"블러디 퀸",boss_diff:"2",boss_money:968000,if_weekly:false})
boss.create({boss_code:"카블퀸",boss_name:"블러디 퀸",boss_diff:"3",boss_money:16200000,if_weekly:true})
boss.create({boss_code:"노벨룸",boss_name:"벨룸",boss_diff:"2",boss_money:968000,if_weekly:false})
boss.create({boss_code:"카벨룸",boss_name:"벨룸",boss_diff:"3",boss_money:21012500,if_weekly:true})
boss.create({boss_code:"노힐라",boss_name:"힐라",boss_diff:"2",boss_money:800000,if_weekly:false})
boss.create({boss_code:"하힐라",boss_name:"힐라",boss_diff:"4",boss_money:11250000,if_weekly:true})
boss.create({boss_code:"이레온",boss_name:"반 레온",boss_diff:"1",boss_money:1058000,if_weekly:false})
boss.create({boss_code:"노레온",boss_name:"반 레온",boss_diff:"2",boss_money:1458000,if_weekly:false})
boss.create({boss_code:"하레온",boss_name:"반 레온",boss_diff:"4",boss_money:2450000,if_weekly:false})
boss.create({boss_code:"이아카",boss_name:"아카이럼",boss_diff:"1",boss_money:1152000,if_weekly:false})
boss.create({boss_code:"노아카",boss_name:"아카이럼",boss_diff:"2",boss_money:2520500,if_weekly:false})
boss.create({boss_code:"이매그",boss_name:"매그너스",boss_diff:"1",boss_money:722000,if_weekly:false})
boss.create({boss_code:"노매그",boss_name:"매그너스",boss_diff:"2",boss_money:2592000,if_weekly:false})
boss.create({boss_code:"하매그",boss_name:"매그너스",boss_diff:"4",boss_money:19012500,if_weekly:true})
boss.create({boss_code:"노스우",boss_name:"스우",boss_diff:"2",boss_money:32512500,if_weekly:true})
boss.create({boss_code:"하스우",boss_name:"스우",boss_diff:"4",boss_money:74112500,if_weekly:true})
boss.create({boss_code:"노데미",boss_name:"데미안",boss_diff:"2",boss_money:33800000,if_weekly:true})
boss.create({boss_code:"하데미",boss_name:"데미안",boss_diff:"2",boss_money:70312500,if_weekly:true})
boss.create({boss_code:"이루시",boss_name:"루시드",boss_diff:"1",boss_money:35112500,if_weekly:true})
boss.create({boss_code:"노루시",boss_name:"루시드",boss_diff:"2",boss_money:40612500,if_weekly:true})
boss.create({boss_code:"하루시",boss_name:"루시드",boss_diff:"4",boss_money:80000000,if_weekly:true})
boss.create({boss_code:"노말윌",boss_name:"윌",boss_diff:"2",boss_money:46512500,if_weekly:true})
boss.create({boss_code:"하드윌",boss_name:"윌",boss_diff:"4",boss_money:88200000,if_weekly:true})
boss.create({boss_code:"진힐라",boss_name:"진 힐라",boss_diff:"4",boss_money:110450000,if_weekly:true})
boss.create({boss_code:"노듄켈",boss_name:"듄켈",boss_diff:"2",boss_money:52812500,if_weekly:true})
boss.create({boss_code:"하듄켈",boss_name:"듄켈",boss_diff:"4",boss_money:96800000,if_weekly:true})
boss.create({boss_code:"검마법",boss_name:"검은 마법사",boss_diff:"4",boss_money:500000000,if_weekly:true})
*/

const cnt_boss = sequelize.define('cnt_boss', {
    boss_code: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    user_name: {
        type: Sequelize.STRING,
		primaryKey: true,
        allowNull: false
    },
	create_at: {
        type: Sequelize.DATEONLY,
		allowNull: false,
		defaultValue: Sequelize.NOW
    }
}, {
    classMethods: {},
    tableName: 'cnt_boss',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});
cnt_boss.sync()
boss.hasMany(cnt_boss, {as : "cnts"});
/* value 삭제
tb.destroy({where: {test_name: 'test'}}).then(function(result) {
    res.json({});
}).catch(function(err) {
    //TODO: error handling
});
*/
//디스코드 메세지를 받을 경우
client.on('message', msg => {
	if (msg.content == "!주간보스") {
		boss.findAll({
			where: {
				if_weekly: true
			},
			raw: true, //dataValues만 사용
			order: [['boss_money', 'ASC']] //정렬
		})
		.then((bs) => {
			var i = 0;
			var text = "\n";
			//const boss_embed = new Discord.MessageEmbed().setTitle("주간 보스표")
			//.setColor('#0099ff') embed 테두리 색
			while(true){
				if(bs[i]){
					if(bs[i].boss_diff == 1){
						diff = "이지"
					}
					else if(bs[i].boss_diff == 2){
						diff = "노말"
					}
					else if(bs[i].boss_diff == 3){
						diff = "카오스"
					}
					else if(bs[i].boss_diff == 4){
						diff = "하드"
					}
					text = text + bs[i].boss_name + " (" + diff + ") " + pad(10,bs[i].boss_money) + "메소 \n" 
					//boss_embed.addField(bs[i].boss_name + " (" + diff + ")", bs[i].boss_money + "메소", true) 최대길이 25라서 embed 사용 x
				}
				else {
					text = text + "(검은 마법사는 월간 보스)"
					//msg.reply(boss_embed);	
					msg.reply(text);
					break
				}
				i++
			}
		});		
	}
	//db 생성
	else if (msg.content.slice(0, 6) == "!계정생성 ") {
		user.findOne({
			where: {
				user_name: msg.content.slice(6).trim()
			}
		})
		//일치하는 것이 있을 경우
		.then((sc) => {
			if(sc){
				msg.reply("이미 존재하는 이름이에요");
			}
			else {
				user.create({user_name:msg.content.slice(6).trim(),user_discord:msg.author.id})
				msg.reply("데이터의 생성이 완료되었어요\n"+"닉네임:"+msg.content.slice(6)+"\n생성자 id:"+msg.author.id);
			}
		});
	}
	else if (msg.content.slice(0, 6) == "!계정삭제 ") {
		user.findOne({
			where: {
				user_name: msg.content.slice(6), 
				user_discord: msg.author.id
			}
		})
		//일치하는 것이 있을 경우
		.then((sc) => {
			if(sc){
				user.destroy({where: {user_name: msg.content.slice(6), user_discord:msg.author.id}}).then(function(result) {
					msg.reply("데이터의 삭제가 완료되었습니다!");
				}).catch(function(err) {
				});
			}
			else {
				msg.reply("일치하는 닉네임이 없거나, discord id가 일치하지 않습니다.\n디스코드 계정을 변경한 경우, 동환#0506으로 문의해주세요.");
			}
		})
	}
	else if (msg.content.slice(0, 4) == "!기록 ") {
		const string = msg.content.slice(4).split(',');
		var name = string[0].trim();
		var code = string[1].trim();
		//보스 이름과 난이도는 다른 db에서 연동할 예정
		user.findOne({
			where: {
				user_name: name
			}
		})
		.then((sc) => {
			try{
				if(sc){
					cnt_boss.create({user_name:name,boss_code:code})
					msg.reply("user_name:"+name+",boss_code:"+code);
				}
				else {
					msg.reply("기록하려는 계정이 존재하지 않습니다. 계정 이름을 확인해주세요.");
				}
			} catch (error) {
				msg.reply("보스 설명이 잘못되었습니다. 보스 설명에 대한 자세한 정보는 추후 제공될 예정입니다");
			}
		})
	}
	/*
	else if (msg.content.slice(0, 4) == "!수정 ") {
		tb.update({test_push: msg.content.slice(4)}, {where: {test_name: 'test_name'}})
		.then(result => {
			msg.reply("데이터의 수정이 완료되었어요");
		})
		.catch(err => {
			console.error(err);
			msg.reply("오류가 발생했어요");
		});
	}
	*/
    //받은 메세지의 앞부분이 일치할 경우
    else if (msg.content.slice(0, 4) == "!정보 ") {
        //변수 선언 let은 var와 const 사이의 느낌
        let save_data = [];
        let save_data2 = [];
        let save_data3 = [];
        let save_data4 = [];
        let save_img = [];
        let save_img2 = [];
        let time;
        let lv;
        let job;
        let pop;
        let url;
        let guild;
        let murung;
        let union;
		let name = msg.content.slice(4);
        //async, await을 사용한 비동기 함수 (순서대로 실행하기 위함)
        const getHtml = async () => {
            try {
                //읽어올 페이지 주소, !정보 이후의 텍스트를 가져와 붙인 뒤, encodeURI를 사용하여 한글을 인코딩시킴
                //axios는 nodeJS와 브라우저를 위한 HTTP통신 js 라이브러리
                url = encodeURI("https://maple.gg/u/" + name);
                return await axios.get(encodeURI("https://maple.gg/u/" + name));
            } catch (error) {
                //에러가 날 경우 에러출력
                msg.reply("웹 크롤링 에러입니다");
                console.error(error);
            }
        };
        //바로 위 코드에 물려서 실행되는 코드
        getHtml()
            .then(html => {
                //크롤링 영역
                const $ = cheerio.load(html.data);
                //원하는 항목을 입력
                const $bodyList = $("div.user-summary ul.user-summary-list").children("li.user-summary-item");
                const $bodyList2 = $("div.col-6.col-md-8.col-lg-6");
                const $bodyList3 = $("div.col-lg-8");
                const $bodyList4 = $("div.col-lg-2.col-md-4.col-sm-4.col-12.mt-3");
                const $bodyList5 = $("div.py-0.py-sm-4");
                const $bodyList6 = $("div.pt-3.pb-2.pb-sm-3");

                //정보를 긁어와 배열에 저장
                $bodyList.each(function(i, elem) {
                    save_data[i] = {
                        //레벨, 직업, 인기도
                        text: $(this).text()
                    };
                });
                $bodyList2.each(function(i, elem) {
                    save_img[i] = {
                        //최근 갱신 일, 캐릭터 사진
                        time: $(this).text(),
                        img: $(this).find('img').attr('src')
                    };
                });
                $bodyList3.each(function(i, elem) {
                    save_img2[i] = {
                        //서버 마크
                        img: $(this).find('img').attr('src')
                    };
                });
                $bodyList4.each(function(i, elem) {
                    save_data2[i] = {
                        //길드 이름
                        text: $(this).text()
                    };
                });
                $bodyList5.each(function(i, elem) {
                    save_data3[i] = {
                        //무릉 층수
                        text: $(this).find('h1').text()
                    };
                });
                $bodyList6.each(function(i, elem) {
                    save_data4[i] = {
                        //유니온 레벨
                        text: $(this).find('span').text()
                    };
                });
                //긁어온 데이터에 뛰어쓰기나 들여쓰기가 많으므로 아래에서 잘라주는 작업
                //array형식에선 replace를 사용 못하므로 toString()으로 String으로 변경 후 작업
                guild = save_data2[0].text.toString().replace("\n                            길드\n                                                            ", "");
                lv = save_data[0].text.toString().replace("Lv.", "")
                job = save_data[1].text;
                pop = save_data[2].text.toString().replace("인기도\n                                ", "");
                time = save_img[0].time.toString().replace("\n                            \n                            \n                                                                    ", "");
                time = time.replace("                                일 전", "");
                time = time.replace("마지막 활동일: ", "");
                time = time.replace("\n\n                                    \n                                                            \n                        ", "");
				try{
					murung = save_data3[0].text.toString().slice(0, 2) + "층";
				} catch (exception) {
					murung = "없음"
				}
				try{
					union = save_data4[0].text.toString().slice(3, 7);
					if(save_data4[0].text.toString().slice(0, 2) == "업적"){
						union= "없음"
					}
				} catch (exception) {
					union = "없음"
				}	
				output()
            })
        function output() {
            try {
                //discord embed 기능을 사용하여 유저에게 결과 제공
                const exampleEmbed = new Discord.MessageEmbed()
                    //.setColor('#0099ff') embed 테두리 색
                    .setTitle(name) //닉네임
                    .setURL(url) //maple.gg 캐릭터 상세 링크
                    .setAuthor(guild, save_img2[0].img.toString().replace("https", "http")) //https 형식을 discord 메세지가 출력못해서 http로 변경 작업, 길드 마크
                    .setDescription("LV." + lv + " " + job + "\n인기도 : " + pop) //레벨, 직업, 인기도 출력
                    //.setThumbnail("") //썸네일 이미지 (우측에 나옴)
                    .addField('무릉도장', murung, true) //추가할 항목은 이와 같이
                    .addField('유니온', union, true)
                    .setImage(save_img[0].img.toString().replace("https", "http")) //캐릭터 이미지 출력
                    //.setTimestamp() 타임스탬프 //embed가 제작된 시간
                    .setFooter('마지막 업데이트 : ' + time + "일 전", 'http://maple.gg'); //하단 텍스트 영역, 최근 갱신 일 + maple.gg링크
                msg.reply(exampleEmbed);
            } catch (exception) {
                //만약 페이지 검색 결과가 없거나 서버에 문제가 생길 경우 유저에게 에러 출력
                msg.reply("에러! 일치하는 닉네임이 없거나, 서버 에러입니다");
            }
        };
    }
})

client.on('ready', () => {
    //처음 실행 시 디스코드 봇 실행 후 작동
    console.log(`${client.user.tag}으로 접속되었습니다!`);
});

//디스코드 앱 인증 키
client.login(key.key_value);
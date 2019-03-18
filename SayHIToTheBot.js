/*	 
 ___  __    ________  ___  ________  _______   ________            _____      ________  ________     
|\  \|\  \ |\   __  \|\  \|\_____  \|\  ___ \ |\   ___  \         / __  \    |\   __  \|\   __  \    
\ \  \/  /|\ \  \|\  \ \  \\|___/  /\ \   __/|\ \  \\ \  \       |\/_|\  \   \ \  \|\  \ \  \|\  \   
 \ \   ___  \ \   __  \ \  \   /  / /\ \  \_|/_\ \  \\ \  \      \|/ \ \  \   \ \  \\\  \ \   __  \  
  \ \  \\ \  \ \  \ \  \ \  \ /  /_/__\ \  \_|\ \ \  \\ \  \          \ \  \ __\ \  \\\  \ \  \ \  \ 
   \ \__\\ \__\ \__\ \__\ \__\\________\ \_______\ \__\\ \__\          \ \__\\__\ \_______\ \__\ \__\
    \|__| \|__|\|__|\|__|\|__|\|_______|\|_______|\|__| \|__|           \|__\|__|\|_______|\|__|\|__|
                                                                                                                                                                 
    Kaizen1018 제작, 2019-03-18 최초 배포;

		GTA 방 관리용 인사 프로그램입니다.

	한번 인사한 인원에게는 다시 인사하지 않음을 구현하였습니다.
	또한, 이를 방 마다 저장하여 각각 구현 하였습니다.
	파일은 물리적으로, 스크립트와는 별개로 저장됩니다.

	시작(적용)을 위해선 몇가지 준비가 필요합니다. 

		1. /storage/emulated/0/katalkbot/인사데이터 폴더가 준비되어야 합니다.
		2. 폴더내에 아래 파일들 안에 원하는 양식을 작성해두고, 꼭 맨 끝에는 추가적인 개행(\n)이 필요합니다.
			개행을 인식하여 저장하는 방식입니다.

		- Kaizen.txt (핫플레이스)
		- nJuice.txt (습격연습장)
		- Cultwo.txt (습격구인광장)
		- TurnUp.txt (프로즐겜러)
		
		3. 몇가지 기초 지식이 필요합니다.

			일단, 관리진 방(싸움은 사랑을 신고방) 에서 !인사데이터 를 입력시에 모든 방의 데이터를
			추가하여 불러옵니다.
			위에 적힌 네개의 방에서는 "안녕", 또는 "하이" 입력시 자동으로 저장합니다.
			아래 69번째 줄을 보시면 "String Here"가 보이실텐데, 이곳에 응답 데이터를 작성하시면 됩니다.
			참고로 일반적인 상태에서의 개행(엔터)는 반드시 "\n"으로 변경하셔서 컴파일 하셔야 합니다.

			방을 인식하는 방법은 "핫플레이스", "nJuice", "습격구인광장", "프로즐겜러"
			위 네개의 키워드가 방 이름에 포함되어 있는지 검사하여 해당 파일을 지정, 저장 및 응답 합니다.

			이에 따라 관리진분들은 해당 키워드를 방제 에서 최대한 수정되지 않도록 유의하여 주시고,
			혹여나 부득이하게 변경하여야 하는경우 저에게 수정 조치 부탁말씀 한번만 남겨주십쇼.
			바로 Push 하여 업데이트 하겠습니다.

			"//"으로 주석처리 된 replier가 세줄 보이실텐데, 테스트 모드를 위한 조치입니다.
			해당 주석처리는 수정하지 말아주세요.

			해당 스크립트는 Violet XF의 MessengerBot을 기준으로 컴파일링 되었으나,
			이 앱이 워낙 호환성이 넓어서.. Philo Project의 JS 앱만 아니면 거의 다 정상 실행 될겁니다.

		4. 본인이 직접 수정하지 마세요 

			애초에, 본인이 직접 수정하시면 바리엔트가 생기는거고, 그러면 이후에 수정처리시에 복잡해집니다.
			만약 애로사항이 있으시다면 본인이 직접 수정요청 해주셔요.

		5. 편안하게 쓰세요

			ㅋㅋㅋㅋㅋㅋㅋ 해놓고 보니 별것도 아닌것에 엄청나게 적어뒀네요.
			이후에 뭐 많이 올라올거에요.
			추가하고 싶은 기능이나 수정했음 좋겠는건 항상 말해주세요.
			연습하고 저도 좋으니... 잘 사용하세요!
*/

function response(room,msg,sender,isGroupChat,replier) {

	var room1 = 0;
	var save = "/storage/emulated/0/katalkbot/인사데이터/";
		sender = sender.replace(/[^A-Za-z_-]/g,"");
	var result = FileStream.read(save + "Kaizen.txt") + "\n" + FileStream.read(save + "nJuice.txt") + "\n" + FileStream.read(save + "Cultwo.txt") + "\n" + FileStream.read(save + "TurnUp.txt");

	if(room.indexOf("싸움은 사랑을 신고방") != -1 && msg == "!인사데이터") {
			replier.reply(result);

		}

	if(room.indexOf("GTA") != -1) {

			if(room.indexOf("핫플레이스") != -1) {
				room1 = "Kaizen";
			}
			if(room.indexOf("프로즐겜러") != -1) {
				room1 = "TurnUp";
			}
			if(room.indexOf("nJuice") != -1) {
				room1 = "nJuice";
			}
			if(room.indexOf("습격구인광장") != -1) {
				room1 = "Cultwo";

			}

	if(msg.indexOf("안녕") != -1 || msg.indexOf("하이") != -1) {
	var readed = FileStream.read(save + room1 + ".txt");
		if(readed.indexOf(sender) != -1) {
			//replier.reply("Already Exist")
		return;

		}

	else {

	var readed = FileStream.read(save + room1 + ".txt");
		if(readed.indexOf(sender) == -1) {

	var readed = FileStream.read(save + room1 + ".txt");
			FileStream.write(save + room1 + ".txt", readed + "'"+ sender + "' = true;\n");

			replier.reply("String Here");
			replier.reply("Written On Data");
			//replier.reply("현재방정보\n" + readed);
			//replier.reply("전체방정보\n" + result);

				}
			}
		}
	}
}
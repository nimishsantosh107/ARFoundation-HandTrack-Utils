/*
	RECV
		roomName
		error
	SEND
		message
		roomName
		URL
*/
window.onload = function () {
	videoElement = document.getElementsByTagName("video")[0];
}


function handleInteraction(request, sender, sendMessage) {
	//FROM POPUP
	if(request.popupmessage){ 
		console.log("FROM POPUP: ",request);
	}
	//FROM BACKGROUND
	else if(request.data){
		//PLAY/PAUSE
		if(request.data.controls){
			console.log("FROM BG: ",request.data)

			if(request.data.controls === "play" ){
				videoElement.play();
			}
			else if(request.data.controls === "pause" ){
				videoElement.pause();
			} 
			else  {
				//SEEK TIME
			}
		}
	}
	else{ console.log(request.error); }
}

//MAIN
var thisbrowser;
var videoElement;
//SET GLOBAL BROWSER
if(chrome){
	thisbrowser = chrome;
	chrome.runtime.sendMessage({"command": "activate_icon"});
}else {thisbrowser = browser;}
//HANDLE INTERACTION B/W APP and BACKGROUND
thisbrowser.runtime.onMessage.addListener(handleInteraction);
console.log("SETUP CONTENT SCRIPT");
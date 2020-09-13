var socket = io("http://localhost:3000/");
// var socket = io("https://arinteract-api.herokuapp.com/");
var isFirefox;

//CHECK IF FIREFOX
try {isFirefox = typeof InstallTrigger !== 'undefined';} 
catch(e) {isFirefox = false;}

//HADNDLE INERACTION
function serverToContent (data) {
	if(isFirefox){
		browser.tabs.query({currentWindow: true, active: true}, function (tabs) {
			browser.tabs.sendMessage(tabs[0].id, {data: data});
		});
	}else{
		chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {data: data});
		});
	}
}

socket.on('connect', async function () {
	console.log('CONNECTED');

	socket.on('updateControls', function (data) {
		serverToContent(data);
		console.log("FROM SERVER: ",data);
	});

});

//HANDLE INTERACTION
function contentToServer (request, sender) {
    //ONLY CHROME
    if (request.command === "activate_icon") {
        chrome.pageAction.show(sender.tab.id);
    }
}

//HANDLE INTERACTION
if(isFirefox){browser.runtime.onMessage.addListener(contentToServer);}
else{chrome.extension.onMessage.addListener(contentToServer);}

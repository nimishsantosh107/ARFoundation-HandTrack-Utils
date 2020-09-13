function handleInteraction(thisbrowser) {
    testButton.addEventListener('click', function () {
        thisbrowser.tabs.query({
                currentWindow: true,
                active: true
            },
            function (tabs) {
                thisbrowser.tabs.sendMessage(tabs[0].id, {
                    popupmessage: "TEST WORKS"
                });
            }
        );
    }, false);
}

document.addEventListener('DOMContentLoaded', function () {
    if (chrome) {
        handleInteraction(chrome);
    } else {
        handleInteraction(browser);
    }
}, false);
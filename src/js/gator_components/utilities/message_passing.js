export default class MessagePassing {
    constructor(superToolExtensionId) {
        this.extensionId = superToolExtensionId;
        this.port = chrome.runtime.connect(
            this.extensionId,
            {name: 'Gator', includeTlsChannelId: true,},
            );
        this.init();
    }

    init () {
        this.isNowListening(this.port);
    }

    isNowListening(port) {
        //one-time request
        port.onMessage.addListener(this.contentHeardThat);


        //long-lived connection
        let messagePort = port;
        // chrome.runtime.onConnectExternal.addListener(this.runtimeHeardThat);
    }

    contentHeardThat (msg, sender, callbackReturn) {
        let message = msg;
        if (message !== null && sender) {
            console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
            if (message.greeting == "hello") {
                let goodbye = {farewell: "goodbye"};
                callbackReturn(goodbye);
            }
        }
    }

    runtimeHeardThat (messageport) {
        let port = messageport;
        console.assert(port.name !== null);
        port.onMessage.addListener(this.didYouGetThis(message));
    }

    didYouGetThis (msg) {
        console.log('Massage received ::', msg);
        let message = msg;
        if (message) {
            console.log('msg recieved');
        }
    }

    sendThis (msg) {
        let response = msg;
        if (response) {
            chrome.tabs.sendMessage(response, function (data){
                console.log(data);
            });
        }
    }
}


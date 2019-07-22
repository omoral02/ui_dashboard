
export default class MessagePassing {
    constructor(superToolExtensionId, gatorExtensionId, chrome) {
        // this.tab_id = chrome.tabs.getCurrent((identifier)=>{
        //     return identifier;
        // });
        this.superTool_id = superToolExtensionId;
        this.superTool_port = chrome.runtime.connect(
            this.superTool_id,
            {name: 'GatorSPA_to_SuperToolEXT',
            includeTlsChannelId: true,},
            );
        this.superTool_port.onMessage.addListener((msg)=>{
            console.log(msg);
        });

        this.gator_id = gatorExtensionId;
        this.gator_port = chrome.runtime.connect(
            this.gator_id,
            {name: 'GatorSPA_to_GatorEXT', includeTlsChannelId: true,},
            );
        this.gator_port.onMessage.addListener((msg)=>{
            console.log(msg);
        });
    }

    // init (supertool, gator) {
    //     console.log('connected to Extensions:', Object.keys(supertool), '+', Object.keys(gator));
    //     this.isNowListening(supertool, gator);
    // }

    // isNowListening(supertool, gator) {
    //     //one-time requests
    //     // chrome.runtime.onMessageExternal.addListener(supertool);
    //     // chrome.runtime.onMessageExternal.addListener(gator);

    //     //long-lived connections
    //     // let supertool_messagePort = supertool;
    //     // chrome.runtime.onConnectExternal.addListener(this.runtimeHeardThat);
    //     chrome.runtime.onConnect.addListener(this.runtimeHeardThat(supertool));
    //     chrome.runtime.onConnect.addListener(this.runtimeHeardThat(gator));
  
    // }

    // contentHeardThat (msg, sender, sendResponse) {
    //     let message = msg;
    //     if (message !== null && sender) {
    //         console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    //         if (message.type == "SEND") {
    //             let goodbye = {farewell: "goodbye"};
    //             sendResponse(goodbye);
    //         }
    //     }
    // }

    // runtimeHeardThat (messageport) {
    //     let port = messageport;
    //     console.assert(port.name !== null);
    //     console.log(port.tab ?
    //         "from a content script:" + sender.tab.url :
    //         "from the extension");
    //     port.onMessage.addListener(this.didYouGetThis(message));
    // }

    // didYouGetThis (msg) {
    //     console.log('Massage received ::', msg);
    //     let message = msg;
    //     if (message) {
    //         console.log('msg recieved', message);
    //     }
    // }

    // sendThis (msg) {
    //     let response = msg;
    //     if (response) {
    //         chrome.tabs.sendMessage(response, function (data){
    //             console.log(data);
    //         });
    //     }
    // }
}


chrome.runtime.onInstalled.addListener(function (details) {
const parent = chrome.contextMenus.create({
    id: "reference",
    title: "WebRefに追加",
    contexts: ["image","video"],
  });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "reference") {
        // 追加した右クリックの項目がクリックされた時の処理を書く
        if(info.mediaType=='image'){
        let url = info.srcUrl;  // 選択文字列を取得する
        chrome.storage.local.get(null,function(data){
            if(Object.keys(data).length === 0){
                let x=[];
                x.push({"id":0,"url":url,"type":'IMG'});
                chrome.storage.local.set({"urls":x});
                chrome.storage.local.set({"sum":1});
                chrome.storage.local.set({"order":[0]})
            }
            else{

                

                let x=data['urls'];
                let id=data['sum'];
                let order=data['order']
                x.push({"id":id,"url":url,"type":'IMG'});
                order.push(id);
                chrome.storage.local.set({"urls":x});
                chrome.storage.local.set({"sum":id+1});
                chrome.storage.local.set({"order":order});
            }
            
            
        });
        chrome.tabs.sendMessage(tab.id, {
          message: 'flash',
        });

      }


      else if(tab.url.indexOf("https://www.youtube.com/watch?") > -1){
        let url = tab.url.replace("watch?v=","embed/");  // 選択文字列を取得する
        chrome.storage.local.get(null,function(data){
            if(Object.keys(data).length === 0){
                let x=[];
                x.push({"id":0,"url":url,"type":'VIDEO'});
                chrome.storage.local.set({"urls":x});
                chrome.storage.local.set({"sum":1});
                chrome.storage.local.set({"order":[0]})
            }
            else{
                let x=data['urls'];
                let id=data['sum'];
                let order=data['order']
                x.push({"id":id,"url":url,"type":'VIDEO'});
                order.push(id);
                chrome.storage.local.set({"urls":x});
                chrome.storage.local.set({"sum":id+1});
                chrome.storage.local.set({"order":order});
            }
             
            
        });     
       



        chrome.tabs.sendMessage(tab.id, {
          message: 'flash',
        });

      }


      }
    });


chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({"url": "boardpage/boardpage.html" });
  });   

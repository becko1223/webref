let clickedimgurl="";
let type="";


window.onload = function() {



    chrome.runtime.onMessage.addListener((message) => {
        if(message.message=='youtube'){  //youtubeデータの保存の場合
          clickedimgurl=document.getElementById("share-url").value;

          type=e.target.tagName;

          let url = clickedimgurl;  // 選択文字列を取得する
        chrome.storage.local.get(null,function(data){
            if(Object.keys(data).length === 0){
                let x=[];
                x.push({"id":0,"url":url,"type":type});
                chrome.storage.local.set({"urls":x});
                chrome.storage.local.set({"sum":1});
                chrome.storage.local.set({"order":[0]})
            }
            else{
                let x=data['urls'];
                let id=data['sum'];
                let order=data['order']
                x.push({"id":id,"url":url,"type":type});
                order.push(id);
                chrome.storage.local.set({"urls":x});
                chrome.storage.local.set({"sum":id+1});
                chrome.storage.local.set({"order":order});
                
            }
            
            
        });
 

        }
        


        else if(message.message=='flash'){
          console.log("receive message!");
          let addbutton=document.getElementById('addbutton');
          addbutton.classList.remove('show');


          if(document.getElementById('flash-message')){
            document.getElementById('flash-message').remove();
          }
        
        //③flashメッセージ(div要素)を生成する
          const flashMessage = document.createElement('div');
          flashMessage.setAttribute('class', 'flash-message')
          flashMessage.setAttribute('id', 'flash-message')
          flashMessage.setAttribute("style", `animation-name: flash-message-fade;` );
          flashMessage.innerHTML = "資料画像を追加しました。"
        
        //④flashメッセージの挿入先を取得(body)
          const body = document.querySelector("body");
          body.prepend(flashMessage)
        
      
        
        //⑥flashメッセージを４秒後に消去する
          window.setTimeout(function(){
            flashMessage.remove();
          }, 4000);
        }
      });


        let head=document.querySelector("head");
        let bsi=document.createElement("link");
        bsi.setAttribute("rel","stylesheet");
        bsi.setAttribute("href","https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css")
        head.appendChild(bsi);


        let addbutton=document.createElement("button");
        addbutton.setAttribute("id","addbutton");
        addbutton.setAttribute("class","addbutton");
      
        //addbutton.classList.add("btn-lg")
        addbutton.innerHTML='<img src='+'"'+chrome.runtime.getURL("icons/webref128.png")+'"'+'style="width:18px; height:18px;" />';


        addbutton.addEventListener('click',function(e){
       
          
          let url = clickedimgurl;  // 選択文字列を取得する
        chrome.storage.local.get(null,function(data){
            if(Object.keys(data).length === 0){
                let x=[];
                x.push({"id":0,"url":url,"type":type});
                chrome.storage.local.set({"urls":x});
                chrome.storage.local.set({"sum":1});
                chrome.storage.local.set({"order":[0]})
            }
            else{
                let x=data['urls'];
                let id=data['sum'];
                let order=data['order']
                x.push({"id":id,"url":url,"type":type});
                order.push(id);
                chrome.storage.local.set({"urls":x});
                chrome.storage.local.set({"sum":id+1});
                chrome.storage.local.set({"order":order});
            }
            
            
        });

        if(document.getElementById('flash-message')){
          document.getElementById('flash-message').remove();
        }
      
      //③flashメッセージ(div要素)を生成する
        const flashMessage = document.createElement('div');
        flashMessage.setAttribute('class', 'flash-message')
        flashMessage.setAttribute('id', 'flash-message')
        flashMessage.setAttribute("style", `animation-name: flash-message-fade;` );
        flashMessage.innerHTML = "資料画像を追加しました。"
      
      //④flashメッセージの挿入先を取得(body)
        const body = document.querySelector("body");
        body.prepend(flashMessage)
      
      //⑥flashメッセージを４秒後に消去する
        window.setTimeout(function(){
          flashMessage.remove();
        }, 4000);

        e.target.classList.remove('show');
        

        });



        document.body.addEventListener('click', () => {
          let addbutton=document.getElementById("addbutton");
          if(addbutton.classList.contains('show')) {
            addbutton.classList.remove('show');
            
          }
        });


        document.querySelector('body').appendChild(addbutton);





     



        document.addEventListener('contextmenu',function(e){
          if(e.target.tagName=='IMG'){
            
            let addbutton=document.getElementById("addbutton");
            addbutton.style.left=(e.pageX-50)+'px';
            addbutton.style.top=(e.pageY- scrollY-50)+'px';

            if(document.body.clientWidth-e.clientX<278){
              addbutton.style.left=(e.pageX+50)+'px';
            }
            addbutton.classList.add('show');
            clickedimgurl=e.target.src;
            type=e.target.tagName;
            
          }


          if(e.target.tagName=="VIDEO" && (document.URL.indexOf("https://www.youtube.com/watch?") > -1 )){
            let addbutton=document.getElementById("addbutton");
            addbutton.style.left=(e.pageX-50)+'px';
            addbutton.style.top=(e.pageY- scrollY-50)+'px';

            if(document.body.clientWidth-e.clientX<278){
              addbutton.style.left=(e.pageX+50)+'px';
            }
            addbutton.classList.add('show');
            
            clickedimgurl=document.URL.replace("watch?v=","embed/");
            

            type=e.target.tagName;
            
          }
        });

        
          
        
        
  




}
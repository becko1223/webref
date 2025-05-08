
//選択中の画像
let selectedimages=[];


//HEX変換
function toHexColor(c){
    hex="#" + toHex(c[0]) + toHex(c[1]) + toHex(c[2]);
    return hex;
  }
//16進変換
  function toHex(n) {
    var x = Number(n).toString(16);
    return x.length == 1 ? "0" + x : x;
  }




//スポイト用 モーダル画像にカーソル入れたとき

let modalimageenter=function(e){
    if(document.getElementById("colorpick").classList.contains("active")){
        
        e.target.style.cursor="crosshair";
        let x=e.offsetX;
        let y=e.offsetY;
        let spoitimage=document.createElement("img");
        spoitimage.src=e.target.src;
        spoitimage.id="spoitimage";
        spoitimage.style.width=String((e.target.width)*15)+"px";
        spoitimage.style.height=String((e.target.height)*15)+"px";
        spoitimage.style.clipPath='circle(60px at '+x*15+'px '+y*15+'px)';
        spoitimage.style.position="fixed";
        spoitimage.style.left=String(e.clientX-x*15-100)+"px";
        spoitimage.style.top=String(e.clientY-y*15)+"px";
        spoitimage.style.pointerEvents="none" //他の要素クリックのため
        let modal=document.getElementById("myModal");
        modal.appendChild(spoitimage);

        let square=document.createElement("div");
        square.id="square"
        square.classList.add("square");
        square.style.left=String(e.clientX-100-8)+"px";
        square.style.top=String(e.clientY-y-8)+"px";
        modal.appendChild(square);

        
    
    }
}

//カーソル動かしたとき
let modalimagemove=function(e){
    if(document.getElementById("colorpick").classList.contains("active")){
    
        
        let x=e.offsetX;
        let y=e.offsetY;

        let spoitimage=document.getElementById("spoitimage");
        spoitimage.style.clipPath='circle(60px at '+x*15+'px '+y*15+'px)';
        spoitimage.style.left=String(e.clientX-x*15-100)+"px";
        spoitimage.style.top=String(e.clientY-y*15)+"px";


        let square=document.getElementById("square");
        square.style.left=String(e.clientX-100-8)+"px";
        square.style.top=String(e.clientY-8)+"px";


    }
}


//カーソルが離れたとき
let modalimageleave=function(e){
    if(document.getElementById("colorpick").classList.contains("active")){
        
        e.target.style.cursor="auto";

        let spoitimage=document.getElementById("spoitimage");
        spoitimage.remove();

        let square=document.getElementById("square");
        square.remove();
    }
}

//モーダル表示のイベント用関数
let modalshow = (e) => {
    if(window.scrollY<15){
        window.scrollBy(0,15-window.scrollY); //pickrの表示位置が変にならないように
    }

    let barmenu=document.getElementsByClassName("barmenu").item(0);
    let listmenu=document.getElementsByClassName("listmenu").item(0);
    barmenu.style.zIndex="0";  //モーダルを上に持ってくるため
    listmenu.style.zIndex="0";

    let modal = document.getElementById("myModal");

    modal.classList.add("active");


    let insertimage = document.createElement("img");
    insertimage.setAttribute("idnum", e.target.id); //一覧上の同じ画像のidを保持しとく　隣のに変更のときなどのため
    insertimage.setAttribute("src", e.target.src);
    insertimage.classList.add("modalimage");
    insertimage.style.padding="0";
    insertimage.style.margin="0";
    insertimage.addEventListener('mouseenter',modalimageenter);
    insertimage.addEventListener('mousemove',modalimagemove);
    insertimage.addEventListener('mouseleave',modalimageleave);
    modal.appendChild(insertimage);


 

    document.getElementsByTagName("body").item(0).style.overflow = "hidden";  //スクロール用？


};


//画像選択イベント用関数
let select = (e) => {
    if(e.target.tagName=="IFRAME"){return;}
    if (e.target.style.backgroundColor != "rgb(201, 248, 255)") {
        e.target.style.backgroundColor = "rgb(201, 248, 255)";
        e.target.style.border="1px solid rgb(126, 201, 248)";
        selectedimages.push(e.target);
    }
    else{
        e.target.style.backgroundColor="transparent";
        e.target.style.border='';
        selectedimages.splice(selectedimages.findIndex(image=>image.id==e.target.id),1);
    }
}


//ドラッグ画面移動用

const throttle = (func, timeout) => {
    let timer;
    let lastTime;  //前回実行された時のタイムスタンプ（最初は undefined）
    return function (...args) {
      const context = this;
      if (!lastTime) {
        // 初回のみ
        func.apply(context, args);
        lastTime = Date.now();
      } else {
        // 初回以外
        clearTimeout(timer);
        timer = setTimeout( () => {
          func.apply(context, args);
          lastTime = Date.now();
        }, timeout - (Date.now() - lastTime) );
      }
    }
  }


  //ロードイベント
window.onload = function() {


    //使い方説明用画像
    document.getElementById("add1").src=chrome.runtime.getURL("icons/add1.jpg");
    document.getElementById("add2").src=chrome.runtime.getURL("icons/add2.jpg");
    document.getElementById("view1").src=chrome.runtime.getURL("icons/view1.jpg");
    document.getElementById("view2").src=chrome.runtime.getURL("icons/view2.png");
    document.getElementById("view3").src=chrome.runtime.getURL("icons/view3.png");
    document.getElementById("view4").src=chrome.runtime.getURL("icons/view4.png");
    document.getElementById("manipulate1").src=chrome.runtime.getURL("icons/manipulate1.jpg");
    document.getElementById("manipulate2").src=chrome.runtime.getURL("icons/manipulate2.jpg");
    document.getElementById("manipulate3").src=chrome.runtime.getURL("icons/manipulate3.png");

    //スポイト画像
    let colorpick=document.getElementById("colorpick");
    spoitimage=document.createElement("img");
    spoitimage.src=chrome.runtime.getURL("icons/spoit.png");
    spoitimage.style.width="25px";
    spoitimage.style.height="25px";
    colorpick.appendChild(spoitimage);


    //ピッカー要素
    const picker = Pickr.create({
        el: '#picker',
        useAsButton: true,
        theme: 'monolith',
        comparison: 'false',
        components: {
          palette: true,
          preview: false,
          position: 'right-middle',
          sliders: 'v',
          opacity: false,
          hue: true,
          interaction: {
            hex: true,    // HEX 表示
            rgba: true,   // RGBA 表示
            hsla: false,   // HSLA 表示
            hsva: true,   // HSVA 表示
            cmyk: false,   // CMYK 表示
            input: true,  // テキスト入力エリア
            cancel: false, // キャンセルボタン (Window 閉じる)
            clear: false,  // クリアボタン (Window 閉じない)
            save: false,   // セーブボタン
          },
        },
      });

      picker.on('change',(color, source, instance) => {
        
        document.getElementById("picker").style.backgroundColor=color.toRGBA().toString();
      })








    //モーダル閉じorスポイト
    let modal = document.getElementById("myModal");
    modal.addEventListener('click',function(event) {    
            
            if ( !event.target.classList.contains('modalbutton') && !(document.getElementById("colorpick").classList.contains('active') && event.target.classList.contains('modalimage'))) {
                
                modal.removeChild(modal.lastElementChild);
                modal.classList.remove("active");
                document.getElementsByTagName("body").item(0).style.overflow="auto"

                if(document.getElementById("colorpick").classList.contains('active')){
                    document.getElementById("colorpick").classList.remove('active');
                }
                
                let barmenu=document.getElementsByClassName("barmenu").item(0);
                let listmenu=document.getElementsByClassName("listmenu").item(0);
                barmenu.style.zIndex="1";
                listmenu.style.zIndex="1";
            }

            else if(document.getElementById("colorpick").classList.contains('active') && event.target.classList.contains('modalimage')){
                
                let canvas=document.getElementById("can");
                let context = canvas.getContext('2d');
                canvas.width=event.target.width;
                canvas.height=event.target.height;
                let src=event.target.src;
                let xhr = new XMLHttpRequest();
                xhr.open('GET', src, true);
                xhr.responseType = "blob";
                xhr.onload = CopyimagetobgImg;
                xhr.send();

                let bgImg = new Image();
                bgImg.onload = function () {

                
                

                    context.drawImage(event.target, 0, 0, canvas.width, canvas.height);
                    // 指定座標から幅1,高さ1のImageDataオブジェクトの取得。
                    let imagedata = context.getImageData(event.offsetX, event.offsetY, 1, 1);

                    // RGBAの取得。
                    let hex = toHexColor(imagedata.data);
                    navigator.clipboard.writeText(hex);
                    
                    picker.setColor(hex);
                    
                    document.getElementById("picker").style.backgroundColor=hex;
                    
                    document.getElementById("colorpick").classList.remove('active');
                    let spoitimage=document.getElementById("spoitimage");
                    spoitimage.remove();
                    let square=document.getElementById("square");
                    square.remove();



                    if(document.getElementById('flash-message')){
                        document.getElementById('flash-message').remove();
                      }
                    
                    //③flashメッセージ(div要素)を生成する
                      const flashMessage = document.createElement('div');
                      flashMessage.setAttribute('class', 'flash-message')
                      flashMessage.setAttribute('id', 'flash-message')
                      flashMessage.setAttribute("style", `animation-name: flash-message-fade;` );
                      flashMessage.innerHTML = "カラーをコピーしました！("+hex+")"
                    
                    //④flashメッセージの挿入先を取得(body)
                      const body = document.querySelector("body");
                      body.prepend(flashMessage)
                    
                    //⑥flashメッセージを４秒後に消去する
                      window.setTimeout(function(){
                        flashMessage.remove();
                      }, 4000);
                };

                function CopyimagetobgImg(){
                    const dataUrl = URL.createObjectURL(this.response);
                    bgImg.src = dataUrl;
                    setTimeout(function() {
                        window.URL.revokeObjectURL(dataUrl);
                      }, 1000);
                }
                
                event.target.style.cursor="auto";

            }
        });
    

    //モーダルボタン、閉じ防止
    let modalbuttons = document.getElementsByClassName('modalbutton');
    for(modalbutton of modalbuttons){
        modalbutton.addEventListener('click',function(e){
            e.stopPropagation();;
        });
    } 


    //モーダルボタン　イベント

    //右ボタン
    let rightbutton = document.getElementById("right");
    rightbutton.addEventListener('click',function(e){
        let modal = document.getElementById("myModal");
        let currentimage=document.getElementById(modal.lastElementChild.getAttribute("idnum")); //一覧から
        let newimage=currentimage.nextElementSibling;
        while(newimage!=null && newimage.tagName=='DIV'){
            newimage=newimage.nextElementSibling;
        }
        if(newimage==null){
            
            let div=document.getElementById("row");
            newimage=div.firstElementChild;
        }
        while(newimage.tagName=='DIV'){
            newimage=newimage.nextElementSibling;
        }
        modal.removeChild(modal.lastElementChild);
        let newinsertimage=document.createElement("img");
        newinsertimage.setAttribute("idnum",newimage.id);
        newinsertimage.setAttribute("src",newimage.src);
        newinsertimage.classList.add("modalimage");
        newinsertimage.addEventListener('mouseenter',modalimageenter);
        newinsertimage.addEventListener('mousemove',modalimagemove);
        newinsertimage.addEventListener('mouseleave',modalimageleave);
        newinsertimage.style.padding="0";
        newinsertimage.style.margin="0";
        modal.appendChild(newinsertimage);

        if(document.getElementById("colorpick").classList.contains('active')){
            document.getElementById("colorpick").classList.remove('active');
            }
    })

    //左ボタン
    let leftbutton = document.getElementById("left");
    leftbutton.addEventListener('click',function(e){
        let modal = document.getElementById("myModal");
        let currentimage=document.getElementById(modal.lastElementChild.getAttribute("idnum")); //一覧から
        let newimage=currentimage.previousElementSibling;
        while(newimage!=null && newimage.tagName=='DIV'){
            newimage=newimage.previousElementSibling;
        }
        if(newimage==null){
            let div=document.getElementById("row");
            newimage=div.lastElementChild;
        }
        while(newimage.tagName=='DIV'){
            newimage=newimage.previousElementSibling;
        }
        modal.removeChild(modal.lastElementChild);
        let newinsertimage=document.createElement("img");
        newinsertimage.setAttribute("idnum",newimage.id);
        newinsertimage.setAttribute("src",newimage.src);
        newinsertimage.classList.add("modalimage");
        newinsertimage.addEventListener('mouseenter',modalimageenter);
        newinsertimage.addEventListener('mousemove',modalimagemove);
        newinsertimage.addEventListener('mouseleave',modalimageleave);
        newinsertimage.style.padding="0";
        newinsertimage.style.margin="0";
        modal.appendChild(newinsertimage);

        if(document.getElementById("colorpick").classList.contains('active')){
            document.getElementById("colorpick").classList.remove('active');
            }
    })


    //ダウンロード用
    function downloadImage() {
        let modal=document.getElementById("myModal")
        src=modal.lastElementChild.src;
      
        let xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.responseType = "blob";
        xhr.onload = downloadImageToLocal;
        xhr.send();
      }


      function downloadImageToLocal() {
        let dlLink = document.createElement("a");
      
        const dataUrl = URL.createObjectURL(this.response);
        dlLink.href = dataUrl;
      
        const fileName = `referenceimagefromWebRef.${this.response.type.replace("image/", "")}`;
        dlLink.download = fileName;
      
        document.body.appendChild(dlLink);
        dlLink.click();
        dlLink.remove();
      
        setTimeout(function() {
          window.URL.revokeObjectURL(dataUrl);
        }, 1000);
      }

    let downloadbutton=document.getElementById('download');
    downloadbutton.addEventListener('click',downloadImage);

    
    //消去用
    let deletebutton=document.getElementById('trash');
    deletebutton.addEventListener('click',function(e){
        let modal = document.getElementById("myModal");
        let currentimage=document.getElementById(modal.lastElementChild.getAttribute("idnum")); //一覧から
        let newimage=currentimage.nextElementSibling;
    
        while(newimage!=null && newimage.tagName=='DIV'){
            newimage=newimage.nextElementSibling;
        }
        if(newimage==null){
            
            let div=document.getElementById("row");
            newimage=div.firstElementChild;
        }
        while(newimage.tagName=='DIV'){
            newimage=newimage.nextElementSibling;
        }
        modal.removeChild(modal.lastElementChild);
        let newinsertimage=document.createElement("img");
        newinsertimage.setAttribute("idnum",newimage.id);
        newinsertimage.setAttribute("src",newimage.src);
        newinsertimage.classList.add("modalimage");
        newinsertimage.addEventListener('mouseenter',modalimageenter);
        newinsertimage.addEventListener('mousemove',modalimagemove);
        newinsertimage.addEventListener('mouseleave',modalimageleave);
        newinsertimage.style.padding="0";
        newinsertimage.style.margin="0";
        modal.appendChild(newinsertimage);

        chrome.storage.local.get(null,function(data){
            let idurllist=data['urls'];
            let orderlist=data['order'];

            let deletenum=idurllist.findIndex(idurl => idurl["id"]==currentimage.id)
            if(deletenum!=-1){
                idurllist.splice(deletenum,1);
                chrome.storage.local.set({"urls":idurllist});
            }


            deletenum=orderlist.findIndex(order=>order==currentimage.id);
            if(deletenum!=-1){
                orderlist.splice(deletenum,1);
                chrome.storage.local.set({"order":orderlist});
            }
        });

        document.getElementById("row").removeChild(currentimage);
        if(document.getElementById("colorpick").classList.contains('active')){
        document.getElementById("colorpick").classList.remove('active');
        }


    })






    //複数選択ボタン
    let multiplebutton=document.getElementById("multiple");
    multiplebutton.addEventListener("click",function(e){
        let allselect=document.getElementById("allselect");
        let selectdownload=document.getElementById("selectdownload");
        let selecttrash=document.getElementById("selecttrash");
        let exportbutton=document.getElementById("export");
        let importbutton=document.getElementById("import");
        if(e.target.classList.contains("active")){
            allselect.style.display="block";
            selectdownload.style.display="block";
            selecttrash.style.display="block";
            exportbutton.style.display="none";
            importbutton.style.display="none";
            let parent=document.getElementById("row");
            let images=parent.children;
            for(let image of images){
                if(image.tagName=="IMG"){
                    image.removeEventListener('click',modalshow);
                }
                
                image.addEventListener('click',select);
            }

        }
        else{
            allselect.style.display="none";
            selectdownload.style.display="none";
            selecttrash.style.display="none";
            exportbutton.style.display="block";
            importbutton.style.display="block";
            let parent=document.getElementById("row");
            let images=parent.children;
            for(let image of images){
                image.style.backgroundColor="transparent";
                image.style.border='';
                image.removeEventListener('click',select);
                if(image.tagName=="IMG"){
                    image.addEventListener('click',modalshow);
                }
            }
            selectedimages=[];
        }
    })


    //全選択ボタン
    let allselect=document.getElementById("allselect");
    allselect.addEventListener('click',function(e){
        let images=document.querySelectorAll(".referenceimage");
        for(let image of images){
            if (image.style.backgroundColor != "rgb(201, 248, 255)") {
                image.style.backgroundColor = "rgb(201, 248, 255)";
                image.style.border="1px solid rgb(126, 201, 248)";
                selectedimages.push(image);
            }
        }
    });


    //選択ダウンロードボタン
    let selectdownload=document.getElementById("selectdownload");
    selectdownload.addEventListener('click',function(e){
        for(let image of selectedimages){
        if(image.tagName=="IMG"){
        src=image.src;
      
        let xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.responseType = "blob";
        
        xhr.onload = downloadImageToLocal;
        xhr.send();

        }
    }

    })


    //選択削除ボタン
    let selecttrash=document.getElementById("selecttrash");
    selecttrash.addEventListener('click',function(e){
   

            
            chrome.storage.local.get(null,function(data){
                let idurllist=data['urls'];
                let orderlist=data['order'];
                console.log(selectedimages)
                
            for  (let image of selectedimages){
                let deletenum=idurllist.findIndex(idurl => idurl["id"]==image.id)
                if(deletenum!=-1){
                    idurllist.splice(deletenum,1);
                     
                }
    
    
                deletenum=orderlist.findIndex(order=>order==image.id);
                if(deletenum!=-1){
                    orderlist.splice(deletenum,1);
                    
                }
            
        
    
            document.getElementById("row").removeChild(image);
            


            }
            chrome.storage.local.set({"urls":idurllist});
            chrome.storage.local.set({"order":orderlist});
            selectedimages=[];
            });
                
        })
    
        //エクスポートボタン
        let exportbutton=document.getElementById("export");
        exportbutton.addEventListener('click',async () => {
            let object;
            chrome.storage.local.get(null,function(data){
                object=data;
            });
            // ファイル保存ダイアログを表示して FileSystemFileHandle オブジェクトを取得
            const fh = await window.showSaveFilePicker({ suggestedName: '' ,
                types : [ //ファイルの種類のフィルター
                    {
                        //ファイルの説明
                        description : "Reference information file",  
                        //MIME typeと対象の拡張子
                        accept : {"application/json": [".json"]} 
                    }
                ]
            });
            
            // FileSystemWritableFileStream オブジェクトを取得
            const stream = await fh.createWritable();
           
            // テキストデータの Blob オブジェクトを生成
            const blob = new Blob([JSON.stringify(object)], { type: 'application/json' });
           
            // テキストデータをファイルに書き込む
            await stream.write(blob);
           
            // ファイルを閉じる
            await stream.close();
           
            
            
          })


          //インポートボタン
          let importbutton=document.getElementById("import");
          importbutton.addEventListener('click',async ()=> {
            const options = {
                types: [
                  {
                    description: "json Files",
                    accept: {
                      "application/json": [".json", ".JSON"],
                    },
                  },
                ],
              };
            const handle = await window.showOpenFilePicker(options);
            const file = await handle[0].getFile();
            
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (event) => {
            
            chrome.storage.local.clear();
            chrome.storage.local.set(JSON.parse(event.target.result));
            location.reload();
            };
            
          })







    
    


    //画像表示
    chrome.storage.local.get(null,function(data){
        let idurllist=data['urls'];
        let orderlist=data['order'];

        
   
        if (Array.isArray(orderlist)){
        

        //順番通りに表示
        for (orderid of orderlist){
           
            let idurl=idurllist.find(idurl => idurl['id']==orderid);
            if (idurl==undefined) continue;
            let url=idurl['url'];
            
            let div=document.getElementById("row");
   
            let image;
            let iframe;

            //img要素作成
            if(idurl['type']=="IMG") {
                image=document.createElement("img");
                image.style.padding="5px"
                image.setAttribute("src",url);
            }

            if(idurl['type']=="VIDEO"){
                image=document.createElement("div");
                iframe=document.createElement("iframe");
                iframe.setAttribute("src",url);
                iframe.setAttribute("frameborder","0");
                iframe.setAttribute("allowfullscreen",'');
                iframe.setAttribute("allow","accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture web-share")
                iframe.style.padding="5px"
                iframe.aspectRatio="16/9";
                iframe.width="100%";
                iframe.style.position="absolute";
                iframe.style.top="20%";
                
                image.style.padding="5px"
                image.style.position="relative";
                
                image.appendChild(iframe);
            }




           
            image.setAttribute("id",String(idurl['id']));
            
            image.setAttribute("class","referenceimage")
            image.style.aspectRatio="1/1"
            image.style.width="100%"
            image.style.objectFit="contain"
            
            image.style.borderRadius="10px"
            image.setAttribute("draggable","true");


            //モーダル表示イベント付け
            if(image.tagName=="IMG") image.addEventListener('click',modalshow);

            //ドラッグドロップイベント付け
            image.addEventListener('dragstart', function(e){
                e.dataTransfer.setData("text/plain" , e.target.id);
                
            });

            image.addEventListener('drag',throttle(function(e){
                if(e.clientX<document.documentElement.clientWidth/9){
                    
                    window.scrollBy(-150,0);
              

                }
                if(e.clientX>(document.documentElement.clientWidth/9)*8){
                    window.scrollBy(150,0);
                  
                }
                if(e.clientY<(document.documentElement.clientHeight/9)*3){
                    window.scrollBy(0,-150);
                    
                }
                
                if(e.clientY>(document.documentElement.clientHeight/6)*5){
                    window.scrollBy(0,150);
                }
                
            },200)); 



            /*  これだと上手く動かず

            image.addEventListener('drag',function(e){
                if(e.clientX<document.documentElement.clientWidth/9){
                    
                    window.scrollBy(-15,0);
              

                }
                if(e.clientX>(document.documentElement.clientWidth/9)*8){
                    window.scrollBy(15,0);
                  
                }
                if(e.clientY<(document.documentElement.clientHeight/9)*3){
                    window.scrollBy(0,-15);
                    
                }
                
                if(e.clientY>(document.documentElement.clientHeight/6)*5){
                    window.scrollBy(0,15);
                }
                
            }); 

            */


            
    
            image.addEventListener('dragover', function(e){
    
                e.preventDefault();
                if((e.offsetX)<(e.target.getBoundingClientRect().width/2.0)){
                    e.target.style.borderLeft='3px solid  #6C757D';
                    
                    e.target.style.borderRight='';
                }
                else {
                    e.target.style.borderRight='3px solid  #6C757D';
                    
                    e.target.style.borderLeft='';
                
                }
    
                
            });

            image.addEventListener('dragleave', function(e){
                e.target.style.borderLeft='';
                e.target.style.borderRight='';
            });
    
            image.addEventListener('drop',function(e){
                e.preventDefault();
                let dragid = Number(e.dataTransfer.getData('text'));
                let overid = Number(e.target.id);
                let element_drag = document.getElementById(dragid);
                e.target.style.borderLeft='';
                e.target.style.borderRight='';
                if((e.offsetX)<(e.target.offsetWidth/2.0)){
                    e.target.parentNode.insertBefore(element_drag,e.target);
                    chrome.storage.local.get(null,function(data){
                        let orderlist=data['order'];
                        let place=orderlist.indexOf(dragid);
                        orderlist.splice(place,1);
                        let place2=orderlist.indexOf(overid);
                        orderlist.splice(place2,0,dragid);
                        chrome.storage.local.set({"order":orderlist});
                        
                    });
    
                }
                else{
                    e.target.parentNode.insertBefore(element_drag,e.target.nextSibling);
                    chrome.storage.local.get(null,function(data){
                        let orderlist=data['order'];
                        let place=orderlist.indexOf(dragid);
                        orderlist.splice(place,1);
                        let place2=orderlist.indexOf(overid);
                        orderlist.splice(place2+1,0,dragid);
                        chrome.storage.local.set({"order":orderlist});
                        
                    });
                }
            })



            div.appendChild(image);
        
        }
        }

    });
    

    
    



}
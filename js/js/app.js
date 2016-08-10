/**
 * Created by wy on 2016/3/26.
 */
/**
 *该应用仅支持手机端
 * 启动文件.
 */
$(function(){
    //一系列初始化操作；
    addCell();setOpacity();setBox();initImg(randomMap());
    //绑定触摸事件；
    $(document).delegate(".tile","touchend",function(event){
        tapAudio=document.getElementById("tapAudio")
        burstAudio=document.getElementById("burstAudio")
        fallAudio=document.getElementById("fallAudio")
        addMarkAudio=document.getElementById("addMarkAudio")
        nextLevelAudio=document.getElementById("nextLevelAudio")
        gameAgainAudio=document.getElementById("gameAgainAudio")
        tapAudio.play()
        var targetId=event.target.parentNode.id;
        if($("#"+targetId).attr("data-checked")!="true"){
            for(i=0;i<checkedBox.length;i++){
                $("#"+checkedBox[i]).css("border",0).attr("data-checked","false");
            }
            //清空被选中的格子
            checkedBox=[];
            getSamebox(targetId);
            for(i=0;i<checkedBox.length;i++){
                burstAudio.play()
                fallAudio.play()
                showAnimte($("#"+checkedBox[i]));
            }
        }
        else{
            if(checkedBox.length>1){
                for(i=0;i<checkedBox.length;i++){
                    $("#"+checkedBox[i]).remove();
                }
                //计分
                switch (checkedBox.length){
                    case 2:mark=20
                        break;
                    case 3:mark=45
                        break;
                    case 4:mark=80
                        break;
                    case 5:mark=125
                        break;
                    case 6:mark=180
                        break;
                    case 7:mark=245
                        break;
                    case 8:mark=320
                        break;
                    case 9:mark=405
                        break;
                    case 10:mark=500
                        break;
                    case 11:mark=605
                        break;
                    case 12:mark=720
                        break;
                    case 13:mark=845
                        break;
                    case 14:mark=980
                        break;
                    case 15:mark=1125
                        break;
                    case 16:mark=1280
                        break;
                    case 17:mark=1445
                        break;
                    case 18:mark=1620
                        break;
                    case 19:mark=1805
                        break;
                    case 20:mark=2000
                        break;
                    default :
                        mark=2500
                }
		        var nowMark=$("#nowMark").text();
		        $("#nowMark").fadeOut();
                addMarkAudio.play();
                $("#addMark").addClass("animateMark").text("+"+mark)
                setTimeout("$('#addMark').css({width:0,height:0}).removeClass('animateMark').text('')",500)
		        $("#nowMark").text(nowMark-0+mark).fadeIn();
                score= nowMark;
                if(score-0>bestScore-0){
                    $("#highNum").text($("#nowMark").text());
                    localStorage.setItem("bestScore",$("#nowMark").text())
                }
                checkedBox=[];
            }
            //循环找出应该下落或左移的格子；
            for(i=0;i<10;i++){
                for(j=0;j<10;j++){
                    //下落
                    if(i+""+j<90){
                        //判断下面格子是否有图片，如果没有则下落
                        var downNum=i+""+j-0+10;
                        if(!$("#tile-"+downNum).attr("data-img")){
                            var positionTop=getPositionTop($("#cell-"+downNum)),
                                positionLeft=getPositionLeft($("#cell-"+downNum));
                            //判读格子本身是否有图片，有则下落
                            if($("#tile-"+i+j).attr("data-img")){
                                move( $("#tile-"+i+j),positionTop,positionLeft);
                                $("#tile-"+i+j).attr("id","tile-"+downNum);
                                //判读符合条件的格子上面是否还有图片
                                topHasImg(i+""+j);
                            }
                        }
                    }
                    //左移
                    if(i+""+j>=90&&(i+""+j)<99){
                        if(!$("#tile-"+i+j).attr("data-img")){
                            //确定需要左移几个格子
                            var z=-1;
                            do{
                                z++;
                                temp=i+""+j-0+z;
                            }
                            while(!$("#tile-"+temp).attr("data-img")&&temp<100);
                            if(j+z<10){
                                for(k=0;k<10;k++){
                                    //目标盒子（targetbox）和需要左移到什么位置（leftNum）
                                    var targetbox=k+""+j-0+1+(z-1),leftNum=targetbox-z;
                                    if(targetbox<10){
                                        targetbox="0"+targetbox;
                                    }
                                    if(leftNum<10){
                                        leftNum="0"+leftNum;
                                    }
                                    if($("#tile-"+targetbox).attr("data-img")){
                                        positionTop=getPositionTop($("#cell-"+leftNum));
                                        positionLeft=getPositionLeft($("#cell-"+leftNum));
                                        move($("#tile-"+targetbox),positionTop,positionLeft);
                                        $("#tile-"+targetbox).attr("id","tile-"+leftNum);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if(isGameOver()){
            //alert("李乐乐是只狗！")
             if($("#nowMark").text()-0>=$("#goal").text()-0){
             //进入下一关之前动画加跳转
                 if(level<10){
                     targetScore+=2000;
                 }
                 if(level>=10&&level<20){
                     targetScore+=2500;

                 }
                 if(level>=20&&level<30){
                     targetScore+=3000;
                 }
                 if(level>=30){
                     targetScore+=4000;
                 }
                 $(".tile").addClass("animate")
                 level++
                 setTimeout("nextLevelAnimation(targetScore,level)",1000)
             }
             else{
             //游戏重来
                 $(".tile").addClass("animate")
                 setTimeout( "gameAgain()",1200)
             }
        }
    })
})



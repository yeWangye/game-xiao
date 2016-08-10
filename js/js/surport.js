/**
 * Created by wy on 2016/3/26.
 */
/**
 *支持函数.
 */
function addCell(){
    for(i=0;i<10;i++){
        for(j=0;j<10;j++){
            var htm=document.createElement("div");
            htm.className="cell"
            htm.id="cell-"+i+j;
            $("#content").append(htm);
        }
    }
}
function setOpacity(){
    for(i=0;i<10;i++){
        for(j=0;j<10;j++){
            if((i+j)%2==1){
                var selec="#cell-"+i+j;
                $(selec).addClass("opacity4");
            }
            else
                $("#cell-"+i+j).addClass("opacity3");
        }
    }
}
function getClientWidth(){
    return $(window).width();
}
function getClientHeight(){
    return $(window).height();
}
function setBox(){
    var clientWidth=getClientWidth();
    var clientHeight=getClientHeight();
    $(".cell").css({
        "width":clientWidth/10,
        "height":clientWidth/10})
    $("#footer").css({
        "width":clientWidth,
        "height":clientHeight-clientWidth-192
    })
}
//加载图片；
function initImg(map){
    nextLevelAudio.play()
    for(var i=0;i<map.length;i++){
        for(var j=0;j<map[i].length;j++){
            var imgUrl=list[map[i][j]],
                img=document.createElement("img"),
                div=document.createElement("div");
            img.src="images/"+imgUrl;
            div.id="tile-"+i+j;
            div.className="tile";
            var w=getClientWidth()/10,
                h=getClientWidth()/10;
            $(div).attr("data-img",imgUrl);
            $(div).css("width",w);
            $(div).css("height",h);
            $(img).addClass("img-responsive").css({
                "widht":0,
                "height":0
            });
            $(div).append($(img));
            $("#cell-"+i+j).append($(div))
            $('body').append($(div));
            $("#tile-"+i+j).css("top",getPositionTop($("#cell-"+i+j)));
            $("#tile-"+i+j).css("left",getPositionLeft($("#cell-"+i+j)))
            showImgAnimate( $(img),w,h)
        }
    }
}
function getPositionTop($ele){
    return top=$ele.offset().top;
}
function getPositionLeft($ele){
    return left=$ele.offset().left;
}
//查找相同格子并渲染
function getSamebox(id,comeTowhere){
    var num=id.split("-")[1],
        topNum=num-10,
        leftNum=num- 1,
        rightNum=(num-0)+ 1,
        bottomNum=(num-0)+10;
    switch (comeTowhere){
        case "comeTobottom":
            getLeft(leftNum,id,num);
            getRight(rightNum,id,num);
            getBottom(bottomNum,id);
            break;
        case "comeToleft":
            getTop(topNum,id);
            getLeft(leftNum,id,num);
            getBottom(bottomNum,id);
            break;
        case "comeToright":
            getTop(topNum,id);
            getRight(rightNum,id,num);
            getBottom(bottomNum,id);
            break;
        case "comeTotop":
            getLeft(leftNum,id,num);
            getRight(rightNum,id,num);
            getTop(topNum,id);
            break;
        default :
            checkedBox.push(id);
            $("#"+id).attr("data-checked","true");
            getTop(topNum,id);
            getLeft(leftNum,id,num);
            getRight(rightNum,id,num);
            getBottom(bottomNum,id);
    }
}
function getTop(topNum,id){
    if(topNum>=0){
        if(topNum<10){
            topNum="0"+topNum;
        }
        var topCell="tile-"+topNum;
        if($("#"+topCell).attr("data-img")==$("#"+id).attr("data-img")&&$("#"+topCell).attr("data-checked")!="true"){
            $("#"+topCell).attr("data-checked","true");
            checkedBox.push(topCell);
            getSamebox(topCell,"comeTotop");
        }
    }
}
function getLeft(leftNum,id,num){
    if(num%10!=0){
        if(leftNum<10){
            leftNum="0"+leftNum;
        }
        var leftCell="tile-"+leftNum;
        if($("#"+leftCell).attr("data-img")==$("#"+id).attr("data-img")&&$("#"+leftCell).attr("data-checked")!="true"){
            $("#"+leftCell).attr("data-checked","true");
            checkedBox.push(leftCell);
            getSamebox(leftCell,"comeToleft");
        }
    }
}
function getRight(rightNum,id,num){
    if((num-0+1)%10!=0){
        if(rightNum<10){
            rightNum="0"+rightNum;
        }
        var rightCell="tile-"+rightNum;
        if($("#"+rightCell).attr("data-img")==$("#"+id).attr("data-img")&&$("#"+rightCell).attr("data-checked")!="true"){
            $("#"+rightCell).attr("data-checked","true");

            checkedBox.push(rightCell);
            getSamebox(rightCell,"comeToright");
        }
    }
}
function getBottom(bottomNum,id){
    if(bottomNum<100){
        var bottomCell="tile-"+bottomNum;
        if($("#"+bottomCell).attr("data-img")==$("#"+id).attr("data-img")&&$("#"+bottomCell).attr("data-checked")!="true"){
            $("#"+bottomCell).attr("data-checked","true");

            checkedBox.push(bottomCell);
            getSamebox(bottomCell,"comeTobottom");
        }
    }
}
//格子之上是否还有格子符合条件执行动画
function topHasImg(num){
    var topNum=num-10;
    if(topNum<10){
        topNum="0"+topNum;
    }
    if($("#tile-"+topNum).attr("data-img")){
        positionTop=getPositionTop($("#cell-"+num));
        positionLeft=getPositionLeft($("#cell-"+num));
        move( $("#tile-"+topNum),positionTop,positionLeft);
        $("#tile-"+topNum).attr("id","tile-"+num);
        topHasImg(topNum);
        return true;
    }
    return false;
}
//判断游戏是否结束
function isGameOver(){
    var haveImgBox=[];
    for(i=0;i<10;i++){
        for(j=0;j<10;j++){
            if($("#tile-"+i+j).attr("data-img")){
                haveImgBox.push("tile-"+i+j);
            }
        }
    }
    for(i=0;i<haveImgBox.length;i++){
        var num=haveImgBox[i].split("-")[1],
            topBox=num-10,
            leftBox=num- 1,
            rightBox=(num-0)+ 1,
            bottomBox=(num-0)+10;
        if(topBox<10){
            topBox="0"+topBox;
        }
        if(leftBox<10){
            leftBox="0"+leftBox;
        }
        if(rightBox<10){
            rightBox="0"+rightBox;
        }
        if(topHave(haveImgBox[i],"tile-"+topBox)||leftHave(haveImgBox[i],"tile-"+leftBox)||
            rightHave(haveImgBox[i],"tile-"+rightBox)||bottomHave(haveImgBox[i],"tile-"+bottomBox))
        {
            return false;
        }
    }
    return true
}
function topHave(id,targetId){
    if($("#"+id).attr("data-img")==$("#"+targetId).attr("data-img")){
        return  true
    }
    return false
}
function leftHave(id,targetId){
    var num=targetId.split("-")[1]
    if($("#"+id).attr("data-img")==$("#"+targetId).attr("data-img")){
        if((num-0+1)%10==0){
            return false
        }
        return true
    }
    return false
}
function rightHave(id,targetId){
    var num=targetId.split("-")[1]
    if($("#"+id).attr("data-img")==$("#"+targetId).attr("data-img")){
        if(num%10==0){
            return false
        }
        return true
    }
    return false
}
function bottomHave(id,targetId){
    if($("#"+id).attr("data-img")==$("#"+targetId).attr("data-img")){
        return true
    }
    return false
}
//随机生成map
function randomMap(){
    for(i=0;i<10;i++){
        map[i]=[];
        for(j=0;j<10;j++){
            map[i][j]=Math.floor(Math.random()*5+1);
        }
    }
    return map;
}

/**
 * Created by wy on 2016/3/26.
 */

//图片加载动画；
function showImgAnimate($ele,w,h){
    $ele.animate({"width":"+="+w,"height":"+="+h},"slow",function(){
    })
}
//抖动动画
function showAnimte($ele){
    $ele.css({
        "border":"solid 2px snow"
    });
    $ele.animate({top:"+=3px"},"fast",function(){
        $(this).animate({top:"-=3px"},"fast")
    })
}
//移动动画；
function move($ele,positionTop,positionLeft){
    $ele.css({
        "top":positionTop,
        "left":positionLeft
    })
}
//下一关之前动画;
function nextLevelAnimation(nextTargetScore,nextLevel){
    nextLevelAudio.play();
    $(".tile").fadeOut().remove();
    var html="<p>恭喜进入第"+nextLevel+"关"+"</p>"+"<p>这关需要"+nextTargetScore+"分"+"</p>";
    $("#nextLevelShow").append(html).css("display","block").animate({
        "top":"50%",
        "left":"20%"
    },"slow",function(){
        $("#nextLevelShow").css({
            "top":"50%",
            "left":"200%",
            "display":"none"
        })
        setTimeout(" $('#nextLevelShow').fadeOut().children('p').remove();",1000)
        $("#levelNum").text(nextLevel);
        $("#goal").text(nextTargetScore);
        initImg(randomMap());
        nextBeginScore=$("#nowMark").text();
        localStorage.setItem("nextBeginScoreStorage",nextBeginScore)
        localStorage.setItem("levelStorage", nextLevel)
        localStorage.setItem("goalStorage", nextTargetScore)
    })
}
//游戏重来动画
function gameAgain(){
    gameAgainAudio.play()
    $(".tile").fadeOut().remove();
    var html="<button class='btn' id='again'>重来</button>"
    $("#gameAgain").append(html).fadeIn();
    $("#again").css({
        "width":"80px",
        "height":"50px"
    });
}
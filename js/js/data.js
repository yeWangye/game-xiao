/**
 * Created by wy on 2016/3/22.
 *data and delegate event
 */
var checkedBox=new Array;
var score=0;
var level=1;
var bestScore=0;
var targetScore=2000;
var nextTargetScore=0;
var nextBeginScore=0;
var addMarkAudio;
var tapAudio
var burstAudio
var fallAudio
var addMarkAudio
var gameAgainAudio
bestScore=localStorage.getItem("bestScore");
if(localStorage.getItem("bestScore")){
    $("#highNum").text(bestScore);
}
else{
    $("#highNum").text(score);
}
levelStorage=localStorage.getItem("levelStorage");
if(levelStorage){
    $("#levelNum").text(levelStorage);
    level=levelStorage-0
}
else{
    $("#levelNum").text(level);
}
goalStorage=localStorage.getItem("goalStorage");
    if(goalStorage){
    $("#goal").text(goalStorage);
    targetScore=goalStorage-0
}
else{
    $("#goal").text(targetScore);
}
nextBeginScoreStorage=localStorage.getItem("nextBeginScoreStorage");
if(nextBeginScoreStorage){
    $("#nowMark").text(nextBeginScoreStorage);
}
else{
    $("#nowMark").text(nextBeginScore);
}
$(document).delegate("#again","touchend",function(){
    $("#nowMark").text(nextBeginScoreStorage||nextBeginScore);
    initImg(randomMap());
    $("#gameAgain").fadeOut().children("button").remove();
})
$(document).delegate("#icon-pause","touchend",function(){
    $(".tile").fadeOut().remove();
    initImg(randomMap())
    $("#nowMark").text(nextBeginScoreStorage||nextBeginScore)
})
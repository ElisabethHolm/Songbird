console.log(localStorage.singleVid);
if(localStorage.singleVid){ //if you're just trying to watch a single video (to see what a move looks like)
    console.log("pls work");
    //gets the video file name and sets it as the source if there is a singular video
var vid = localStorage.videotitle;
$("video").attr("src", "../images/" + vid.replace(/ /g, "_") + ".mp4");

//sets the h2 element to whatever the move is called
//$("#moveName").innerHTML= vid;
document.getElementById("moveName").innerHTML=vid;

localStorage.clear();
}



else{ //play all the videos listed in the vids array in a row (for some reason this never runs, but the problem is not with singleVid)
    document.getElementById("moveName").innerHTML="Your Created Dance:";
    var vids = localStorage.vids;
var videoCount = vids.length;
    
    function videoPlay(videoNum){
document.getElementById("myVideo").setAttribute("src","../images/" + vids[videoNum] + ".mp4");
document.getElementById("myVideo").load();
document.getElementById("myVideo").play();
    }
    
    document.getElementById('myVideo').addEventListener('ended',myHandler,false);
    var i=0;
function myHandler() {
i++;
    if(i == (videoCount-1)){
i = 0;
videoPlay(i);
    }
    else{
videoPlay(i);
    }
}
    
    localStorage.clear();
}
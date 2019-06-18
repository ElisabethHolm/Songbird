$(document).ready(function(){ 
    
const w = document.getElementById('workspace');
const m = document.getElementById('moveMenu');
var blocks = document.getElementsByClassName('block');
    
for (i=0; i<blocks.length;i++){
 //blocks[i].style.top = (125*i) + "px";
} 


function dragElement(elmnt) {
    //move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
          elmnt.style.position = "absolute";
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
      elmnt.style.top = (e.clientY+160) + "px"; 
      elmnt.style.left = (e.clientX-60) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
    
    
 //make all blocks draggable by calling the method   
for (i=0; i<blocks.length;i++){
 dragElement(blocks[i]);
} 
    
    
        // function to create a new block
$("button").click(function(){
    
        const newB = document.createElement('div');
        newB.setAttribute("class", "block");
        dragElement(newB);
    
        const form = document.createElement('form');
        const name = document.createElement('input');
        name.setAttribute("type", "text");
        name.setAttribute("placeholder", "Move Name");
        form.appendChild(name);
        newB.appendChild(form);
    
        const description = document.createElement('textarea');
        description.setAttribute("type", "text");
        description.setAttribute("placeholder", "Description (ex: on the left, for 6 counts, etc)");
        description.setAttribute("id", "description");
        form.appendChild(description);
        newB.appendChild(form);
    
        m.appendChild(newB);
        });
    
    
});



//sets the video title in local storage
  function setVid(videotitle){
        localStorage.videotitle = videotitle;
      localStorage.singleVid = true;
    }



    //gets the x and y coordinate of the upper left corner of an element
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { y: _y, x: _x };
}



function setVideoOrder(){
    localStorage.singleVid=false;
            console.log("singleVid:" + localStorage.singleVid);
    var workspaceBlocks = new Array();
    var vids = new Array();
    var allBlocks = document.getElementsByClassName('block');
    for (i=0; i<allBlocks.length; i++){
        if(getOffset(allBlocks[i]).x> 168){ //if any blocks are in the workspace, add them to the workspaceBlocks array
            workspaceBlocks.push(allBlocks[i]);
        } 
    }
    console.log(workspaceBlocks);
    //sort the blocks based on ascending x coordinate order, then add them to the vids array in the right order
   while (workspaceBlocks.length>0){
       var minimum = 0;
        for (i=0; i<workspaceBlocks.length; i++){
            if(getOffset(workspaceBlocks[i]).x<getOffset(workspaceBlocks[minimum]).x){
               minimum = i;
            }
        }
       console.log(getOffset(workspaceBlocks[minimum]).textContent);
       vids.unshift(workspaceBlocks[minimum].id); 
       workspaceBlocks.splice(minimum, minimum+1); //remove that element from the array
   }
    
localStorage.vids = vids;
    console.log(vids);
}

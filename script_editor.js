javascript:(function(){

let box = document.createElement("div");
    box.id ="dsr-edit-box-id-010";

let top = document.createElement("div");
    top.className ="top";
    
    let i = document.createElement("i");
        i.className ="drag";
        let isDragging = false, offsetX = 0, offsetY = 0;
        
        function startDrag(e){
           isDragging = true;
           i.classList.add("dragging");
           e.preventDefault();
           const event = e.touches ? e.touches[0] : e;
           offsetX = event.clientX - box.offsetLeft;
           offsetY = event.clientY - box.offsetTop;
        };
        
        function onDrag(e){
           if(!isDragging) return;
           const event = e.touches ? e.touches[0] : e; 
           box.style.left = event.clientX - offsetX + "px";
           box.style.top = event.clientY - offsetY + "px";
        };
        
        function stopDrag(){ isDragging = false; i.classList.remove("dragging"); };
        i.addEventListener("mousedown", startDrag);
        i.addEventListener("touchstart", startDrag);
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("touchmove", onDrag);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);
        
    let p = document.createElement("p");
        p.className ="close";
        p.onclick = function(){ box.classList.remove("preview"); setTimeout(function(){ document.body.removeChild(box); },1000); };
    top.appendChild(i);
    top.appendChild(p);
    
let con = document.createElement("div");
    con.className ="con";
    
    let btnBox = document.createElement("div");
        btnBox.className ="btn-box";
    function createButton(ele,text,onClick){
       let button = document.createElement(ele);
           button.innerHTML = text;
           button.className ="btn";
           button.onclick = function(){ onClick(this); };
       return button;
    };
    
    btnBox.appendChild(createButton("p","Inspect Edit",function(e){
       var script = document.createElement('script');
       script.src = "//cdn.jsdelivr.net/npm/eruda";
       document.body.appendChild(script);
       script.onload = function(){ eruda.init(); if(confirm("Console open Succesful, this control hide")){ document.body.removeChild(box); } };
    }));
    
    btnBox.appendChild(createButton("p","Alert HTML",function(e){
       if(confirm("Do you want to copy this HTML or still view it ?")){
          if(confirm("Do you want to copy manually ?")){
             let existingTextarea = document.querySelector("div#dsr-edit-box-id-010 textarea");
             if(existingTextarea){ existingTextarea.remove(); }
             
             let textra = document.createElement('textarea');
                 textra.value = document.documentElement.outerHTML;
                 textra.className ="copy-text";
                 textra.setAttribute("placeholder","Document HTML Code, And secret code");
                 textra.onkeyup = function(){ if(textra.value.trim() === "#this-hide" || textra.value.trim() === "#this-remove"){ textra.remove(); } };
             box.appendChild(textra);
             
          }else{ navigator.clipboard.writeText(document.documentElement.outerHTML).then(() =>{ alert('Text copied to clipboard!'); }).catch(err =>{ alert('Failed to copy text: ' + err); }); }
       }else{ alert(document.documentElement.outerHTML); }
    }));
    
    btnBox.appendChild(createButton("p","Edit Elements",function(e){
       if(confirm("Enable edit mode for all elements ?")){
          document.querySelectorAll("body").forEach(element =>{ 
             element.contentEditable = true;
             document.querySelector("div#dsr-edit-box-id-010").contentEditable = false;
          });
       }
    }));
    
  box.appendChild(top);
  box.appendChild(con);
  con.appendChild(btnBox);
document.body.appendChild(box);
setTimeout(function(){ box.classList.add("preview"); },300);
})();


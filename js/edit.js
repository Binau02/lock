content = document.getElementById("content");

start_pos = [0, 0]

destination = []

showingRect = document.createElement("div")
showingRect.id = "showing-rect"
document.body.append(showingRect);

document.addEventListener("keypress", (e) => {
  switch(e.key) {
    case "t":
    console.log( document.elementFromPoint(e.clientX, e.clientY) );
    break;
  }
})


line = document.createElement("div");
line.className = "line"
title = document.createElement("div");
title.className = "editable Title"
title.innerHTML = "Section titre"
line.append(title)
content.append(line)

line = document.createElement("div");
line.className = "line"
machine = document.createElement("div")
machine.className = "editable Machine"
machine.innerHTML = "Section machine"
line.append(machine)
mechanism = document.createElement("div")
mechanism.className = "editable Mechanism"
mechanism.innerHTML = "Section mechanism"
line.append(mechanism)
content.append(line);

startDrag()

function startDrag(elem = null) {
  search = ".editable"
  if (elem != null) {
    elem.id = "temp_drag";
    search = "#temp_drag"
  }
  else {
    $(".editable").each(function() {
      // this.style.position = "";
      // this.style.position = "relative"
    })
  }
  $( function() {
    $(search).draggable({
      start: function(event, ui) {
        target = event.target
        // target.parentElement.removeChild(target);
      },
      drag: function(event, ui) {
        destination = []
        elems = document.elementsFromPoint(event.pageX, event.pageY);
        // console.log(elems);
        // if (elems[0].id == "showing-rect") {
        //   elem = elems[2];
        // }
        // else {
        //   elem = elems[1]
        // }
        // console.log(elem);
        test = true
        i = 0
        do {
          elem = elems[i]
          if (elem.id != "showing-rect" && elem != event.target) {
            test = false
          }
        } while(test);
        console.log(elem);
        if (elem.id == "content") {
          destination = ["content"]
        }
        else if (elem.className != "line"){
          rect = elem.getBoundingClientRect();
          if ((event.pageX-rect.x) < rect.width/10) {
            destination = ["left"]
          }
          else if ((rect.width+rect.x-event.pageX) < rect.width/10) {
            destination = ["right"]
          }
          else if ((event.pageY-rect.y) < rect.height*0.2) {
            destination = ["top"]
          }
          else if ((rect.height+rect.y-event.pageY) < rect.height*0.2) {
            destination = ["bottom"]
          }
          else {
            destination = ["replace"]
          }
          destination.push(elem);
        }
        // console.log(destination)
        placeShowingRect();
      },
      stop: function(event, ui) {
        // console.log(event);
        showingRect.style.display = "none";
        place(event.target);
      }
    });
  });
}

function stopDrag() {
  // $(".editable").draggable("destroy");
  // console.log($(".editable"));
}

function placeShowingRect() {
  if (destination.length == 0) {
    return
  }

  // console.log(destination);

  switch (destination[0]) {
    case "content":
      showingRect.style.width = content.getBoundingClientRect().width + "px";
      showingRect.style.height = "3em"
      div = document.createElement("div");
      content.append(div);
      rect = div.getBoundingClientRect();
      div.remove();
      showingRect.style.top = rect.top + "px";
      showingRect.style.left = rect.left + "px";
      break;
    case "top":
      rect = destination[1].parentElement.getBoundingClientRect()
      showingRect.style.width = rect.width + "px";
      showingRect.style.height = (rect.height*0.2) + "px";
      showingRect.style.top = rect.top + "px";
      showingRect.style.left = rect.left + "px";
      break;
    case "bottom":
      rect = destination[1].parentElement.getBoundingClientRect()
      showingRect.style.width = rect.width + "px";
      showingRect.style.height = (rect.height*0.2) + "px";
      showingRect.style.top = (rect.bottom-rect.height*0.2) + "px";
      showingRect.style.left = rect.left + "px";
      break;
    case "left":
      rect = destination[1].getBoundingClientRect()
      showingRect.style.width = (rect.width/10) + "px";
      showingRect.style.height = (rect.height) + "px";
      showingRect.style.top = rect.top + "px";
      showingRect.style.left = rect.left + "px";
      break;
    case "right":
      rect = destination[1].getBoundingClientRect()
      showingRect.style.width = (rect.width/10) + "px";
      showingRect.style.height = (rect.height) + "px";
      showingRect.style.top = rect.top + "px";
      showingRect.style.left = (rect.right-rect.width/10) + "px";
      break;
    case "replace":
      // rect = destination[1].getBoundingClientRect()
      // showingRect.style.width = (rect.width) + "px";
      // showingRect.style.height = (rect.height) + "px";
      // showingRect.style.top = rect.top + "px";
      // showingRect.style.left = rect.left + "px";
      showingRect.style.display = "none";
      break;
  }

  showingRect.style.display = "block";
}

function place(elem) {
  if (destination.length == 0) {
    elem.style.left = "0px"
    elem.style.top = '0px'
    return
  }
  
  oldParent = elem.parentElement
  sibling = elem.nextElementSibling;
  oldParent.removeChild(elem);
  console.log(destination);
  switch (destination[0]) {
    case "content":
      line = document.createElement("div");
      line.className = "line"
      line.append(elem);
      content.append(line);
      break;
    case "top":
      baseline = destination[1].parentElement;
      line = document.createElement("div");
      line.className = "line"
      line.append(elem);
      baseline.before(line);
      break;
    case "bottom":
      baseline = destination[1].parentElement;
      line = document.createElement("div");
      line.className = "line"
      line.append(elem);
      baseline.after(line);
      break;
    case "left":
      base = destination[1];
      base.before(elem);
      break;
    case "right":
      base = destination[1];
      base.after(elem);
      break;
    case "replace":
      base = destination[1];
      base.after(elem);
      base.parentElement.removeChild(base)
      if (sibling == null) {
        oldParent.append(base)
      }
      else{
        sibling.before(base)
      }
      break;

  }
  if (oldParent.children.length == 0) {
    oldParent.remove();
  }
  elem.style.left = "0px"
  elem.style.top = '0px'
}





// const swappable = new Draggable.Swappable(
// 	document.querySelectorAll('.editable'), {
// 		draggable: '[swapItem]',
// 		delay: 0,
// 	}
// )

// swappable.on('drag:start', () => {
// 	console.log('drag:start')
// })
// swappable.on('swappable:swapped', () => {
// 	console.log('drag:swapped')
// })
// swappable.on('drag:stop', () => {
// 	console.log('drag:stop')
// })
// swappable.on('drag:move', () => {
// 	console.log('drag:move')
// })
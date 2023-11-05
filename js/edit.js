content = document.getElementById("content");

start_pos = [0, 0]

showingRect = document.createElement("div")
showingRect.id = "showing-rect"

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

$( function() {
  $( ".editable" ).draggable({
    drag: function(event, ui) {
      // console.log(event);
      elem = document.elementsFromPoint(event.pageX, event.pageY)[1];
      if (elem.localName == "body") {

      }
      else if (elem.className != "line"){
        rect = elem.getBoundingClientRect();
        if ((event.pageX-rect.x) < rect.width/10) {
          console.log("left")
        }
        if ((rect.width+rect.x-event.pageX) < rect.width/10) {
          console.log("right")
        }
        if ((event.pageY-rect.y) < rect.height/20) {
          console.log("top")
        }
        if ((rect.height+rect.y-event.pageY) < rect.height/20) {
          console.log("bottom")
        }
      }
    }
  });
});







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
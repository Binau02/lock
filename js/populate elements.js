function populate(data, isArgument = false) {
  if (typeof(data) == "object" && Array.isArray(data) == false) {
    for (let key in data) {
      createBlock(key, data[key]);
      populate(data[key]);
    }
  }
}

function createBlock(name, args) {
  // console.log(name);
  let div = document.createElement("div")
  div.className = "to-add"
  div.innerHTML = "Section " + name
  createBlockArgs(div, args)
  content.append(div)
}

function createBlockArgs(div, args) {
  if (typeof(args) != "object") {
    return;
  }
  if (Array.isArray(args)) {
    args = args[0]
  }
  for (let key in args) {
    // console.log(key)
    // console.log(args[key])
    if (typeof(args[key]) != "object") {
      div.setAttribute("arg_"+key, args[key])
    }
    else {
      let subdiv = document.createElement("div");
      subdiv.setAttribute("args", key);
      createBlockArgs(subdiv, args[key])
      div.append(subdiv)
    }
  }
}

function startDragToAdd(elem = null) {
  search = ".to-add"
  if (elem != null) {
    elem.id = "temp_drag";
    search = "#temp_drag"
    // console.log(elem)
  }
  $( function() {
    $(search).draggable({
      start: function(event, ui) {
        target = event.target
        if (target.classList.contains("editable")) {
          return
        }
        sibling = target.previousSibling;
        copy = target.cloneNode(true)
        sibling.after(copy)
        startDragToAdd(copy)
      },
      drag: function(event, ui) {
        destination = []
        elems = document.elementsFromPoint(event.pageX, event.pageY);
        test = true
        let i = 0
        let elem
        do {
          elem = elems[i]
          if (elem == undefined || (elem.id != "showing-rect" && elem != event.target)) {
            test = false
          }
          i++
        } while(test);
        if (elem == undefined) {
          showingRect.style.display = "none";
          destination = ["delete"]
          return;
        }
        // console.log(elem.classList.contains("line"));
        if (!elem.classList.contains("editable") && elem.id != "content") {
          showingRect.style.display = "none";
          destination = ["delete"]
          return;
        }
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
  if (elem != null) {
    // document.getElementById("temp_drag").id = ""
  }
}




let content = document.getElementById("elements")
let key
for (let key in data) {
  // console.log("master " + key)
  div = document.createElement("div");
  div.className = "elements-title"
  div.innerHTML = key
  content.append(div)
  populate(data[key]);
}
startDragToAdd();
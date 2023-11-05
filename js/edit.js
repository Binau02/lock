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


// line = document.createElement("div");
// line.className = "line"
// title = document.createElement("div");
// title.className = "editable Title"
// title.innerHTML = "Section titre"
// line.append(title)
// content.append(line)

// line = document.createElement("div");
// line.className = "line"
// machine = document.createElement("div")
// machine.className = "editable Machine"
// machine.innerHTML = "Section machine"
// line.append(machine)
// mechanism = document.createElement("div")
// mechanism.className = "editable Mechanism"
// mechanism.innerHTML = "Section mechanism"
// line.append(mechanism)
// content.append(line);

// startDrag()

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
        test = true
        let i = 0
        do {
          elem = elems[i]
          if (elem.id != "showing-rect" && elem != event.target) {
            test = false
          }
          i++
        } while(test);
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
  document.getElementById("temp_drag").id = ""
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
  // console.log(destination);
  if (elem.classList.contains("to-add")) {
    if (destination[0] == "replace") {
      elem.remove();
      return;
    }
    elem.classList.remove("to-add")
    elem.classList.add("editable")
    updateJson("add", elem)
  }
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
    case "delete":
      elem.remove();
      updateJson("remove", elem)
      break;
  }
  if (oldParent.children.length == 0) {
    oldParent.remove();
  }
  elem.style.left = "0px"
  elem.style.top = '0px'
}

var prevLeft = 0;
$("#elements").scroll( function(evt) {
    var currentLeft = $(this).scrollLeft();
    if(prevLeft != currentLeft) {
        prevLeft = currentLeft;
        // console.log("I scrolled horizontally.");
        document.getElementById("elements").scrollLeft -= 40;
    }
});

function save() {
  for (let i = 0; i < content.children.length; i++) {
    for (let j = 0; j < content.children[i].children.length; j++) {
      let elem = content.children[i].children[j]
      while(elem.attributes.length > 0) {
        elem.removeAttribute(elem.attributes[0].name);
      }
    }
  }

  // console.log(content.innerHTML);

  var name=prompt("Enter the name of this template");

  var data = new FormData();
  data.append("file" , content.innerHTML);
  data.append("json" , JSON.stringify(json));
  data.append("name" , name);
  var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
  xhr.open( 'post', 'http://localhost/lock/php/api.php', true );
  xhr.send(data);
}
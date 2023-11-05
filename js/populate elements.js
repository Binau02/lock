function populate(data, master) {
  if (typeof(data) == "object" && Array.isArray(data) == false) {
    for (let key in data) {
      createBlock(key, data[key], master);
      populate(data[key]);
    }
  }
}

function createBlock(name, args, master) {
  // console.log(name);
  let div = document.createElement("div")
  div.className = "to-add"
  div.innerHTML = "Section " + name
  div.setAttribute("master", master)
  div.setAttribute("selection", name)
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

function updateJson(action, elem) {
  // console.log(elem)
  // console.log(elem.children)
  if (action == "add") {
    let master = elem.getAttribute("master")
    let selection = elem.getAttribute("selection")
    if (json[master][selection] == undefined) {
      let attributes = elem.attributes
      let hasArgs = false
      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].name.includes("arg_")) {
          if (!hasArgs) {
            json[master][selection] = {}
          }
          json[master][selection][capitalizeFirstLetter(attributes[i].name.substring(4))] = ""
          hasArgs = true
        }
      }
      if (elem.children.length > 0) {
        for (let i = 0; i < elem.children.length; i++) {
          // console.log(elem.children[i])
          if (json[master][selection] == undefined) {
            json[master][selection] = []
          }
          updateJsonPrecise(json[master][selection], elem.children[i])
        }
      }
      else if (!hasArgs) {
        json[master][selection] = ""
      }
    }
  }
  else {
    let text = elem.innerText;
    for (let i = 0; i < content.children.length; i++) {
      // console.log("i", content.children[i])
      for (let j = 0; j < content.children[i].children.length; j++) {
        if (content.children[i].children[j].innerText == text) {
          return
        }
      }
    }
    
  }
}

function updateJsonPrecise(object, elem) {
  // console.log("eflhf")
  // console.log(elem)
  // console.log(elem.children)
  // console.log(object)
  if (elem.getAttribute("args") == "Name") {
    object["Name"] = {
      "FR":"",
      "EN":""
    }
  }
  else {
    object["Steps"] = structuredClone(data["Procedure"]["Categories"][0]["Steps"]);
  }
  // let attributes = elem.attributes
  // let hasArgs = false
  // for (let i = 0; i < attributes.length; i++) {
  //   if (attributes[i].name.includes("arg")) {
  //     if (!hasArgs) {
  //       if (elem.children.length == 0 || elem.getAttribute("args") == "Device") {
  //         object[elem.getAttribute("args")] = {}
  //       }
  //       else {
  //         object[elem.getAttribute("args")] = []
  //       }
  //     }
  //     object[elem.getAttribute("args")][attributes[i].name.substring(4)] = ""
  //     // console.log(object)
  //     hasArgs = true
  //   }
  // }
  // if (elem.children.length != 0) {
  //   for (let i = 0; i < elem.children.length; i++) {
  //     if (elem.children[i].children.length == 0 && !hasArgs) {
  //       object[elem.children[i].getAttribute("args")] = {}
  //     }
  //     else if (!hasArgs) {
  //       object[elem.children[i].getAttribute("args")] = []
  //     }
  //     updateJsonPrecise(object[elem.children[i].getAttribute("args")], elem.children[i])
  //   }
  // }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



let json = {
  "General" : {},
  "Unit" : {},
  "Machine" : {},
  "Procedure" : {}
}

let content = document.getElementById("elements")
let key
for (let key in data) {
  // console.log("master " + key)
  div = document.createElement("div");
  div.className = "elements-title"
  div.innerHTML = key
  content.append(div)
  populate(data[key], key);
}
startDragToAdd();


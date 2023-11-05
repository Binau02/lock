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
    console.log(key)
    console.log(args[key])
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
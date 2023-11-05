content = document.getElementById("content");

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

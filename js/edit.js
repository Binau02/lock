content = document.getElementById("content");

line = document.createElement("div");
line.className = "line"
title = document.createElement("div");
title.className = "editable Title"
title.innerHTML = "Section titre"
line.append(title)
content.append(line)
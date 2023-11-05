// var directory = "../saves/Philippe";
// var xmlHttp = new XMLHttpRequest();
// xmlHttp.open('GET', directory, false); // false for synchronous request
// xmlHttp.send(null);
// var ret = xmlHttp.responseText;
// var fileList = ret.split('\n');
// for (i = 0; i < fileList.length; i++) {
//     var fileinfo = fileList[i].split(' ');
//     console.log(fileinfo)
//     // if (fileinfo[0] == '201:') {
//     //     document.write(fileinfo[1] + "<br>");
//     //     document.write('<img src="' + directory + fileinfo[1] + '"/>');
//     // }
// }


// function loadFileNames(dir) {
//     return new Promise((resolve, reject) => {
//         try {
//             var fileNames = new Array();
//             $.ajax({
//                 url: dir,
//                 success: function (data) {
//                     console.log($(data));
//                     console.log((data));
//                     console.log(data.getElementByTagName("a"));
//                     for(var i = 1; i < $(data).find('[html_elem]').length; i++){
//                         var elem = $(data).find('[html_elem]')[i];
//                         fileNames.push(elem.innerHTML);
//                     }
//                     return resolve(fileNames);
//                 }
//             });
//         } catch (ex) {
//             return reject(new Error(ex));
//         }
//     });
// }

// loadFileNames('../saves/Philippe')  
//         .then((data) => {
//             console.log(data);
//         })
//         .catch((error) => {
//             alert('Files could not be loaded. please check console for details');
//             console.error(error);
//         });


let i = document.querySelector('input').addEventListener('change', (e)=>{
    f = []
    for(let i = 0; i < e.target.files.length; i++)
    {             
        f.push(e.target.files[i].webkitRelativePath);
    }
    console.log(f);
    printResults(f);
})




function printResults(f){
    div = document.getElementById("existing-templates");
    if(f.length > 0){
        document.getElementById("info").style.display = "none";
        for(let i = 0; i < f.length; i++){
            let btn = document.createElement("BUTTON");
            btn.setAttribute("type", "button");
            btn.setAttribute("class", "button");
            btn.innerHTML = f[i];
            name = "pop-up"+i
            btn.setAttribute("onclick", "show('"+name+"')");
            h1 = document.createElement("h1")
            h1.innerHTML = "Template "+i
            let btn2 = document.createElement("BUTTON");
            btn2.setAttribute("type", "button");
            btn2.setAttribute("onclick", "window.location.href='edit.html?"+f[i]+"';");
            btn2.innerHTML = "Editer le template";
            let btn3 = document.createElement("BUTTON");
            btn3.setAttribute("type", "button");
            btn3.setAttribute("onclick", "window.location.href='fill.html?"+f[i]+"';");
            btn3.innerHTML = "Remplir le formulaire associé au template";
    
            a = document.createElement("a");
            a.setAttribute("href", "#")
            a.setAttribute("class", "close");
            a.setAttribute("onclick", "hide('"+name+"')");
            a.innerHTML = "&times;";
    
            popup = document.createElement("DIV");
            popup.setAttribute("class", "pop-up");
            popup.setAttribute("id", "pop-up"+i);
    
            popup.appendChild(h1);
            popup.appendChild(btn2);
            popup.appendChild(btn3);
            popup.appendChild(a);
    
            div.appendChild(btn);
            div.appendChild(popup);        
        }
    }
}


$ = function(id) {
    return document.getElementById(id);
}

var show = function(id) {
    $(id).style.display ='block';
}
var hide = function(id) {
    $(id).style.display ='none';
}


// let request =
//   $.ajax({
//     type : 'GET',
//     url : 'http://localhost/lock/php/getFiles.php',
//   });

// request.done(function (output) {
//   //Code à jouer en cas d'éxécution sans erreur du script du PHP
//   console.log("test_ajax.js :");
//   console.log(output);
  
// });
// request.fail(function (error) {
// //Code à jouer en cas d'éxécution en erreur du script du PHP ou de ressource introuvable
// });
// request.always(function () {
//  //Code à jouer après done OU fail quoi qu'il arrive
// });
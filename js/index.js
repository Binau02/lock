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
    for(let i = 0; i < e.target.files.length; i++)
    {
        console.log(e.target.files[i].name);
    }
})

$ = function(id) {
    return document.getElementById(id);
}

var show = function(id) {
    $(id).style.display ='block';
}
var hide = function(id) {
    $(id).style.display ='none';
}
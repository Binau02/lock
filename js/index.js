
function loadFileNames(dir) {
    return new Promise((resolve, reject) => {
        try {
            var fileNames = new Array();
            $.ajax({
                url: dir,
                success: function (data) {
                    for(var i = 1; i < $(data).find('li span.name').length; i++){
                        var elem = $(data).find('li span.name')[i];
                        fileNames.push(elem.innerHTML);
                    }
                    return resolve(fileNames);
                }
            });
        } catch (ex) {
            return reject(new Error(ex));
        }
    });
}

loadFileNames('../saves/Philippe')
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            alert('Files could not be loaded. please check console for details');
            console.error(error);
        });

$ = function(id) {
    return document.getElementById(id);
}

var show = function(id) {
    $(id).style.display ='block';
}
var hide = function(id) {
    $(id).style.display ='none';
}
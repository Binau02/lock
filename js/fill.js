var urlcourante = document.location.href; 
// alert (' URL : \n' +urlcourante);  

// Supprimons l'éventuel dernier slash de l'URL
var urlcourante = urlcourante.replace(/\/$/, "");
// Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
queue_url = urlcourante.substring (urlcourante.lastIndexOf( "?" )+1 );
// alert (' Queue URL : \n' + queue_url);
var nomFichier = "../saves/Philippe/"+queue_url;
let json = 0;
$.getJSON("http://localhost/lock/saves/Philippe/" + queue_url,
    function (data, textStatus, jqXHR) {
        json = data;
        createFormFromJSON(json);
    }
);
let Html = 0;
let filename = queue_url.substring(0, queue_url.length-5);
console.log(filename)
$.get('http://localhost/lock/saves/Philippe/' + filename, function(data) {
    Html = data;
    // console.log(Html)
 });

$.ajax({
    type: "GET",
    url: nomFichier
})
.done(function (data){
    console.log(data);
    createFormFromJSON(data);
});
let dataCopy = 0;

function createFormFromJSON(data){
    const form = $("#mainForm");
    
    for (var key in data){
        if (key != "Procedure"){
            const div = $('<div>').attr({
                id: key
            });
            form.append(div);
            const divTitle = $('<h1>');
            div.append(divTitle);
            divTitle.append(key);
            for (var key1 in data[key]){
                var result = getJSONElementByPath(key + key1);
                if (result === ""){
                    const inputText = $('<input>').attr({
                        type: 'text',
                        id: key + key1,
                        placeholder: key1,
                        name: key + key1
                    });
                    inputText.keydown(function (e) { 
                        console.log(e); 
                    });
                    div.append(inputText);
                }
                if (result === 0){
                    const inputNum = $('<input>').attr({
                        type: 'number',
                        min: 0,
                        id: key + key1,
                        placeholder: key1,
                        name: key + key1
                    });
                    inputNum.keydown(function (e) { 
                        console.log(e);
                    });
                    div.append(inputNum);
                }
            }
        }
        else{
            const div = $('<div>').attr({
                id: key
            });
            form.append(div);
            const divTitle = $('<h1>');
            div.append(divTitle);
            divTitle.append(key);
            for (var key1 in data[key]){
                if (key1 == "ID" || key1 == "Type" || key1 == "DefaultLanguage"){
                    var result = data[key][key1];
                    if (result ===""){
                        const inputText = $('<input>').attr({
                            type: 'text',
                            id: key + key1,
                            placeholder: key1
                        });
                        inputText.keydown(function (e) { 
                            console.log(e);
                        });
                        div.append(inputText);
                    }
                    if (result === 0){
                        const inputNum = $('<input>').attr({
                            type: 'number',
                            min: 0,
                            id: key + key1,
                            placeholder: key1
                        });
                        inputNum.keydown(function (e) { 
                            console.log(e);
                        });
                        div.append(inputNum);
                    }
                }
                else{
                    if (key1 == "Mechanisms"){
                        const div = $('<div>').attr({
                            id: key1
                        });
                        $('#Procedure').append(div);
                        const divTitle = $('<h2>');
                        divTitle.append(key1);
                        div.append(divTitle);
                        for (var key2 in data[key][key1][0]){
                            var result = getJSONElementByPath(key + key1 + "0" + key2);
                            if (key2 == "Name"){
                                for (var key3 in data[key][key1][0][key2]){
                                    const inputText = $('<input>').attr({
                                        type: 'text',
                                        id: key + key2 + key3,
                                        placeholder: key2 + key3
                                    });
                                    inputText.keydown(function (e) { 
                                        console.log(e);
                                    });
                                    div.append(inputText);
                                }
                            }
                            else{
                                if (key2 == "Image"){
                                    const inputImage = $('<input>').attr({
                                        type: 'file',
                                        accept: 'image/png, image/jpeg',
                                        id: key + key1 + "0" + key2
                                    });
                                    inputImage.change(function (e) { 
                                        console.log(e);
                                    });
                                    div.append(inputImage);
                                }
                                else{
                                    const inputNum = $('<input>').attr({
                                        type: 'number',
                                        min: 0,
                                        id: key + key1 + "0" + key2,
                                        placeholder: key2
                                    });
                                    inputNum.keydown(function (e) { 
                                        console.log(e);
                                    });
                                    div.append(inputNum);
                                }
                            }
                        }
                    }
                    else{
                        const div = $('<div>').attr({
                            id: key1
                        });
                        $('#Procedure').append(div);
                        const divTitle = $('<h2>');
                        divTitle.append(key1);
                        div.append(divTitle);
                        for (var key2 in data[key][key1]){
                            const subDiv = $('<div>').attr({
                                id: key2
                            });
                            div.append(subDiv);
                            const subDivTitle = $('<h3>');
                            subDivTitle.append(key1 + key2);
                            subDiv.append(subDivTitle);
                            for (var key3 in data[key][key1][key2]){
                                for(var key4 in data[key][key1][key2][key3]){
                                    if (key4 ==='EN' || key4 ==='FR'){
                                        const inputText = $('<input>').attr({
                                            type: 'text',
                                            id: key + key1 + key2 + key3 + key4,
                                            placeholder: key3 + key4
                                        });
                                        inputText.keydown(function (e) { 
                                            console.log(e);
                                        });
                                        subDiv.append(inputText);
                                    }
                                }
                                if (key3 == "Steps"){
                                    for (var key4 in data[key][key1][key2][key3]){
                                        for (var key5 in data[key][key1][key2][key3][key4]){
                                            if (key5 == "Device"){
                                                const subSubDiv = $('<div>').attr({
                                                    id: key + key1 +  key2 + key3 + key4 + key5
                                                });
                                                const subSubTitle = $('<h4>');
                                                subSubTitle.append(key5);
                                                subSubDiv.append(subSubTitle);
                                                subDiv.append(subSubDiv);
                                            }
                                            for (var key6 in data[key][key1][key2][key3][key4][key5]){
                                                if (key6 == "Icon"){
                                                    const inputImage = $('<input>').attr({
                                                        type: 'file',
                                                        accept: 'image/png, image/jpeg',
                                                        id: key + key1 + key2 + key3 + key4 + key5 + key6
                                                    });
                                                    inputImage.change(function (e) { 
                                                        console.log(e);
                                                    });
                                                    $('#'+ key + key1 +  key2 + key3 + key4 + key5).append(inputImage);
                                                }
                                                else{
                                                    if (key6 == "FR" || key6 == "EN"){
                                                        const inputText = $('<input>').attr({
                                                            type: 'text',
                                                            id: key + key1 + key2 + key4 + key5 + key6,
                                                            placeholder: key5 + key6
                                                        });
                                                        inputText.keydown(function (e) { 
                                                            console.log(e);
                                                        });
                                                        $('#'+ key + key1 +  key2 + key3 + key4 + key5).append(inputText);
                                                    }
                                                    else{
                                                        var result = getJSONElementByPath(key + key1 + key2 + key3 + key4 + key5 + key6);
                                                        if (result === ""){
                                                            const inputText = $('<input>').attr({
                                                                id: key + key1 + key2 + key3 + key4 + key5 + key6,
                                                                type: 'text',
                                                                placeholder: key6
                                                            });
                                                            inputText.keydown(function (e) { 
                                                                console.log(e);
                                                            });
                                                            $('#'+ key + key1 +  key2 + key3 + key4 + key5).append(inputText);
                                                        }
                                                        for (var key7 in data[key][key1][key2][key3][key4][key5][key6]){
                                                            var result = getJSONElementByPath(key + key1 + key2 + key3 + key4 + key5 + key6 + key7);
                                                            if (result === ""){
                                                                const inputText = $('<input>').attr({
                                                                    id: key + key1 + key2 + key3 + key4 + key5 + key6 + key7,
                                                                    type: 'text',
                                                                    placeholder: key6 + key7
                                                                });
                                                                inputText.keydown(function (e) { 
                                                                    console.log(e);
                                                                });
                                                                $('#'+ key + key1 +  key2 + key3 + key4 + key5).append(inputText);
                                                            }
                                                            for (var key8 in data[key][key1][key2][key3][key4][key5][key6][key7]){
                                                                if (key8 == "Image"){
                                                                    const inputImage = $('<input>').attr({
                                                                        id: key + key1 + key2 + key3 + key4 + key5 + key6 + key7 + key8,
                                                                        type: 'file',
                                                                        accept: 'image/png, image/jpeg'
                                                                    });
                                                                    inputImage.change(function (e) { 
                                                                        console.log(e);
                                                                    });
                                                                    subDiv.append(inputImage);
                                                                }
                                                                else{
                                                                    if (key8 == "Quantity"){
                                                                        const inputNum = $('<input>').attr({
                                                                            type: 'number',
                                                                            min: 0,
                                                                            id: key + key1 + key2 + key3 + key4 + key5 + key6 + key7 + key8,
                                                                            placeholder: key8
                                                                        });
                                                                        inputNum.keydown(function (e) { 
                                                                            console.log(e);
                                                                        });
                                                                        subDiv.append(inputNum);                                                                    
                                                                    }
                                                                    else{
                                                                        if (key8 == "Name"){
                                                                            for (var key9 in data[key][key1][key2][key3][key4][key5][key6][key7][key8]){
                                                                                const inputText = $('<input>').attr({
                                                                                    type: 'text',
                                                                                    id: key + key1 + key2 + key3 + key4 + key5 + key6 + key7 + key8 + key9,
                                                                                    placeholder: key8 + key9
                                                                                });
                                                                                inputText.keydown(function (e) { 
                                                                                    console.log(e);
                                                                                });
                                                                                subDiv.append(inputText);
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    const div = $('<div>').attr({
        id: 'divBtn'
    })
    const btn = $('<button>').attr({
        id: 'btnForm'

    });
    btn.click(function (e) { 
        var data1 = document.getElementById('mainForm');
        var data2 = data1.getElementsByTagName('input');
        dataCopy = structuredClone(data);
        $.each(data2, function (indexInArray, valueOfElement) {
            let pathToInfo = getPathById(valueOfElement.id);
            console.log(valueOfElement.value);
            console.log(pathToInfo);
            registerData(dataCopy, pathToInfo, valueOfElement.value);    
        });
        createHtml();
    });
    btn.append('Sauver');
    div.append(btn);
    form.append(div);
}

// test = 0
function registerData(object, path, value) {
    if (path.length == 1) {
        object[path[0]] = value;
        return;
    }
    object = object[path[0]]
    path.shift();
    registerData(object, path, value);
}

function getPathById(id){
    startIndex = 0;
    endIndex = 0;
    tabWord = [];

    for (let i = 1; i < id.length; i++){
        if (/[A-M]|[O-Q]|[S-Z]|[0-9]/.test(id[i])){
            endIndex = i;
            tabWord.push(id.substring(startIndex, endIndex));
            startIndex = endIndex;
        }    
        else {
            if (id[i] == 'N' && id[i-1] != 'E'){
                endIndex = i;
                tabWord.push(id.substring(startIndex, endIndex));
                startIndex = endIndex;
            }
            if (id[i] == 'R' && id[i-1] != 'F'){
                endIndex = i;
                tabWord.push(id.substring(startIndex, endIndex));
                startIndex = endIndex;
            }
        }    
    }

    tabWord.push(id.substring(startIndex, id.length));
    // console.log(tabWord);

    return tabWord;
}

function getJSONElementByPath(path){
    let startIndex = 0;
    let endIndex = 0;
    let tabWord = [];
    for (let i = 1; i < path.length; i++) {
        if (/[A-M]|[O-Q]|[S-Z]|[0-9]/.test(path[i])){
            endIndex = i;
            tabWord.push(path.substring(startIndex, endIndex));
            startIndex = endIndex;
        }    
        else {
            if (path[i] == 'N' && path[i-1] != 'E'){
                endIndex = i;
                tabWord.push(path.substring(startIndex, endIndex));
                startIndex = endIndex;
            }
            if (path[i] == 'R' && path[i-1] != 'F'){
                endIndex = i;
                tabWord.push(path.substring(startIndex, endIndex));
                startIndex = endIndex;
            }
        }    
    }
    tabWord.push(path.substring(startIndex, path.length));
    // console.log(tabWord);
    var result = json[tabWord[0]];
    for (let i = 1; i < tabWord.length; i++){
        result = result[tabWord[i]];
    }
    return result;
}


function getData(){
    const form = $('#mainForm');

    form.each(function () {
        data[theFieldName] = theFieldValue;
    });

    console.log(data);
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div;
  }

function createHtml() {
    content = document.getElementById("mainForm");
    div = createElementFromHTML(Html)
    // console.log(div);
    content.id = "content"
    content.innerHTML = ""
    content.append(div);

}
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
                        placeholder: key1
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
                        div.append(inputText);
                    }
                    if (result === 0){
                        const inputNum = $('<input>').attr({
                            type: 'number',
                            min: 0,
                            id: key + key1,
                            placeholder: key1
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
                                    div.append(inputImage);
                                }
                                else{
                                    const inputNum = $('<input>').attr({
                                        type: 'number',
                                        min: 0,
                                        id: key + key1 + "0" + key2,
                                        placeholder: key2
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
                                        
                                        subDiv.append(inputText);
                                    }
                                }
                                if (key3 == "Steps"){
                                    for (var key4 in data[key][key1][key2][key3]){
                                        for (var key5 in data[key][key1][key2][key3][key4]){
                                            if (key5 == "Device"){
                                                const subSubDiv = $('<div>').attr({
                                                    id: key + key2 + key3 + key4 + key5
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
                                                    subDiv.append(inputImage);
                                                }
                                                else{
                                                    if (key6 == "FR" || key6 == "EN"){
                                                        const inputText = $('<input>').attr({
                                                            type: 'text',
                                                            id: key + key1 + key2 + key4 + key5 + key6,
                                                            placeholder: key5 + key6
                                                        });
                                                        subDiv.append(inputText);
                                                    }
                                                    else{
                                                        var result = getJSONElementByPath(key + key1 + key2 + key3 + key4 + key5 + key6);
                                                        if (result === ""){
                                                            const inputText = $('<input>').attr({
                                                                id: key + key1 + key2 + key3 + key4 + key5 + key6,
                                                                type: 'text',
                                                                placeholder: key6
                                                            });
                                                            subDiv.append(inputText);
                                                        }
                                                        for (var key7 in data[key][key1][key2][key3][key4][key5][key6]){
                                                            console.log(key7);
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
    }
    tabWord.push(path.substring(startIndex, path.length));
    // console.log(tabWord);
    var result = data[tabWord[0]];
    for (let i = 1; i < tabWord.length; i++){
        result = result[tabWord[i]];
    }
    return result;
}

createFormFromJSON(data);

// export function printTypes(data) {
//     data.forEach(element => {
//       const listItem = $('<li>');
//       const checkbox = $('<input>').attr({
//         type: 'checkbox',
//         id: element['nom'],
//         name: element['nom'],
//         value: element['id']
//       });
//       const label = $('<label>').attr('for', element['nom']).text(element['nom']);
    
//       listItem.append(checkbox, label);
//       $('#type_list').append(listItem);
//     });
//   }
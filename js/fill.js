function createFormFromJSON(data){
    const form = $("#mainForm");
    console.log(data);
    
    for (var key in data){
        if (key != "Procedure"){
            const div = $('<div>').attr({
                id: key
            });
            form.append(div);
            for (var key1 in data[key]){
                const subDiv = $('<div>').attr({
                    id: key + key1
                });
                div.append(subDiv);
                var result = getJSONElementByPath(key + key1);
                if (result === ""){
                    const inputText = $('<input>').attr({
                        type: 'text',
                        id: 'input' + key + key1
                    });
                    subDiv.append(inputText);
                }
                if (result === 0){
                    const inputNum = $('<input>').attr({
                        type: 'number',
                        min: 0,
                        id: 'input' + key + key1
                    });
                    subDiv.append(inputNum);
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
        if (/[A-Z]/.test(path[i])){
            endIndex = i;
            tabWord.push(path.substring(startIndex, endIndex));
            startIndex = endIndex;
        }        
    }
    tabWord.push(path.substring(startIndex, path.length));
    console.log(tabWord);
    var result = data[tabWord[0]];
    for (let i = 1; i < tabWord.length; i++){
        result = result[tabWord[i]];
    }
    return result;
}

createFormFromJSON(data);
getJSONElementByPath('GeneralTitle');

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
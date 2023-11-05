function createFormFromJSON(){
    $.ajax({
        type: "GET",
        url: "../js/data.js",
        success: function (data) {
            console.log(data);
        }
    });
}

createFormFromJSON();

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
$.ajax({
    type: "GET",
    url: "../js/data.js"
})
.done(function(data){
    createFormFromJSON(data);
})
.fail(function(){
    alert("ERROR : AJAXT REQUEST FAILED");
});

function createFormFromJSON(data){
    console.log(data);
    data.forEach(element => {
        console.log(element);
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
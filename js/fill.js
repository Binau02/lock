function createFormFromJSON(){
    jqjs
}

export function printTypes(data) {
    data.forEach(element => {
      const listItem = $('<li>');
      const checkbox = $('<input>').attr({
        type: 'checkbox',
        id: element['nom'],
        name: element['nom'],
        value: element['id']
      });
      const label = $('<label>').attr('for', element['nom']).text(element['nom']);
    
      listItem.append(checkbox, label);
      $('#type_list').append(listItem);
    });
  }
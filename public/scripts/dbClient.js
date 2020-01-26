var linebreak = document.createElement('br');
document.body.appendChild(linebreak);
document.body.appendChild(linebreak);


var formData = {};  //use to populate form when editing an existing item
document.body.appendChild(buildForm(formData)); //add the form to the body


document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM fully loaded and parsed");
    var data = {};
    data = JSON.parse(getTableData());
    if (data){
    document.body.appendChild(buildTable(data));
    }
});


//edit record
function editRecord (rowNumber) {
  var formData = {
                  'id':document.getElementById('dataTable').rows[rowNumber].cells[0].innerHTML,
                  'name':document.getElementById('dataTable').rows[rowNumber].cells[1].innerHTML,
                  'reps':document.getElementById('dataTable').rows[rowNumber].cells[2].innerHTML,
                  'weight':document.getElementById('dataTable').rows[rowNumber].cells[3].innerHTML,
                  'date':document.getElementById('dataTable').rows[rowNumber].cells[4].innerHTML,
                  'lbs':document.getElementById('dataTable').rows[rowNumber].cells[5].innerHTML,
             };

            //  console.log(formData);
            //  console.log(formData.id);
  //update and populate form
  var deleteForm = document.getElementById('postForm');
  deleteForm.parentNode.removeChild(deleteForm);
  buildFormEdit(formData);
}


//delete function
function deleteRecord (rowNumber) {
  //get id using rowNumber
  idToDelete = document.getElementById('dataTable').rows[rowNumber].cells[0].innerHTML;
  console.log(idToDelete);
  //make POST request
  var req = new XMLHttpRequest();
  var payload = {
                  'id':idToDelete
             }
             console.log(payload);
  req.open('POST', 'http://flip3.engr.oregonstate.edu:10040/delete', payload, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      console.log('response received');

      //update table
      var deleteTable = document.getElementById('dataTable');
      deleteTable.parentNode.removeChild(deleteTable);
      var data = {};
      data = JSON.parse(getTableData());
      document.body.appendChild(buildTable(data));
    } else {
      console.log("Error text: " + req.statusText);
    }});
  console.log(JSON.stringify(payload));
  req.send(JSON.stringify(payload));
  event.preventDefault();
}


function getTableData (event){
      var req = new XMLHttpRequest();
      req.open("GET", 'http://flip3.engr.oregonstate.edu:10040/data', false);
      req.send(null);
      //console.log("getTableData function ran");
      // var dataReceived = "";
      // dataReceived = JSON.stringify(req.responseText);
      // console.log("req.response is:      " + req.responseText);
      // console.log("dataReceived String is:     " + dataReceived);
      //return dataReceived;
      return req.response;
}


function submitPost() {
  //determine if lbs or kgs
  var lbs = 0;
  if (document.getElementById('r1').checked) {
    lbs = 1;
  }
  var req = new XMLHttpRequest();
  var payload = {
                  'name':document.getElementById('nameField').value,
                  'reps':document.getElementById('repsField').value,
                  'weight':document.getElementById('weightField').value,
                  'date':document.getElementById('dateField').value,
                  'lbs':lbs
             }
  //console.log(payload);
  req.open('POST', 'http://flip3.engr.oregonstate.edu:10040/', payload, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      console.log('response received');

      //update form
      var deleteForm = document.getElementById('postForm');
      deleteForm.parentNode.removeChild(deleteForm);
      document.body.appendChild(buildForm(formData));

      //update table
      var deleteTable = document.getElementById('dataTable');
      deleteTable.parentNode.removeChild(deleteTable);
      var data = {};
      data = JSON.parse(getTableData());
      document.body.appendChild(buildTable(data));
    } else {
      console.log("Error text: " + req.statusText);
    }});
  console.log(JSON.stringify(payload));
  req.send(JSON.stringify(payload));
  event.preventDefault();
}


function editPost() {
  //determine if lbs or kgs
  var lbs = 0;
  if (document.getElementById('r1').checked) {
    lbs = 1;
  }
  var req = new XMLHttpRequest();
  var payload = {
                  'id':document.getElementById('recordId').value,
                  'name':document.getElementById('nameField').value,
                  'reps':document.getElementById('repsField').value,
                  'weight':document.getElementById('weightField').value,
                  'date':document.getElementById('dateField').value,
                  'lbs':lbs
             }
  //console.log(payload);
  req.open('POST', 'http://flip3.engr.oregonstate.edu:10040/update', payload, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      console.log('response received');

      //update form
      var deleteForm = document.getElementById('postForm');
      deleteForm.parentNode.removeChild(deleteForm);
      document.body.appendChild(buildForm(formData));

      //update table
      var deleteTable = document.getElementById('dataTable');
      deleteTable.parentNode.removeChild(deleteTable);
      var data = {};
      data = JSON.parse(getTableData());
      document.body.appendChild(buildTable(data));
    } else {
      console.log("Error text: " + req.statusText);
    }});
  console.log(JSON.stringify(payload));
  req.send(JSON.stringify(payload));
  event.preventDefault();
}






function buildForm(formData){
  var x = document.getElementById("formDiv");
  var createform = document.createElement('form');
  createform.setAttribute("id","postForm");
  var createFieldset = document.createElement('fieldset');
  x.appendChild(createform);
  createform.appendChild(createFieldset);

  var heading = document.createElement('h2');
  heading.innerHTML = "Add Workout Entry ";
  createFieldset.appendChild(heading);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  // hidden field for id
  //var idLabel = document.createElement('label');
  //idLabel.innerHTML = "database id: ";
  //createFieldset.appendChild(idLabel);


  var inputelement = document.createElement('input');
  inputelement.setAttribute("id", "recordId");
  inputelement.setAttribute("type", "number");
  inputelement.setAttribute("name", "id");
  inputelement.setAttribute("size", "100");
  inputelement.setAttribute("maxlength", "100");
  inputelement.style.display = "none";
  createFieldset.appendChild(inputelement);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var nameLabel = document.createElement('label');
  nameLabel.innerHTML = "Workout Name : ";
  createFieldset.appendChild(nameLabel);

  var inputelement = document.createElement('input');
  inputelement.setAttribute("id", "nameField");
  inputelement.setAttribute("type", "text");
  inputelement.setAttribute("name", "name");
  inputelement.setAttribute("size", "30");
  inputelement.setAttribute("maxlength", "255");
  // inputelement.setAttribute("value", formData.name);
  nameLabel.appendChild(inputelement);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var repsLabel = document.createElement('label');
  repsLabel.innerHTML = "# of reps : ";
  createFieldset.appendChild(repsLabel);

  var inputelement = document.createElement('input');
  inputelement.setAttribute("id", "repsField");
  inputelement.setAttribute("type", "number");
  inputelement.setAttribute("name", "reps");
  inputelement.setAttribute("size", "10");
  inputelement.setAttribute("maxlength", "10");
  // inputelement.setAttribute("value", formData.reps);
  createFieldset.appendChild(inputelement);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var weightLabel = document.createElement('label');
  weightLabel.innerHTML = "Weight : ";
  createFieldset.appendChild(weightLabel);

  var inputelement = document.createElement('input');
  inputelement.setAttribute("id", "weightField");
  inputelement.setAttribute("type", "number");
  inputelement.setAttribute("name", "weight");
  inputelement.setAttribute("size", "10");
  inputelement.setAttribute("maxlength", "10");
  // inputelement.setAttribute("value", formData.weight);
  createFieldset.appendChild(inputelement);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var dateLabel = document.createElement('label');
  dateLabel.innerHTML = "Date: ";
  createFieldset.appendChild(dateLabel);

  var inputelement = document.createElement('input');
  inputelement.setAttribute("id", "dateField");
  inputelement.setAttribute("type", "date");
  inputelement.setAttribute("name", "date");
  inputelement.setAttribute("size", "12");
  inputelement.setAttribute("maxlength", "12");
  // inputelement.setAttribute("value", formData.date);
  createFieldset.appendChild(inputelement);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var lbs = document.createElement('p')
  lbs.innerHTML = "Select lbs or kgs: ";
  createFieldset.appendChild(lbs);

  var inputelement = document.createElement('input');
  inputelement.setAttribute("type", "radio");
  inputelement.setAttribute("id","r1");
  inputelement.setAttribute("name", "lbs");
  inputelement.setAttribute("value", 1);
  createFieldset.appendChild(inputelement);

  var lbsLabel = document.createElement('label');
  lbsLabel.setAttribute("for","r1");
  lbsLabel.innerHTML = "lbs";
  createFieldset.appendChild(lbsLabel);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var inputelement = document.createElement('input');
  inputelement.setAttribute("type", "radio");
  inputelement.setAttribute("id","r2");
  inputelement.setAttribute("name", "lbs");
  inputelement.setAttribute("value", 0);
  createFieldset.appendChild(inputelement);

  var kgsLabel = document.createElement('label');
  kgsLabel.setAttribute("for","r2");
  kgsLabel.innerHTML = "kgs";
  createFieldset.appendChild(kgsLabel);


  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var submitelement = document.createElement('input');
  submitelement.setAttribute("type", "submit");
  submitelement.setAttribute("id","formSubmit");
  submitelement.setAttribute("value", "Add workout");
  submitelement.setAttribute("onclick", "submitPost()");
  createFieldset.appendChild(submitelement);

  return x;
}


function buildFormEdit(formData){
  console.log(formData.id);
  var x = document.getElementById("formDiv");
  var createform = document.createElement('form');
  createform.setAttribute("id","postForm");
  var createFieldset = document.createElement('fieldset');
  x.appendChild(createform);
  createform.appendChild(createFieldset);

  var heading = document.createElement('h2');
  heading.innerHTML = "Update Workout Entry ";
  createFieldset.appendChild(heading);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  // hidden field for id
  // var idLabel = document.createElement('label');
  // idLabel.innerHTML = "database id: ";
  // createFieldset.appendChild(idLabel);

  var inputelement = document.createElement('input');
  inputelement.setAttribute("id", "recordId");
  inputelement.setAttribute("type", "number");
  inputelement.setAttribute("name", "id");
  inputelement.setAttribute("size", "100");
  inputelement.setAttribute("maxlength", "100");
  inputelement.setAttribute("value", formData.id);
  inputelement.style.display = "none";
  createFieldset.appendChild(inputelement);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var nameLabel = document.createElement('label');
  nameLabel.innerHTML = "Workout Name : ";
  createFieldset.appendChild(nameLabel);

  var inputelement = document.createElement('input');
  inputelement.setAttribute("id", "nameField");
  inputelement.setAttribute("type", "text");
  inputelement.setAttribute("name", "name");
  inputelement.setAttribute("size", "30");
  inputelement.setAttribute("maxlength", "255");
  inputelement.setAttribute("value", formData.name);
  nameLabel.appendChild(inputelement);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var repsLabel = document.createElement('label');
  repsLabel.innerHTML = "# of reps : ";
  createFieldset.appendChild(repsLabel);

  var inputelement = document.createElement('input');
  inputelement.setAttribute("id", "repsField");
  inputelement.setAttribute("type", "number");
  inputelement.setAttribute("name", "reps");
  inputelement.setAttribute("size", "10");
  inputelement.setAttribute("maxlength", "10");
  inputelement.setAttribute("value", formData.reps);
  createFieldset.appendChild(inputelement);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var weightLabel = document.createElement('label');
  weightLabel.innerHTML = "Weight : ";
  createFieldset.appendChild(weightLabel);

  var inputelement = document.createElement('input');
  inputelement.setAttribute("id", "weightField");
  inputelement.setAttribute("type", "number");
  inputelement.setAttribute("name", "weight");
  inputelement.setAttribute("size", "10");
  inputelement.setAttribute("maxlength", "10");
  inputelement.setAttribute("value", formData.weight);
  createFieldset.appendChild(inputelement);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var dateLabel = document.createElement('label');
  dateLabel.innerHTML = "Date: ";
  createFieldset.appendChild(dateLabel);

  var inputelement = document.createElement('input');
  inputelement.setAttribute("id", "dateField");
  inputelement.setAttribute("type", "date");
  inputelement.setAttribute("name", "date");
  inputelement.setAttribute("size", "12");
  inputelement.setAttribute("maxlength", "12");
  inputelement.setAttribute("value", formData.date);
  createFieldset.appendChild(inputelement);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var lbs = document.createElement('p')
  lbs.innerHTML = "Select lbs or kgs: ";
  createFieldset.appendChild(lbs);

  var inputelement = document.createElement('input');
  inputelement.setAttribute("type", "radio");
  inputelement.setAttribute("id","r1");
  inputelement.setAttribute("name", "lbs");
  inputelement.setAttribute("value", 1);
  createFieldset.appendChild(inputelement);

  var lbsLabel = document.createElement('label');
  lbsLabel.setAttribute("for","r1");
  lbsLabel.innerHTML = "lbs";
  createFieldset.appendChild(lbsLabel);

  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var inputelement = document.createElement('input');
  inputelement.setAttribute("type", "radio");
  inputelement.setAttribute("id","r2");
  inputelement.setAttribute("name", "lbs");
  inputelement.setAttribute("value", 0);
  createFieldset.appendChild(inputelement);

  var kgsLabel = document.createElement('label');
  kgsLabel.setAttribute("for","r2");
  kgsLabel.innerHTML = "kgs";
  createFieldset.appendChild(kgsLabel);


  var linebreak = document.createElement('br');
  createFieldset.appendChild(linebreak);

  var submitelement = document.createElement('input');
  submitelement.setAttribute("type", "submit");
  submitelement.setAttribute("id","formSubmit");
  submitelement.setAttribute("value", "Update");
  submitelement.setAttribute("onclick", "editPost()");
  createFieldset.appendChild(submitelement);

  return x;
}


function buildTable (data) {
  var x = document.getElementById("tableDiv");
	var table = document.createElement("table");
  table.setAttribute("id","dataTable");
  table.setAttribute("border", "1");
  for (i=0;i<7;i++){
    var col = document.createElement("col");
    col.setAttribute("class", "col" + i);
    table.appendChild(col);
  }

  x.appendChild(table);

  //create header row
	var fields = Object.keys(data[0]);
	var headRow = document.createElement("tr");

  var headCell = document.createElement("th");
  headCell.textContent = "id";
  headCell.setAttribute("scope", "col");
  headRow.appendChild(headCell);

  var headCell = document.createElement("th");
  headCell.textContent = "name";
  headCell.setAttribute("scope", "col");
  headRow.appendChild(headCell);

  var headCell = document.createElement("th");
  headCell.textContent = "reps";
  headCell.setAttribute("scope", "col");
  headRow.appendChild(headCell);

  var headCell = document.createElement("th");
  headCell.textContent = "weight";
  headCell.setAttribute("scope", "col");
  headRow.appendChild(headCell);

  var headCell = document.createElement("th");
  headCell.textContent = "date";
  headCell.setAttribute("scope", "col");
  headRow.appendChild(headCell);

  var headCell = document.createElement("th");
  headCell.textContent = "lbs";
  headCell.setAttribute("scope", "col");
  headRow.appendChild(headCell);

  var headCell = document.createElement("th");
  headCell.textContent = "edit";
  headCell.setAttribute("scope", "col");
  headRow.appendChild(headCell);

  var headCell = document.createElement("th");
  headCell.textContent = "delete";
  headCell.setAttribute("scope", "col");
  headRow.appendChild(headCell);


//original code for header row
	// fields.forEach(function(field) {
	// 	var headCell = document.createElement("th");
	// 	headCell.textContent = field;
	// 	headRow.appendChild(headCell);
	// })
	table.appendChild(headRow);


//create data rows
	data.forEach(function(object) {
    //var tempID = Object.id.value;
    //console.log (data);
    //console.log(object[0]);
		var row = document.createElement("tr");

		fields.forEach(function(field) {
      //console.log(fields);
      //console.log("object[field] is: " + object[field]);
      //console.log("object[id] is: " + object[id]);
			var cell = document.createElement("td");
			cell.textContent = object[field];

			if (typeof object[field] == "number")
				cell.style.textAlign = "right";
			row.appendChild(cell);

		});
	table.appendChild(row);
	});

  //add buttons
  //get row counts
  var rowCount = document.getElementById('dataTable').rows.length;
  //console.log(rowCount);

  //create bottons on each row
  for (i=1;i<rowCount;i++) {
    var currentRow = document.getElementById('dataTable').rows[i];
      var cell = document.createElement("td");
      var btn = document.createElement('input');
      btn.setAttribute("type", "button");
      btn.setAttribute("id", "editButton");
      btn.setAttribute("value", "Edit");
      btn.setAttribute("onclick", "editRecord(" + i + ")");
      cell.appendChild(btn);
      currentRow.appendChild(cell);

      var cell = document.createElement("td");
      var btn = document.createElement('input');
      btn.setAttribute("type", "button");
      btn.setAttribute("id", "deleteButton");
      btn.setAttribute("value", "Delete");
      btn.setAttribute("onclick", "deleteRecord(" + i + ")");
      cell.appendChild(btn);
      currentRow.appendChild(cell);

  }

  function hideColumn(colNo) {
      var rows = document.getElementById('dataTable').rows;
      for (var rowNo = 0; rowNo < rows.length; rowNo++) {
          var cols = rows[rowNo].cells;
          if (colNo >= 0 && colNo < cols.length) {
              cols[colNo].style.display = 'none';
              //cols[colNo].style.display = '';

          }
      }
  }
  hideColumn(0);





return x;
}

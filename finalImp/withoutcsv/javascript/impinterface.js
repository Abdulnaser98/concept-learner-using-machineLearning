	// contains the tabels' header attributs.
	var headerAttributs = [];
	// contains the number of attributs
	var numberOfAttributs = parseInt(document.getElementById('numberOfAttributsInputField').value);
    // the special hypothesis of the version space	
	var specialHypo = [];
	// the generl hypothesis of the version space 
	var generalHypo = [];
	var tempSpecialHypo = [];
	var tempGeneralHypo = [];

	
	
	
	/*
	 enables entering the header attributes of the 
	 training examples's table. 
	*/		
	function enterTableHeaderAttributs(event) {
		
		// Container <div> where dynamic content will be placed
		var container = document.getElementById("textFieldsForTableHeaderAttributs");
		
		var numberOfAttributs = parseInt(document.getElementById('numberOfAttributsInputField').value);
		
		// Clear previous contents of the container
		while (container.hasChildNodes()) {
			
			container.removeChild(container.lastChild);
			
		}
		
		for ( i = 0; i < numberOfAttributs;i++ ){
			
			// Append a node with a random text
			container.appendChild(document.createTextNode( "Attribute "+(i+1) ));
			
			// Create an <input> element, set its type and name attributes
			var input = document.createElement("input");
			input.className = "form-control";
			input.style.border = '1px solid blue';
			input.id = "atributeValue"+i;
			input.type = "text";
			input.style.borderRadius = "25px"; 
			input.style.border = "2px solid #609";
			input.style.padding = "20px";
			input.style.marginLeft = "10px";
		
			container.appendChild(input);
			
			container.appendChild(document.createElement("br"));
		}
		
		event.preventDefault();
		
		return false;
		
	} // End the function enter Attributs!
	
	
	
	
	
	
	//Creates the table of the training example.
	function createTable(event) {
		
		var tableHeaderCells = [];
		var numberOfAttributs = parseInt(document.getElementById('numberOfAttributsInputField').value); 
		var table = document.getElementById("table_id");
		var header = table.createTHead();
		var row = header.insertRow(0);
		
		for(var i =0; i < numberOfAttributs+1 ;i++){
			
			tableHeaderCells.push(row.insertCell(i));
			
		}
		
		for(var j =0; j < numberOfAttributs; j++){
			
			tableHeaderCells[j].innerHTML = headerAttributs[j] ; 
			
		}
		
		
		//arrayOfCells[headerAttributs.length].class = "text-right";
		tableHeaderCells[headerAttributs.length].innerHTML = "ACTIONS";
		
		event.preventDefault();
	}
	
	
	
	
	// Creates the text fields to add a training example. 
	function creatTextFieldsToAddRecord(event){
		
		// Container <div> where dynamic content will be placed
		var container = document.getElementById("addTrainingExampletextFields");
		
		var numberOfAttributs = parseInt(document.getElementById('numberOfAttributsInputField').value);
		
		
		for( l = 0; l < numberOfAttributs; l++ ){
			
		      headerAttributs[l] = document.getElementById("atributeValue"+l).value;
			  
		}
	
			
		
		
		
		// Clear previous contents of the container
		while (container.hasChildNodes()) {
			
			container.removeChild(container.lastChild);
			
		}
		
		for ( i = 0; i < numberOfAttributs;i++ ){
			
			// Append a node with a random text
			container.appendChild(document.createTextNode( headerAttributs[i] ));
			
			// Create an <input> element, set its type and name attributes
			var row = document.createElement("div");
			row.name = headerAttributs[i] + i;
			row.className = "row";
			
			
			var column = document.createElement("div");
			column.className = "form-group col-lg-5 col-md-3 col-sm-3 col-xs-4";
			
			
			var input = document.createElement("input");
			input.id = headerAttributs[i];
			input.type = "text";
			input.name = headerAttributs[i] + i;
			input.className = "form-control  info";
			input.placeholder = headerAttributs[i];
			input.style.borderRadius = "25px"; 
			input.style.border = "2px solid #609";
			input.style.padding = "20px";
			input.style.width = "200px";
			input.style.height = "15px";
			input.style.marginLeft = "10px";
			
			
			
			
			column.appendChild(input);
			
			row.appendChild(column);
			
			container.appendChild(row);
			
			
			container.appendChild(document.createElement("br"));
		}
		
		
		createTable(event);
		
		event.preventDefault();
		
	}


	
	//Adds an example to the table
	function addRecordToTable(event) {
		
		var columns = []
		var values = []
		var tbody = document.getElementById('table_id').getElementsByTagName('tbody')[0];
		var alter_message = document.getElementById("alert_message_id");
		var tablelength = document.getElementById('table_id').rows.length;
		
		//Adds the values of the new record to the values array and ckecks out if the user did not enter a value.		
		for( var j = 0; j < headerAttributs.length; j++){
			
			values[j] = document.getElementById( headerAttributs[j] ).value;
			if( values[j]=== "" ){
				
				alter_message.textContent = "You did not enter a value for the attribut "+" "+headerAttributs[j]; 
				displayAlertMessage(event);
				event.preventDefault();
				return;
			}
			
		}
		
		var newRow = tbody.insertRow();
		//Adds the cells of the new row to the columns array
		for(var i = 0; i < (headerAttributs.length)+1 ;i++){
			
			columns.push( newRow.insertCell(i) );
			
			
		}
		
		
		//Assigns the values of the text fields to the cells of the new row 
		for(var k = 0; k < headerAttributs.length; k++){
			
			columns[k].innerHTML = values[k];
		    
		}

		var str = "<button class=\" btn btn-primary badge-pill \" onclick=\"return DisplayColumnValuesInInputFields(this);\"id =Row"+tablelength+">Edit</button> <button class=\" btn btn-danger badge-pill \" onclick=\"productDelete(this)\">Delete</button>"
		

		columns[headerAttributs.length].innerHTML = str;		
		
		
		
		showTableData();
		event.preventDefault();
		
	}
	
	
	
	
    var  clickedEditButtonID;
	
	function DisplayColumnValuesInInputFields(ctl) {
		
        var row = $(ctl).parents("tr");
		
        var cols = row.children("td");
		
		//gets the id of the edit button
	    clickedEditButtonID =  $(ctl).attr("id");
		
	    for( var i = 0; i < (cols.length)-1; i++ ){
		
	       	var str = "#" + headerAttributs[i];
			
			//Displays the value of the column in the coreesonded field. 
	     	$(str).val( $( cols[i] ).text());	
			
	}
	
    
    // Change Update Button Text
    $("#addexampletoTableSubmitbutton").text("Update");
	
	return false;

}

    // adds or enables edditing a record
    function addOrEditRow(event) {
		
         if ($("#addexampletoTableSubmitbutton").text() =="Update") {
			 
                UpdateInTable(event);
			    console.log("Helllllllllllllllo");
        }
		
        else {
			
            addRecordToTable(event);
			
        }
    }

    // allow updating a record in the table
    function UpdateInTable(event) {
		
        // Find row in <table>
        var row = $("#table_id button[id='"
                + clickedEditButtonID + "']")
                .parents("tr");
	  
	  
	  
        var cols = row.children("td");
        for( q = 0; q< (cols.length)-1; q++){
	  
	        cols[q].innerHTML = document.getElementById(headerAttributs[q]).value;  
			
        }

        showTableData();
		
        // Change Update Button Text
        $("#addexampletoTableSubmitbutton").text("Add to table!");
  
    event.preventDefault();
}
	
	
	
	
	
	
	
	
	//Gets the data of the training esamples's table and then calls the createBoundaries function.
	function showTableData() {
		
		var myTab = document.getElementById('table_id');
		var trainingData = [];
		var labeles = [];


		// LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
		for (i = 1; i < myTab.rows.length; i++) {
			
			console.log(myTab.rows.length);
			console.log(myTab.rows.item(i).cells.length);
			

			var array = [];

			// GET THE CELLS COLLECTION OF THE CURRENT ROW.
			var objCells = myTab.rows.item(i).cells;

			// LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
			for (var j = 0; j < (objCells.length)-2; j++) {
				
				array.push(objCells.item(j).innerHTML);
				
			}
			
			labeles.push(objCells.item((objCells.length)-2).innerHTML);
			trainingData.push(array);
			
		}
		
		console.log(trainingData);
		console.log(labeles);
		
		createBoundaries(trainingData,labeles);

	}

	
	
	
	
	
	
	
	//Displays an alert message.
	function displayAlertMessage(event){
		
		// Get the modal
		var modal = document.getElementById("modalAlertMessageID");
		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];
		modal.style.display = "block";
		// When the user clicks on <span> (x), close the modal
		span.onclick = function(event) {
			console.log("Close the Model");
			modal.style.display = "none";
			event.preventDefault();
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
				event.preventDefault();
			}	
		}
		
		event.preventDefault();
		return;
		
	}
	
	
	
	
	
	function addTextFieldsToMmodel(event){
		
		// Container <div> where dynamic content will be placed
		var container = document.getElementById("addTrainingExampletextFieldstoModel");
		
		var numberOfAttributs = parseInt(document.getElementById('numberOfAttributsInputField').value);
			
		
		// Clear previous contents of the container
		while (container.hasChildNodes()) {
			
			container.removeChild(container.lastChild);
			
		}
		
		for ( i = 0; i < numberOfAttributs-1;i++ ){
			
			// Append a node with a random text
			container.appendChild(document.createTextNode( headerAttributs[i] ));
			
			// Create an <input> element, set its type and name attributes
			var row = document.createElement("div");
			row.className = "row";
			
			
			var column = document.createElement("div");
			column.className = "form-group col-lg-5 col-md-3 col-sm-3 col-xs-4";
			
			
			var input = document.createElement("input");
			input.id = headerAttributs[i]+"Model";
			input.type = "text";
			input.className = "form-control  info";
			input.placeholder = headerAttributs[i];
			input.style.borderRadius = "25px"; 
			input.style.border = "2px solid #609";
			input.style.padding = "20px";
			input.style.width = "200px";
			input.style.height = "15px";
			input.style.marginLeft = "10px";
			
			
			
			
			column.appendChild(input);
			
			row.appendChild(column);
			
			container.appendChild(row);
			
			
			container.appendChild(document.createElement("br"));
	    }
		
	}
	
	
	
	
	
	
	
	
	// delets a record
    function productDelete(ctlButton) {
		
        $(ctlButton).parents("tr").remove();
		showTableData();
		
    }
	
	
	
	
	
	//JQuery section 
	
	
	
	
	//Checks out the validaity of the data inputed in the number of attributs input field.
	$("#numberOfAttribusSubmitButton").click(function(event) {
		event.preventDefault();
		var numberOfAttributs = parseInt(document.getElementById('numberOfAttributsInputField').value);
		var step2 = document.getElementById("step2");
		
		if( numberOfAttributs == 0 || numberOfAttributs < 0 || Number.isNaN(numberOfAttributs) ){
			var alter_message = document.getElementById("alert_message_id");
		    alter_message.textContent = "The number of attributs is not greater than 0 or you didn't enter any number at all!";
			displayAlertMessage(event);
			return; 
		}
		
		
		$("#first-layout").addClass('d-none');
		enterTableHeaderAttributs(event);
		$("#second-layout").removeClass('d-none');
		
		setTimeout(function() {
			
             step2.style.backgroundColor  = "var(--pink)";
			 step2.style.content = "var(--white)";
			 
		}, 200);
		
		event.preventDefault();
		
	});
	
	

	
	$("#attributsAddButton").click(function(event) {
		
		event.preventDefault();
		
		
		var numberOfAttributs = parseInt(document.getElementById('numberOfAttributsInputField').value);

        for(var i = 0; i < numberOfAttributs; i++){
			
			var attrVal = document.getElementById("atributeValue"+i).value;
			
			if( attrVal === "" ){
				
				var alter_message = document.getElementById("alert_message_id");
		        alter_message.textContent = "The " + (i+1) + " text field "+"has no value, Please enter a value to procced further";
			    displayAlertMessage(event);
				
			    return; 
			}
			
		}
		
		creatTextFieldsToAddRecord(event);
  
			
		
		
		
        
	    $("#second-layout").addClass('d-none');
		$("#third-layout").removeClass('d-none');
		
		setTimeout(function() {
			
             step3.style.backgroundColor  = "var(--pink)";
			 step3.style.content = "var(--white)";
			 
		}, 200);
		
		event.preventDefault();
		
	});
	
	
	
	$("#addTrainingExampletextFields").click(function(event) {
		
		event.preventDefault();
        
		$("#addToTableHidden").removeClass("d-none");
		
		event.preventDefault();
		
	});
	
	$("#addexampletoTableSubmitbutton").click(function(event) {
		
		event.preventDefault();
        
		$("#button_createBoundaries").removeClass("d-none");
		
		event.preventDefault();
		
	});
	
	
	
	$("#testExampleIDD").click(function(event) {
		
		event.preventDefault();
		
		
		var elme = document.getElementById('testExampleID');
        if(typeof(elme) != 'undefined' && elme != null){
            			
			elme.parentNode.removeChild(elme);
           	$("#addTrainingExampletextFieldstoModel").removeClass("d-none");
			$("#testExampleButton").removeClass("d-none");
            console.log("Hellllllo Abo3hed");			
            
		}
			
		event.preventDefault();
		
	});
	
	
		
		
		
	
	
	
	$("#testExampleButton").click(function(event) {
		
		event.preventDefault();
		
		$("#addTrainingExampletextFieldstoModel").addClass("d-none");
		$("#testExampleButton").addClass("d-none");
		
		
		event.preventDefault();
		
	});
	
	
	
	

	
	
	
	

	
	$(document).ready(function() {
		
         $("#versionSpace").val('');
		 
	});
	
	$(document).ready(function() {
		
         $("#numberOfAttributsInputField").val('');
		 
	});
	
	$(document).ready(function() {
		
         $("#insert_attribute").val('');
		 
	});
	
	

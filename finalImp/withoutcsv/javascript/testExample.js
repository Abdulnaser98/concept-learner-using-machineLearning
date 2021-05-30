function getTestExample(event){
	
	var numberOfAttributs = parseInt(document.getElementById('numberOfAttributsInputField').value);
		
	testExample = [];
	
	for( i = 0; i < numberOfAttributs-1; i++){
		
		tempValu = document.getElementById(headerAttributs[i]+"Model").value;
		
		testExample.push(tempValu);
		
	}
	
	console.log("testExample!!!!");
	console.log(testExample);
	checkExample(testExample);
	event.preventDefault();
	
}


function checkExample( testExample ){
	
	var model = document.getElementById("modelBodyElement2");
	var paras = document.createElement("p");
	    paras.id = "testExampleID";
		paras.style.textAlign = "center"; 
		paras.style.border  = "5px solid"; 
	
	flag = true; 
	for( k = 0; k < generalHypo.length; k++){
	
	    if( isMore_general(generalHypo[k],testExample) == true ){
		
	        result = "The given Example can be covered by the version space";
		    var nodes = document.createTextNode( result );
		    paras.appendChild(nodes);
		    model.appendChild( paras );
			flag = false;
			break;
	    }
    }
	
    if(flag == true ){
		    
	    result = "The given Example cannot be covered by the version space";
		var nodes = document.createTextNode( result );
		paras.appendChild(nodes);
		model.appendChild( paras );
			
    }
	
}








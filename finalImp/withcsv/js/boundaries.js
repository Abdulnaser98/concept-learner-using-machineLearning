    // the special hypothesis of the version space	
	var specialHypo = [];
	// the generl hypothesis of the version space 
	var generalHypo = [];
	var S0 = [];
	var G0 = [];


    
    //Creats the boundaries of the version space.
	function createBoundaries(examples,labeles){
		
		S0 = [];
		G0 = [];
	    specialHypo = [];
		generalHypo = [];
		var count = 1;
		var domains = getDomain(examples);

		
		for(var i = 0; i < examples[0].length;i++){
			
			S0.push("0");
			G0.push("?");
			
		}
		
		specialHypo.push(S0);
		generalHypo.push(G0);
		document.getElementById('versionSpace').value = "";
		
		
		for(var j = 0; j < examples.length; j++){
			
			if(labeles[j]=="Yes" || labeles[j]=="yes" || labeles[j]=="Y"){
				
				
				//1)remove from generalHypo all hypothesis with h(e)=0 
				generalHypo = removeHypothesis( generalHypo, examples[j],false );
				
				tempSpecificHypo = [];
				
				//2)minimal generalize the hypotheses in special boundary with h(e)=0 and then remove from all hypothesis with h(e)=0
				for(var n = 0 ; n < specialHypo.length; n++ ){
					
					if( !isMore_general( specialHypo[n],examples[j] ) ){
						//Splus is a minimal generlaization of h(specialHypo[n]) regarding e (examples[j])
						Splus = min_generalizations( specialHypo[n],examples[j] );
						
						//remove h (specialHypo[n]) from specialHypo.						
						//specialHypo.splice(n,1);
						
						for( var p = 0; p < Splus.length; p++){
							
							for( var y = 0; y < generalHypo.length; y++){
								// Making sure , if there is a hypothesis g from generalHypo with Splus ≤ g
								if( isMore_general( generalHypo[y],Splus[p] ) ){
									
									tempSpecificHypo.push(Splus[p]);
									
									break;
									
								}
							}
						}
					}
					
					else{
						
						tempSpecificHypo.push( specialHypo[n] );
					}
				}
				
				specialHypo = tempSpecificHypo;
				//Entferne aus S jede Hypothese, die (echt) allgemeiner als eine andere Hypothese in S ist
				specialHypo = removehypothesisInsideAset( specialHypo, "special");
				
				displayhypothesis( specialHypo,generalHypo,count );
				
				count = count + 1;
				
			}
			
			
			else if ( labeles[j]=="No" || labeles[j]=="no" || labeles[j]=="N" ){
				
				//remove from specificHypo all hypothesis with h(e)=1
				specialHypo = removeHypothesis( specialHypo, examples[j], true );
				
				tempGernerlaHypo = [];
				

				//remove from generalHypo all hypothesis with h(e)=1
				for(var n = 0 ; n < generalHypo.length; n++ ){
					
					if( isMore_general( generalHypo[n],examples[j] ) ){
						
						Gplus = min_specifications(generalHypo[n],domains,examples[j]); 
						//generalHypo.splice(n,1);
						
						for(var p = 0 ; p < Gplus.length;p++){
							
							for(var y = 0; y < specialHypo.length;y++){
								
								if( isMore_general( Gplus[p],specialHypo[y] ) ){
									
									tempGernerlaHypo.push(Gplus[p]);
									
									break;
									
								}
							}
						}
					}
					
					else{
						
						tempGernerlaHypo.push(generalHypo[n]);
					}

				}
                
                 generalHypo = tempGernerlaHypo;				
				
				//Entferne aus G jede Hypothese, die (echt) spezieller als eine andere Hypothese in G ist
				generalHypo = removehypothesisInsideAset( generalHypo, "general");
				displayhypothesis( specialHypo,generalHypo,count );			
				count = count + 1; 					
			}//End the No condition			
		}//End the iteration of the examples 
		
	}//End the function create version space.
	
	
	
	
	/* Creates a  minimal general hypothesis h1 of the given hypothesis h , such that
	   the new hypothesis h1 is consistent with the given example x.
	*/
	function min_generalizations(h,x){
		
		var h_new = [];
		var temp_Arr = [];
		
		for(var i = 0; i < h.length; i++){
			
			if ( !( isMore_general( h[i],x[i] ) ) ){
				
				if( h[i]!="0" ){
					
					temp_Arr.push("?");
					
				}
				
				else{
					
					temp_Arr.push(x[i]);
					
				}
			}
			
			
			else{
				
				if(h[i]!="?"){
					
					temp_Arr.push(x[i]);
				}
				
				else{
					
					temp_Arr.push("?");
					
				}
			}
		}
		
		h_new.push( temp_Arr );
		
		return h_new; 
	}


     
	/*  Creates new hypotheses , such that they are more general 
	    than the specific hypotheses and more specific than the 
	 	general hypothesis and are not consistent with the given example x. 
	*/
	function min_specifications(h,domains,x){
		
		results = [];
		
		for (var i = 0; i < h.length;i++){
			
			if (h[i] == "?"){
				
				for (var j = 0; j < domains[i].size; j++){

					val = Array.from(domains[i])[j];
					
					if ( x[i] != val ){
						
						h_new = [];
						
						if(i==0){
							
							h_new.push(val);
							
							for(var l = 1 ; l < h.length; l++){
								
								h_new.push(h[l]);
								
							}
							
						}
						
						else if( i > 0 ){
							
							for(var k = 0 ; k < i; k++){
								
								h_new.push(h[k]);
								
							}
							
							h_new.push(val);
							
							for(var p = i+1 ; p < h.length; p++){
								
								h_new.push(h[p]);
								
							}
							
						}
						
						results.push(h_new);
					}
					
				}
			}
			
			
			else if ( h[i] != "0" ){
				
				h_new = [];
				
				if( i==0 ){
					
					h_new.push("0");
					
					for(var l = 1 ; l < h.length; l++){
						
						h_new.push(h[l]);
						
					}
				}
				
				else if( i > 0 ){
					
					for(var k = 0 ; k < i; k++){
						
						h_new.push(h[k]);
						
					}
					
					h_new.push("0");
					
					for(var p = i+1 ; p < h.length; p++){
						
						h_new.push(h[p]);
						
					}
					
				}
				
				results.push(h_new);
			}
			
		}
		
		return results;
		
	}// End the function min-generalization. 
	
	
	/**	console.log(min_specifications(['?', '?','?','?','?','?'], 
					[new Set(['sunny','rainy']),  new Set (['warm', 'cold']),new Set (['normal','high']),new Set (['strong']),new Set (['warm','cool']),new Set (['same','change'])], 
					['rainy','cold','high','strong','warm','change']))**/
	
	
	
	
	
	
	
	
	
	//Checks out, if the given hypothesis h1 is more general than h2
	function isMore_general( h1,h2 ){
		
		//The comaprison can be made only,when the two hypotheses have the same length.
		if( h1.length !== h2.length ) {
			
			console.log( "The length of the two hypothesis is not equal!" );
			
		    return false; 
			
	    }
		
		
		for ( var i = 0 ; i < h1.length ;i++ ){
			
			
			if ( ( h1[i]!= "0" && ( h1[i] == h2[i] || h2[i] == "0") ) || ( h1[i] == "?") ){
				
				continue;
				
			}
			
			else {
				
				console.log( "The " + ( i + 1 ) + " attribute in h1 (" + h1[i] + ") is not general than " + h2[i] + " in h2" );
				return false;
				
			} 
			
		}
		
		return true;
	}//End the function more-general.
	
	
	
	
	
	/* Removes a hypothesis from the given setofHypothesis and return the 
	   new Hypothesis without the removed hypothesis.
	*/
	function removeHypothesis(setOfHypothesis,example,value){
		
		//remove from generalHypo all hypothesis with h(e)=0
		for(var k = 0 ; k < setOfHypothesis.length; k++ ){
			
			var valueOfComparison = isMore_general( setOfHypothesis[k],example );
			if( valueOfComparison === value ){
				
				setOfHypothesis.splice(k,1);
				console.log("remove general or special hypothesis")
				
			}
		}
		
		return setOfHypothesis;
		
	}
	
	
	function removehypothesisInsideAset(hypothesisSet, boundrayTyp){
		
		if( boundrayTyp === "special" ){
		
		    for( var i = 0; i < hypothesisSet.length; i++ ){
			 
			    for( var k = 0 ; k < hypothesisSet.length; k++ ){
				
				    if ( isMore_general( hypothesisSet[i], hypothesisSet[k] ) && ( i !== k )  ){
					
					    hypothesisSet.splice(i, 1);
					
				      	break; 
					} 
			    }
			}
		}
		
		else if ( boundrayTyp === "general" ){
			
			    for( var i = 0; i < hypothesisSet.length; i++ ){
			 
			        for( var k = 0 ; k < hypothesisSet.length; k++ ){
				
				        if ( isMore_general( hypothesisSet[k], hypothesisSet[i] ) && ( i !== k )  ){
					
					        hypothesisSet.splice(i, 1);
					
				      	break; 
					} 
			    }
			}
		
		}
		
		
		
		
		
		return hypothesisSet;
	} 
	
	
	// Displays the version space boundaries inside the textarea.
	function displayhypothesis( specialHypo,generalHypo,count ){
		
		var info2 = document.getElementById('versionSpace');
		
		
		var content1 = "S"+count+":";
		for(var x = 0 ; x < specialHypo.length; x++){
			
		    content1 = content1 +" " + "<" + specialHypo[x] + ">" + ",";
			
		}
		
		content1 = content1.substring(0, content1.length-1); 
		
		info2.value = info2.value+ content1 + '\r\n';	
		
		
		var content2 = "G"+count+":";
		for(var z = 0 ; z < generalHypo.length;z++){
			
		    content2 = content2+" "+ "<" + generalHypo[z] + ">" + ";";
			
		}
		
		content2 = content2.substring(0, content2.length-1); 
		info2.value = info2.value + content2 + '\r\n';
        info2.value = info2.value+ '\r\n' + '\r\n';			
		
	}
	
	
	
	
	
	//gets the domains of the attribts of the training examples.  
	function getDomain(examples) {
		
		// list of sets to store domains
		var domains = [];
		
		for (var i = 0; i < examples[0].length; i++) {
			
			domains.push( new Set() );
			
		}
		
		//Iterats over each example to store  the domains.
		for (var j = 0; j < examples.length; j++) {
			//Iterates over the values of each example and store its values to the sets.
			for (var k = 0; k < examples[j].length; k++) {
				
				tempArr = examples[j];
				
				domains[k].add( tempArr[k] );
				
			}

		}
		
		return domains;
	} // End the getdomain Function.
	
	
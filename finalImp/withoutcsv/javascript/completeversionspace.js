    
	// Creates the complete version space.
	function getcompleteVersionSpace( event ){
		
		levels = [];
		levels.push(generalHypo);
		nextLvl = {};
		
		
		while(true){
			
			for ( var i = 0; i < levels[levels.length-1].length; i++){
				
				list = getNextLevel( levels[levels.length-1][i],specialHypo );
				
				for( var j = 0; j < list.length; j++ ){
					
					if (list[j] in nextLvl){
						
						nextLvl[list[j]].push(levels[levels.length-1][i]);
						
					}
					
					else{
						
						temp_list = [];
						temp_list.push(levels[levels.length-1][i]);
						nextLvl[list[j]] = temp_list;
					}
				}
			}					
			
			
			if (isEmpty(nextLvl)){
				break;
			}
			
			temp_dic = nextLvl;
			
			var values = Object.keys(nextLvl).map(function(key){
				return nextLvl[key];
			});
			
			levels.push(values);
			
			nextLvl = {};
			
		}
		
		drawVersionSpace(specialHypo,generalHypo,temp_dic);
		
		event.preventDefault();
		
		
	}
	
	
	
	function getNextLevel(h,s){
		
		list = [];
		
		for(var i = 0; i < s.length; i++ ){
			
			for(var j = 0; j < h.length; j++){
				
				if ( h[j] == '?' && s[i][j] != '?' ){
					
					list_temp = [];
					
					for(var k = 0; k < h.length; k++){
						
						if( k < j || k > j ){
							
							list_temp.push( h[k] );
							
						}
						
						else if ( k == j ){
							
							list_temp.push( s[i][k] );
							
						}
						
						
					}
					list.push(list_temp);
					
				}
			}
		}
		return list;
	}
	
	
	
	function isEmpty(obj) {
		
		for(var key in obj) {
			
			if(obj.hasOwnProperty(key)){
				
				return false;
			}		
		}
		
		return true;
	}
	
	
	//console.log(getNextLevel(["sunny","?","?","?","?","?"],[["sunny","warm","?","strong","?","?"]]));
	//console.log(getcompleteVersionSpace([["sunny","warm","?","strong","?","?"]],[["sunny","?","?","?","?","?"],["?","warm","?","?","?","?"]]));
	
	
	
	
	
	
	
	function drawVersionSpace( S,G,midelNodes ){
		
		var model = document.getElementById("modelBodyElement");
		var paras = document.createElement("p");
		specialhypothesis = "S:" + " < " + S + " >";
		paras.style.textAlign = "center"; 
		paras.style.border  = "5px solid"; 
		paras.id = "pars";
		var nodes = document.createTextNode( specialhypothesis );
		paras.appendChild(nodes);
		model.appendChild( paras );
		
		
		var contentmiddel = "";
		var paramiddel = document.createElement("p");
		Object.keys(midelNodes).forEach(function(key) {
			contentmiddel = contentmiddel +  "< "+key+" >"+",";
			
		});
		
		var nodesmiddel = document.createTextNode( contentmiddel );
		paramiddel.style.display =  "inline-block";
		paramiddel.style = "white-space:nowrap";
		paramiddel.appendChild( nodesmiddel );
		model.appendChild( paramiddel );
		
		
		
		var parag = document.createElement("p");
		var contentgeneral = "G:";
		for(var j = 0 ; j < G.length; j++ ){
			
			contentgeneral = contentgeneral +  "< "+G[j]+" >"+",";		   
		}
		
		var nodeg = document.createTextNode( contentgeneral );
		parag.appendChild(nodeg);
		model.appendChild( parag );
		parag.style.textAlign = "center"; 
		parag.style.border  = "5px solid";
		
	}
	
	
	
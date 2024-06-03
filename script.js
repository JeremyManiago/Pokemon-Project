let request = new XMLHttpRequest();
let url = "https://pokeapi.co/api/v2/pokemon?limit=100";

let pokemonCounter = 0;

request.open("GET", url, true);
request.onload = function() 
{
	let data = JSON.parse(this.response);
	let row = null; 

	if (request.status >= 200 && request.status < 400)
	{
		data.results.forEach(pokemon => 
		{
			if (pokemonCounter % 4 == 0) 
			{
        row = document.createElement('div');
       	row.className = "row";
        $("#pokelist").append(row);			
			}

			let card = document.createElement('div'); card.className = "col-3 pokemon";

      let pokemonRequest = new XMLHttpRequest();
      let pokemonUrl = pokemon.url;
            
      pokemonRequest.open('GET', pokemonUrl, true);
            
    	pokemonRequest.onload = function(){
      	let pokemonImage = JSON.parse(this.response);
            
    		let p = document.createElement('p')
        p.textContent = pokemon.name;
            
        let i = document.createElement('img');
        i.src = pokemonImage.sprites.front_default;
                
        card.onclick = function(){
        	i.src = pokemonImage.sprites.front_shiny;
        }
                              
      card.appendChild(p);
      card.appendChild(i);
      row.appendChild(card);
    	};
            
pokemonRequest.send();
            
pokemonCounter++;
    })
  }
};

request.send();

$(document).ready(function() {
	//available characters
	var char1 = {
		name: "Luke Skywalker",
		counterAtkPwr: 10, 
		attackPwr: 4,
		hp: 60,
	}
	var char2 = {
		name: "Darth Vader",
		counterAtkPwr: 30,
		attackPwr: 6,
		hp: 40,
	}
	var char3 = {
		name: "Obi-Wan Kenobi",
		counterAtkPwr: 20,
		attackPwr: 5,
		hp: 50,
	}
	var char4 = {
		name: "Emperor Palpatine",
		counterAtkPwr: 15,
		attackPwr: 8,
		hp: 30,
	}

	var playerHP = "no player HP";
	var playerAtkPwr = "no player atk";
	var defenderHP = "no defender HP";
	var playerSelect = "no hero selected";
	var defender = "no defender";
	var characters = [char1, char2, char3, char4]
	var enemies = []

	var that;

	console.log(playerHP);
	console.log(playerAtkPwr);
	console.log(defenderHP); 
	console.log(playerSelect);
	console.log(defender);
	console.log(characters);
	console.log(enemies);

	//player selects character, player variables defined, the rest are moved to available defenders
	function chooseCharacter() {

		//convert chosen character thumbnail into object and change id of player character assciated thumbnail
		var playerSelectId = that.id;
		console.log(playerSelectId);

		switch(playerSelectId) {
			case "luke": 
				$("#luke").attr("id", "player");
				playerSelect = char1;
				break;
			case "vader": 
				$("#vader").attr("id", "player");
				playerSelect = char2;
				break;
			case "obi-wan": 
				$("#obi-wan").attr("id", "player");
				playerSelect = char3;
				break;
			case "palpatine": 
				$("#palpatine").attr("id", "player");
				playerSelect = char4;
				break;
		}

		console.log(playerSelect);

		//create enemies array out of objects not chosen
		for(var i = 0; i < characters.length; i++) {
			if(characters[i] == playerSelect) {
				console.log(playerSelect.name + " is not an enemy.");
			} 
			else {
				enemies.push(characters[i]);
			}
		} 

		console.log(enemies);

		//update html based on selection
		$(".character_img").not(that).appendTo("#enemy_characters");
		$("#pageTitle1").html("You are " + playerSelect.name);
		$("#pageTitle2").html("Now Choose Your Foe");

		//set player statistics
		playerHP = playerSelect.hp;
		playerAtkPwr = playerSelect.attackPwr;
		defenderHP = "no defender selected";

		console.log("player HP: " + playerHP);
		console.log("player attack: " + playerAtkPwr);
		console.log("defender HP: " + defenderHP); 

	}

	//player chooses defender for the next battle
	function chooseDefender() {

		if(that.id == "player") {
			console.log("bad selection"); 
		}

		else {

			//convert chosen enemy thumbnail into object and change id of defender assciated thumbnail
			var playerSelectId = that.id;
			console.log(playerSelectId);

			switch(playerSelectId) {
				case "luke": 
					$("#luke").attr("id", "defender");
					defender = char1;
					break;
				case "vader": 
					$("#vader").attr("id", "defender");
					defender = char2;
					break;
				case "obi-wan": 
					$("#obi-wan").attr("id", "defender");
					defender = char3;
					break;
				case "palpatine": 
					$("#palpatine").attr("id", "defender");
					defender = char4;
					break;
			}

			//update html and variables based on defender selection, including creation of the attack button
			$("#reserve").append($("#luke"));
			$("#reserve").append($("#vader"));
			$("#reserve").append($("#obi-wan"));
			$("#reserve").append($("#palpatine"));
			$("#pageTitle2").html("You are facing " + defender.name);
			$("#pageTitle3").html("Remaining foes");
			$("#attackButton").html("<button class='btn btn-default' type='button'>Attack!</button>");

			defenderHP = defender.hp;
			console.log("defender HP: " + defenderHP);
		}

	}

	//player attacks defender
	function attackDefender() {

	}
	//resets game after victory or defeat
	function resetGame() {

	}

	//begins appropriate selection function 
	$(".character_img").on("click", function() {
		
		that = this;

		if(playerSelect === "no hero selected") {
			chooseCharacter();
		}

		else if(defender === "no defender") {
			chooseDefender();
		}

		else {
			console.log("fighting time");
		}
	});


});

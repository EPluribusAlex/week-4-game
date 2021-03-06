$(document).ready(function() {
	//available characters
	var char1 = {
		name: "Luke Skywalker",
		counterAtkPwr: 8, 
		attackPwr: 10,
		hp: 50,
	}
	var char2 = {
		name: "Darth Vader",
		counterAtkPwr: 16,
		attackPwr: 8,
		hp: 60,
	}
	var char3 = {
		name: "Obi-Wan Kenobi",
		counterAtkPwr: 12,
		attackPwr: 6,
		hp: 70,
	}
	var char4 = {
		name: "Emperor Palpatine",
		counterAtkPwr: 20,
		attackPwr: 4,
		hp: 80,
	}

	var playerHP = "no player HP";
	var playerAtkPwr = "no player atk";
	var defenderHP = "no defender HP";
	var playerSelect = "no hero selected";
	var defender = "no defender";
	var characters = [char1, char2, char3, char4];
	var enemies = [];

	var that;

	//audio prepared
	const attackAudio = document.createElement("audio");
   $(attackAudio).attr("src", "assets/audio/attack_sound.mp3");
   const characterAudio = document.createElement("audio");
   $(characterAudio).attr("src", "assets/audio/character_sound.mp3");

	console.log(playerHP);
	console.log(playerAtkPwr);
	console.log(defenderHP); 
	console.log(playerSelect);
	console.log(defender);
	console.log(characters);
	console.log(enemies);

	//player selects character, player variables defined, the rest are moved to available defenders
	function chooseCharacter() {

		characterAudio.play();

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

		$("#player_health").html("Hit Points: " + playerHP);
		$("#player_attack").html("Attack Power: " + playerAtkPwr);



	}

	//player chooses defender for the next battle
	function chooseDefender() {

		if(that.id == "player") {
			console.log("bad selection"); 
		}

		else {

			//convert chosen enemy thumbnail into object and change id of defender assciated thumbnail
			var defenderSelectId = that.id;
			console.log(defenderSelectId);

			switch(defenderSelectId) {
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

			defenderHP = defender.hp;
			console.log("defender HP: " + defenderHP);
			$("#enemy_health").html("Hit Points: " + defenderHP);
			$("#enemy_counter").html("Counter Attack: " + defender.counterAtkPwr);

			attackDefender();
		}

	}

	//creates attack button, which engages attacking parameters when button is used
	function attackDefender() {

		$("#attackButton").html("<button class='btn btn-danger btn-lg' id='attack_function' type='button'>Attack!</button>");
		$("#attack_function").click(function() {

			attackAudio.play();

			defenderHP = defenderHP - playerAtkPwr;
			console.log("Defender has " + defenderHP + " hit points");
			$("#enemy_health").html("Hit Points: " + defenderHP);
			playerAtkPwr = playerAtkPwr + playerSelect.attackPwr;
			console.log("New player attack power: " + playerAtkPwr);
			$("#player_attack").html("Attack Power: " + playerAtkPwr);

			if(defenderHP <= 0) {

				console.log(defender.name + " has been defeated!");

				$("#enemy_health").empty();
				$("#enemy_counter").empty();

				var e = enemies.indexOf(defender);
				enemies.splice(e, 1);
				console.log(enemies);

				if(enemies.length == 0) {

					$("#enemy_characters").empty();
					$("#pageTitle2").empty();
					$("#pageTitle3").empty();
					$("#attackButton").empty();
					$("#pageTitle1").html(playerSelect.name + " is victorious!");
					$("#player").animate({height: '300px', width: '300px'}, "slow");	

					resetGame();
				} 				

 				else {

					defender = "no defender";
					console.log(defender);

					$("#enemy_characters").empty();
					$("#enemy_characters").append($("#luke"));
					$("#enemy_characters").append($("#vader"));
					$("#enemy_characters").append($("#obi-wan"));
					$("#enemy_characters").append($("#palpatine"));
					$("#pageTitle2").html("Choose your next opponent");
					$("#pageTitle3").empty();
					$("#attackButton").empty();

				}
			}

			else {

				playerHP = playerHP - defender.counterAtkPwr;
				console.log("Player has " + playerHP + " hit points");
				$("#player_health").html("Hit Points: " + playerHP);

				if(playerHP <= 0) {

					console.log(playerSelect.name + " has lost!");
					$("#pageTitle2").html("Your hero has fallen!");

					resetGame();
				}
			}

		});
	}
	//resets game after victory or defeat
	function resetGame() {

		$("#attackButton").html("<button type='button' class='btn btn-danger' id='reset'>Play again?</button>");
		$("#reset").click(function() {

			playerHP = "no player HP";
			playerAtkPwr = "no player atk";
			defenderHP = "no defender HP";
			playerSelect = "no hero selected";
			defender = "no defender";
			characters = [char1, char2, char3, char4]
			enemies = [];

			console.log(playerHP);
			console.log(playerAtkPwr);
			console.log(defenderHP); 
			console.log(playerSelect);
			console.log(defender);
			console.log(characters);
			console.log(enemies);

			$("#luke").attr("id", "defender");
			$("#vader").attr("id", "defender");
			$("#obi-wan").attr("id", "defender");
			$("#palpatine").attr("id", "defender");

			$("#enemy_characters").empty();
			$("#pageTitle2").empty();
			$("#pageTitle3").empty();
			$("#attackButton").empty();
			$("#reserve").empty();
			$("#starting_characters").empty();
			$("#player_health").empty();
			$("#player_attack").empty();
			$("#enemy_health").empty();
			$("#enemy_counter").empty();

			//resets character selection
			$("#pageTitle1").html("Select Your Character");
			$("#starting_characters").append('<a href="#" class="thumbnail pull-left character_img" id="luke"><img src="assets/images/luke-skywalker.jpg" alt="luke"><div class="bottom-left"><p>Luke Skywalker</p><p>Attack:   10</p><p>Counter:  8</p><p>Health:   50</p></div></a>');				
			$("#starting_characters").append('<a href="#" class="thumbnail pull-left character_img" id="vader"><img src="assets/images/darth-vader.jpg" alt="vader"><div class="bottom-left"><p>Darth Vader</p><p>Attack:   8</p><p>Counter:  16</p><p>Health:   60</p></div></a>');				
			$("#starting_characters").append('<a href="#" class="thumbnail pull-left character_img" id="obi-wan"><img src="assets/images/obi-wan.jpg" alt="obi-wan"><div class="bottom-left"><p>Obi-Wan Kenobi</p><p>Attack:   6</p><p>Counter:  12</p><p>Health:   70</p></div></a>');				
			$("#starting_characters").append('<a href="#" class="thumbnail pull-left character_img" id="palpatine"><img src="assets/images/emperor-palpatine.jpeg" alt="palpatine"><div class="bottom-left"><p>Emperor Palpatine</p><p>Attack:   4</p><p>Counter:  20</p><p>Health:   80</p></div></a>');

			playGame();

		});
	}

	//begins appropriate selection function when a character is clicked
	function playGame () {
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
	}

	//begins the game!
	playGame();

});

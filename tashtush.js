//<script type="text/javascript" src="jquery.js"></script>

//1. Haruti kyanqnery (3 kyanq)
//2. timery prcni (bombin kpni)  game over lini (kyanqery qchana) u verjum knopka lini NEW GAME-i hamar 
//3. game overy alert chlini 
//4. Haruti parely amen hajoxak xorovac havaqeluc heto 
//5. bombery irar vra chlinen
//6. timeri alettic heto noric sksel xaxy 

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let hx=50;
let hy=100;

let lifecount=3;

let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "background-1024x524.png";

 let heroReady = false;
let heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "rsz_imageedit_1_5632672268.png";

let hero1Ready = false;
let hero1Image = new Image();
hero1Image.onload = function () {
	hero1Ready = true;
};
hero1Image.src = "hero1.png";

 let hero2Ready = false;
let hero2Image = new Image();
hero2Image.onload = function () {
	hero2Ready = true;
};
hero2Image.src = "rsz_hero.png";
 
  let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "rsz_monster.png";

let bombReady = false;
let bombImage = new Image();
bombImage.onload = function () {
	bombReady = true;
};
bombImage.src = "rsz_oxygen480-actions-edit-bombsvg.png";


 let lifeReady = false;
let lifeImage = new Image();
lifeImage.onload = function () {
	lifeReady = true;
};
lifeImage.src = "rsz_1rsz_hero.png";
/*
 let life1Ready = false;
let life1Image = new Image();
life1Image.onload = function () {
	life1Ready = true;
};
life1Image.src = "rsz_1rsz_hero.png";

 let life2Ready = false;
let life2Image = new Image();
life2Image.onload = function () {
	life2Ready = true;
};
life2Image.src = "rsz_1rsz_hero.png";

 let life3Ready = false;
let life3Image = new Image();
life3Image.onload = function () {
	life3Ready = true;
};
life3Image.src = "rsz_1rsz_hero.png";
*/
let deathReady = false;
let deathImage = new Image();
deathImage.onload = function () {
	deathReady = true;
};

deathImage.src = "rsz_rsz_1rsz_heroblack.png";
   
// Game objects
let hero = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0
	
};
let monster = {
	x: 0,
	y: 0
	
};
let bomb = {
	x1: 45,
	y1: 96,
	x2: 45,
	y2: 96,
	x3: 45,
	y3: 96
	
};
/*
let life = {
	x1: 10,
	y1: 10,
	x2: 50,
	y2: 10,
	x3: 90,
	y3: 10
	
};*/

let life1 = {
	x: 10,
	y: 10,
	src: lifeImage.src
};
let life2 = {
	x: 50,
	y: 10,
	src: lifeImage.src
};
let life3 = {
	x: 90,
	y: 10,
	src: lifeImage.src
}
let lifes = [life1,life2,life3];
function nkariLIfe(){
	lifes.forEach(function(lifePic){
		let img = new Image();
		img.src = lifePic.src;
		ctx.drawImage(img,lifePic.x,lifePic.y);
	});
}
let monstersCaught = 0;

// Handle keyboard controls
let keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
let reset = function (a,b) {
	hero.x = hx;
	hero.y = hy;
	
	// Throw the monster somewhere on the screen randomly
	monster.x =(Math.random() * (canvas.width - 71));
	monster.y = (Math.random() * (canvas.height - 100));
	
	bomb.x1 =(Math.random() * (canvas.width - 50));
	bomb.y1 = (Math.random() * (canvas.height - 50));
	
	//	bomb.x2 =(Math.random() * (canvas.width - 50));
	//bomb.y2 = (Math.random() * (canvas.height - 50));
	
	//	bomb.x3 =(Math.random() * (canvas.width - 50));
	//bomb.y3 = (Math.random() * (canvas.height - 50));
	
//UpdateTime();
	};
let over = false;
function gameOver(over){
	if(over){
		render();
		let gameOverImage = new Image();
		gameOverImage.src = "gameOver.png";
		ctx.drawImage(gameOverImage, 350, 100);
	}
}

// Update game objects
let update = function (modifier) {

	if (38 in keysDown && hero.y>=0) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown && (hero.y+100<=canvas.height)) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown&& hero.x>=0) { // Player holding left
		heroImage = hero1Image;
		ctx.drawImage(heroImage, hero.x, hero.y);
			hero.x -= hero.speed * modifier;

	}
	if (39 in keysDown&& (hero.x+71<=canvas.width)) { // Player holding right
		heroImage = hero2Image;
		ctx.drawImage(heroImage, hero.x, hero.y);
			hero.x += hero.speed * modifier;
	}


	
	if (hero.x <= (monster.x +50)&& monster.x <= (hero.x + 50)&& hero.y <= (monster.y + 75)&& monster.y <= (hero.y + 75)) {
		++monstersCaught;
		hx=hero.x;
		hy=hero.y;
		reset(hx,hy);
	}
	
	if (hero.x <= (bomb.x1 +50)&& bomb.x1 <= (hero.x + 50)&& hero.y <= (bomb.y1 + 50)&& bomb.y1 <= (hero.y + 50)) {
	
		
			if(lifecount===3){			
			//life1Image=deathImage;
			//ctx.drawImage(life1Image, life.x1, life.y1);
			lifes[lifecount-1].src = deathImage.src;
		hx=hero.x;
		hy=hero.y;
		reset(hx,hy);
		lifecount=2;
		}
		else if(lifecount===2){
			//life2Image=deathImage;
			//ctx.drawImage(life2Image, life.x2, life.y2);
			lifes[lifecount-1].src = deathImage.src;
		hx=hero.x;
		hy=hero.y;
		reset(hx,hy);
		lifecount=1;
		}
		else{
			lifes[lifecount-1].src = deathImage.src;
			ctx.drawImage(deathImage, lifes[lifecount-1].x, lifes[lifecount-1].y);
			
			render();
			ctx.drawImage(heroImage, hero.x, hero.y);
			over = true;
		}
		
		gameOver(over);
			//alert("Game over");
		//$("gameover").show();

	}
	
/*	if (hero.x <= (bomb.x2 + 50)&& bomb.x2 <= (hero.x + 50)&& hero.y <= (bomb.y2 + 50)&& bomb.y2 <= (hero.y + 50)) {
				while (lifecount!=0){
			
			lifeImage=deathImage;
			ctx.drawImage(lifeImage, life.x2, life.y2);
				hx=hero.x;
		hy=hero.y;
		reset(hx,hy);
		lifecount--;
		}
		
			//alert("Game over");
		//$("gameover").show();
	
	}
	
	if (hero.x <= (bomb.x3 + 50)&& bomb.x3 <= (hero.x + 50)&& hero.y <= (bomb.y3 +50)&& bomb.y3 <= (hero.y + 50)) {
		while (lifecount!=0){
			
			lifeImage=deathImage;
			ctx.drawImage(lifeImage, life.x3, life.y3);
				hx=hero.x;
		hy=hero.y;
		reset(hx,hy);
		lifecount--;
		}
		
			//alert("Game over");
	
		//$("gameover").show();
	
	}*/
};


let render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	
	if (bombReady) {
		ctx.drawImage(bombImage, bomb.x1, bomb.y1);
		//ctx.drawImage(bombImage, bomb.x2, bomb.y2);
		//ctx.drawImage(bombImage, bomb.x3, bomb.y3);
	}

	
	/*
	if (life1Ready) {
		ctx.drawImage(life1Image, life.x1, life.y1);
	}
	if (life2Ready) {
		ctx.drawImage(lifeImage, life.x2, life.y2);
	}
	if (life1Ready) {
		ctx.drawImage(lifeImage, life.x3, life.y3);
	}
	*/
	
	
	nkariLIfe();
	
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monsters caught: " + monstersCaught, 10, 60);
};

//The main game loop
let main = function () {
	if(!over){
			let now = Date.now();
	let delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
	
	
	}else{
		let gameOverImage = new Image();
		gameOverImage.src = "gameOver.png";
		ctx.drawImage(gameOverImage, 350, 100);
	}

};
// Cross-browser support for requestAnimationFrame
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


// Let's play this game!
let then = Date.now();
reset();

main();

let sTime = new Date().getTime();
let countDown =100;

function UpdateTime() {
    let cTime = new Date().getTime();
    let diff = cTime - sTime;
    let seconds = countDown - Math.floor(diff / 1000);
    if (seconds >= 0) {
        let minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        $("#minutes").text(minutes < 10 ? "0" + minutes : minutes);
        $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);
    } else {
       $("#countdown").hide();
		alert("Noooooooo");
		//reset();
		//main();
       //$("#aftercount").show();
        clearInterval(counter);
    }
}
UpdateTime();
let counter = setInterval(UpdateTime, 500);
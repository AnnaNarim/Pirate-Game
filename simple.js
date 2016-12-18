let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//////////////////////// Loading all images

let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "back1.jpg";

 let heroReady = false;
let heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "rsz_hero.png";

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

let deathReady = false;
let deathImage = new Image();
deathImage.onload = function () {
	deathReady = true;
};

deathImage.src = "rsz_rsz_1rsz_heroblack.png";

let img1 = new Image();
		img1.src = "expl.png";
		
let timeup = new Image();
		timeup.src = "time.png";

let gameOverImage = new Image();
		gameOverImage.src = "gameOver.png";

////////////////////////////////////////////////
let explo = false;

let hx=50;
let hy=100;

let lifecount=3;
let monstersCaught=0;
let caught=3;
let win=false;

let over=false;
let timeover=false;

let then= Date.now();
let sTime= new Date().getTime();
let countDown=30;
//let countd=10;
let counter= setInterval(UpdateTime, 500);
let levelchange = false;

// initialization
let init = function(){
	hx=50;
	hy=100;

	countDown=30;

	 lifecount=3;
	monstersCaught=0;

	caught=5;
	 win=false;

	 over=false;
	 timeover=false;

	 levelchange= false;

	//countDown=10;
	then= Date.now();
	 sTime= new Date().getTime();
	 counter= setInterval(UpdateTime, 500);
};

let NewGame = function(){
	let w = window;
	requestAnimationFrame = w.requestAnimationFrame ;
	
	init();
	//then = Date.now();

	UpdateTime(countDown);
	counter = setInterval(UpdateTime, 500);

	lifes.forEach(function(life){
		life.src = "rsz_1rsz_hero.png";
	});

	reset(hx,hy);
	main();

};
// Game objects hero, monster, bombs
let hero = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0,
	width:80,
	height:100
	
};
let monster = {
	x: 0,
	y: 0,
	width:71,
	height:100
	
};
let bomb = {
	x1: 45,
	y1: 96,
	x2: 45,
	y2: 96,
	x3: 45,
	y3: 96,
	width1:50,
	height1:50,
	width2:50,
	height2:50,
	width3:50,
	height3:50
	
};

// lives of hero
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

// Drawing lives

let lifes = [life1,life2,life3];
function drawLife(){
	lifes.forEach(function(lifePic){
		let img = new Image();
		img.src = lifePic.src;
		ctx.drawImage(img,lifePic.x,lifePic.y);
	});
}

let audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'explode.mp3');


// keyboard controls
let keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Are two objects overlap/touch

const hitTest = function(a, b) {	
	return a.x <= (b.x +b.width) && b.x <= (a.x +a.width) && a.y <= (b.y + b.height) && b.y <= (a.y + a.height); 
};

// Reset the game when hero caught monster; hero tauched bombs

let reset = function (a,b) {

	//init();
	hero.x = hx;
	hero.y = hy;
	

	do {
		monster.x =(Math.random() * (canvas.width - monster.width));
		monster.y = (Math.random() * (canvas.height - monster.height));	
	
	} while(hitTest(hero, monster)) ;
	
	do{
		bomb.x1 =(Math.random() * (canvas.width - bomb.width1));
		bomb.y1 = (Math.random() * (canvas.height - bomb.height1));
	} while(hitTest(monster, bomb) && hitTest(hero, bomb)) ;

	/*do{
		bomb.x2 =(Math.random() * (canvas.width - bomb.width2));
		bomb.y2 = (Math.random() * (canvas.height - bomb.height2));
	} while(hitTest(monster, bomb) && hitTest(hero, bomb))  ;
		
	do{
		bomb.x3 =(Math.random() * (canvas.width - bomb.width3));
		bomb.y3= (Math.random() * (canvas.height -bomb.height3));
	} while(hitTest(monster, bomb) && hitTest(hero, bomb));
	*/
	
	};

over = false;

function gameOver(over){
	if(over){
		render();
		let gameOverImage = new Image();
		gameOverImage.src = "gameOver.png";
		ctx.drawImage(gameOverImage, 350, 100);		
	}
}
/*
timeover = false;
function timeOver(timeover){
	if(timeover){
		render();
		let timeupImage = new Image();
		timeupImage.src = "time.png";
		ctx.drawImage(timeupImage, 350, 100);
	}
}
*/
// Update game objects
let update = function (modifier) {

	if (38 in keysDown && hero.y>=0) { //key up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown && (hero.y+100<=canvas.height)) { //key down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown&& hero.x>=0) { //key left
		heroImage = hero1Image;
		ctx.drawImage(heroImage, hero.x, hero.y);
			hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown&& (hero.x+71<=canvas.width)) { //key right
		heroImage = hero2Image;
		ctx.drawImage(heroImage, hero.x, hero.y);
			hero.x += hero.speed * modifier;
	}

	if(hitTest(hero,monster)){
		++monstersCaught;
		hx=hero.x;
		hy=hero.y;
		reset(hx,hy);
	}
	

	if (hero.x <= (bomb.x1 +45)&& bomb.x1 <= (hero.x + 75)&& hero.y <= (bomb.y1 + 45)&& bomb.y1 <= (hero.y + 75)) {

		let bx=bomb.x1;
		let by=bomb.y1;
	
			explo= {
				x1:bx,
				y1:by
			};	
		
		//ctx.drawImage(img1,bx+45,by+45,50,50);
		if(lifecount===3){	
		audioElement.currentTime = 0.5;
		audioElement.play();


			lifes[lifecount-1].src = deathImage.src;
			ctx.drawImage(deathImage, lifes[lifecount-1].x, lifes[lifecount-1].y);
			hx=hero.x;
			hy=hero.y;

			setTimeout(function(){
    			reset(hx,hy);
			},3);

			//reset(hx,hy);
			lifecount=2;
		}

		else if(lifecount===2){
			audioElement.currentTime = 0.5;
            audioElement.play();
			lifes[lifecount-1].src = deathImage.src;
			ctx.drawImage(deathImage, lifes[lifecount-1].x, lifes[lifecount-1].y);
			hx=hero.x;
			hy=hero.y;
			reset(hx,hy);
			lifecount=1;
		}

		else{
			audioElement.currentTime = 0.5;
            audioElement.play();
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
	

};


let render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0,1024,524);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	if (bombReady) {

		if(explo) {
			ctx.drawImage(img1, explo.x1, explo.y1,80,80);	
			setTimeout(function(){
				explo = false;
			}, 3000)
			
		}
		ctx.drawImage(bombImage, bomb.x1, bomb.y1,50,50);	
		
		//ctx.drawImage(bombImage, bomb.x2, bomb.y2);
		//ctx.drawImage(bombImage, bomb.x3, bomb.y3);
	}	
	
	drawLife();
	
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monsters caught: " + monstersCaught, 10, 60);
};

//The main game loop
let main = function () {

	if(!over && !timeover){
		let now = Date.now();
		let delta = now - then;

		update(delta / 1000);
		render();

		
		if(monstersCaught===caught && countDown!==0){
			if(monstersCaught===9){
				win=true;
			}
			else{
				 
			levelchange= true;
			monstersCaught = 0;
			caught +=2;
			countDown-=10;
			then= Date.now();
 			sTime= new Date().getTime();

			UpdateTime(countDown);
			}
		}

		then = now;
		
		requestAnimationFrame(main);

	} else if(timeover && !win){
		ctx.drawImage(timeup, 350, 100);
	}
	else{
		
		ctx.drawImage(gameOverImage, 350, 100);
		
	}

	if(levelchange){
		let levelUp = new Image();
			levelUp.src = "levelup.png";
			ctx.drawImage(levelUp,420,80,200,250);

			setTimeout(function(){

				levelchange= false;
			}, 1000);
	}

	if(win){
			let winImage = new Image();
			winImage.src = "win.png";
			ctx.drawImage(winImage,420,180);
	}
};

NewGame();


sTime = new Date().getTime();

function UpdateTime(countdown) {
	//init();

    let cTime = new Date().getTime();
    let diff = cTime - sTime;
    let seconds = countDown - Math.floor(diff / 1000);
    if (seconds >= 0) {
        let minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        $("#minutes").text(minutes < 10 ? "0" + minutes : minutes);
        $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);
    } else {
       //$("#countdown").hide();
		timeover=true;
        clearInterval(counter);
    }
}

 $('#new_game').on("click",function(){
	NewGame();

 });
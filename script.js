let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
context.font = "50px Arial";

const backgroundImg = new Image();
backgroundImg.src = "img/fon.jpg";

const barrel = new Image();
barrel.src = "img/barrel.png";

const startSpeed = 10;
const endSpeed = 3;
let y = 200;
let x = getRandomInt(200);
let rnd = getRandomInt(9);
let step = 0;
let point = 0;
let age = 0;
let maxAge = 10;
let result = false;
let saves;
let best;

!localStorage.saves ? saves = [] : saves = JSON.parse(localStorage.getItem('saves'));
!localStorage.saves ? best = 0 : best = Math.max(...JSON.parse(localStorage.getItem('saves')));

const updateLocal = () => {
	localStorage.setItem('saves', JSON.stringify(saves));
}


canvas.addEventListener("mousedown", function(event) {
	cursorx = event.offsetX;
	cursory = event.offsetY;
 	if(cursorx > x+230 && cursorx < x+280 && cursory > y && cursory < y+80) {
 		point += rnd + 1;
 	}
});

backgroundImg.onload = function () {
	game();
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function game() {
	update();
	if(age != maxAge) {
		render();
		requestAnimationFrame(game);
	}

	if(result) {
		result = false;
		y = 200;
		x = getRandomInt(200);
		rnd = getRandomInt(9);
		step = 0;
		point = 0;
		age = 0;
		setTimeout(game, 1000);
	}
}

function render() {
	context.drawImage(backgroundImg, 0, 0, 700, 700);
	context.drawImage(barrel, 230+x, y, 50, 70);
	context.fillText(rnd+1, 240+x, y+60);
	context.fillText("счет:" + String(point), 60, 80);
	context.fillText("осталось:" + String(maxAge-age-1), 60, 40);
	context.fillText("лучший:" + String(best), 450, 40);
}

function update() {
	y += startSpeed - step;
	if (y > 700) {
		y = 200;
		x = getRandomInt(200);
		rnd = getRandomInt(9);
		age++;
		if (point % 2 === 0 && age === maxAge && point != 0) {
			saves.push(point);
			updateLocal();
			best = Math.max(...JSON.parse(localStorage.getItem('saves')));
			result = confirm('Вы выйграли! Начать заново?');
		} else if (age === maxAge) {
			result = confirm('Вы проиграли! Начать заново?');
		}
		if (step < endSpeed) step++;
	}
}
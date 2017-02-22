//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function Sprite(img, x, y, width, height) {
	this.img = img;
	this.x = x*2;
	this.y = y*2;
	this.width = width*2;
	this.height = height*2;
};
//---------------------------------------------------------------
Sprite.prototype.draw = function(ctx, x, y, scale=1) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
		x, y, (this.width*scale), (this.height*scale));
};
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function createGameSprites(img){
  var gameGFX = {};
  gameGFX.background = {
    sprites: new Sprite(img, 0, 0, 360, 180),
  }
  gameGFX.foreground = {
		sprites: new Sprite(img, 0, 181, 638, 64),
  }
	gameGFX.startScreen = {
		sprites: new Sprite(img, 360, 0, 191, 145),
  }
	gameGFX.introScreen = {
		sprites: new Sprite(img, 551.5, 0, 164, 111),
  }
	gameGFX.endScreen = {
		sprites: new Sprite(img, 716, 0, 164, 105),
  }
	gameGFX.boyFigure = {
		sprites:[
			new Sprite(img, 143.5, 246.5, 28, 63),
			new Sprite(img, 95.5, 246.5, 29.5, 63.5),
			new Sprite(img, 44, 246.5, 32, 63),
			new Sprite(img, 188.5, 246.5, 28, 63),
			new Sprite(img, 229, 246.5, 34, 63),
			new Sprite(img, 385.5, 282.5, 37.5, 61.5),
			new Sprite(img, 438, 286, 42, 58),
			new Sprite(img, 598.5, 268.5, 43.5, 57.5),
			new Sprite(img, 651, 286, 42, 58),
			new Sprite(img, 337, 247.5, 30, 62),
		],
  }
	gameGFX.barrel = {
		sprites: new Sprite(img, 551.5, 111.5, 35, 37),
  }
	gameGFX.playBtn = {
		sprites: new Sprite(img, 716.5, 111.5, 20.5, 19),
  }
	gameGFX.closeBtn = {
		sprites: new Sprite(img, 738, 111.5, 21, 19),
  }
	gameGFX.replayBtn = {
		sprites: new Sprite(img, 760, 111.5, 21, 19),
  }
	gameGFX.numbers = {
		sprites:[
			new Sprite(img, 385.5, 145.5, 13, 15.5),
			new Sprite(img, 398.5, 145.5, 11, 15.5),
			new Sprite(img, 409.5, 145.5, 12.5, 15.5),
			new Sprite(img, 422, 145.5, 11, 15.5),
			new Sprite(img, 433.5, 145, 11, 15.5),
			new Sprite(img, 445, 145.5, 11.5, 15.5),
			new Sprite(img, 456.5, 145.5, 12, 16),
			new Sprite(img, 468.5, 145.5, 12, 15),
			new Sprite(img, 480.5, 145.5, 11.5, 15),
			new Sprite(img, 492.5, 145.5, 10.5, 15.5),
		],
  }
	gameGFX.scoreScreen = {
		sprites: new Sprite(img, 639, 111.5, 53.5, 26.5),
  }
  return gameGFX;
};

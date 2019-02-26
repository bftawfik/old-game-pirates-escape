console.log('game script');
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
var dependants, autoResize;
var images, audios;
var gamePreloader = {prepared:false}, gameReorient = {prepared:false}, gameCnvs, gameCntx;
var gameGFX, game = {};
var evt;
var counter = 0;
var score = 0;
var bestScore = 0;
var n = 'BFTawfikPiratesEscapeV1.4';
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function checkIfMobilePhone(){
  isMobilePhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return isMobilePhone;
}
function checkIfIOS(){
  isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  return isIOS;
}
//---------------------------------------------------------------
function getOrientation(){
	if(checkIfMobilePhone()){
		switch(Math.abs(window.orientation)){
			case(0):
			if(checkIfIOS()){
				return "landscape";
			}
			return "portrait";
			break;
			case(90):
			if(checkIfIOS()){
				return "portrait";
			}
			return "landscape";
			break;
		}
	}
	return game.orientation;
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function retrieveBestScore(gameName){
  if (typeof(Storage) !== "undefined") {
		//console.log(localStorage.getItem(gameName));
    var myGame = JSON.parse(localStorage.getItem(gameName)) || {date: +new Date(), bestScore: 0};
    return myGame.bestScore;
  }
  return 0;
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function autoResizeInit(){
	console.log('autoResizeInit');
	autoResize.init();
}
//---------------------------------------------------------------
function autoResizeResize(){
	console.log('autoResizeResize');
	autoResize.resize();
	game.scaleRatio = gameCnvs.width/720;
}
//---------------------------------------------------------------
function createAutoResize(){
	console.log('createAutoResize');
	autoResize = new AutoResize(game.orientation);
	autoResize.addElement(gamePreloader.tag);
	autoResize.addElement(gameReorient.tag);
	autoResize.addElement(gameCnvs);
	game.scaleRatio = autoResize.init();
	window.addEventListener('load', autoResizeInit, false);
	window.addEventListener('resize', autoResizeResize, false);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function playLoopSound(){
	console.log('playLoopSound');
	audios.gameAudios[audios.loopId].sound.loop = true;
	audios.gameAudios[audios.loopId].sound.play();
	audios.gameAudios[audios.loopId].sound.muted = Boolean(!audios.enabled);
}
//---------------------------------------------------------------
function playClickSound(){
	audios.gameAudios[audios.clickId].sound.play();
	audios.gameAudios[audios.clickId].sound.muted = Boolean(!audios.enabled);
}
//---------------------------------------------------------------
function playBreakSound(){
	audios.gameAudios[audios.breakId].sound.play();
	audios.gameAudios[audios.breakId].sound.muted = Boolean(!audios.enabled);
}
//---------------------------------------------------------------
function playJumpSound(){
	audios.gameAudios[audios.jumpId].sound.play();
	audios.gameAudios[audios.jumpId].sound.muted = Boolean(!audios.enabled);
}
//---------------------------------------------------------------
function playLandSound(){
	audios.gameAudios[audios.landId].sound.play();
	audios.gameAudios[audios.landId].sound.muted = Boolean(!audios.enabled);
}
//---------------------------------------------------------------
function changeSoundState(){
	audios.gameAudios[audios.loopId].sound.muted = Boolean(!audios.enabled);
	audios.gameAudios[audios.clickId].sound.muted = Boolean(!audios.enabled);
	audios.gameAudios[audios.breakId].sound.muted = Boolean(!audios.enabled);
	audios.gameAudios[audios.jumpId].sound.muted = Boolean(!audios.enabled);
	audios.gameAudios[audios.landId].sound.muted = Boolean(!audios.enabled);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function changeGameState(){
	//console.log('changeGameState');
	var soundRec = game.background.getSoundRectangle();
	// soundRec.x+= (window.innerWidth-gameCnvs.width)/2;
	if(game.mouse.x > soundRec.x && game.mouse.x < soundRec.x + soundRec.width && game.mouse.y > soundRec.y && game.mouse.y < soundRec.y + soundRec.height ){
		audios.enabled = (audios.enabled+1) % 2;
		game.background.soundBtn.state = audios.enabled;
		changeSoundState();
		return;
	}
	if(game.currentState == game.states.initial){
		console.log('0');
		var playRec = game.startScreen.getPlayRectangle();
		// playRec.x+= (window.innerWidth-gameCnvs.width)/2;
		if(game.mouse.x > playRec.x && game.mouse.x < playRec.x + playRec.width && game.mouse.y > playRec.y && game.mouse.y < playRec.y + playRec.height ){
			playClickSound();
			game.currentState = game.states.intro;
			game.startScreen.changeState(game.startScreen.states.off);
			game.introScreen.changeState(game.introScreen.states.on);
			game.boyFigure.changeState(game.boyFigure.states.standing);
			game.barrels.changeState(game.barrels.states.standing);
		}
	}else if(game.currentState == game.states.intro){
		var playRec = game.introScreen.getPlayRectangle();
		// playRec.x+= (window.innerWidth-gameCnvs.width)/2;
		if(game.mouse.x > playRec.x && game.mouse.x < playRec.x + playRec.width && game.mouse.y > playRec.y && game.mouse.y < playRec.y + playRec.height ){
			playClickSound();
			game.currentState = game.states.game_on;
			//console.log('1');
			game.introScreen.changeState(game.introScreen.states.off);
			game.background.changeState(game.background.states.on);
			game.foreground.changeState(game.foreground.states.on);
			game.scoreScreen.changeState(game.scoreScreen.states.on);
			game.boyFigure.changeState(game.boyFigure.states.walking);
			game.barrels.changeState(game.barrels.states.on);
		}
	}else if(game.currentState == game.states.game_on){
		//console.log('2');
		game.boyFigure.changeState(game.boyFigure.states.jumping);
	}else if(game.currentState == game.states.game_over){
		//console.log('3');
		var closeRec = game.endScreen.getCloseRectangle();
		// closeRec.x+= (window.innerWidth-gameCnvs.width)/2;
		var replayRec = game.endScreen.getReplayRectangle();
		// replayRec.x+= (window.innerWidth-gameCnvs.width)/2;
		if(game.mouse.x > closeRec.x && game.mouse.x < closeRec.x + closeRec.width && game.mouse.y > closeRec.y && game.mouse.y < closeRec.y + closeRec.height ){
			playClickSound();
			score = 0;
			createGameClasses();
			return;
		}
		if(game.mouse.x > replayRec.x && game.mouse.x < replayRec.x + replayRec.width && game.mouse.y > replayRec.y && game.mouse.y < replayRec.y + replayRec.height ){
			playClickSound();
			score = 0;
			game.currentState = game.states.intro;
			game.endScreen.changeState(game.startScreen.states.off);
			game.startScreen.changeState(game.startScreen.states.off);
			game.introScreen.changeState(game.introScreen.states.on);
			game.boyFigure.changeState(game.boyFigure.states.standing);
			game.barrels.changeState(game.barrels.states.standing);
			return;
		}
	}
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function storeBestScore(userS, gameName){
	if (typeof(Storage) !== "undefined") {
    var myGame = JSON.parse(localStorage.getItem(gameName)) || {date: +new Date(), bestScore: 0};
    if(myGame.date <= +new Date()){
      if(userS > myGame.bestScore){
        myGame.date = +new Date();
        myGame.bestScore = userS;
        console.log(localStorage.getItem(gameName));
				try{
					localStorage.setItem( gameName, JSON.stringify(myGame));
				}catch(error){
					return false;
				}
      }
    }
    return true;
  }
  return false;
}
//---------------------------------------------------------------
function increaseScore(){
	//console.log('increaseScore');
	//
	score++;
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function endGame(){
	console.log('endGame');
	if(score > bestScore){
		bestScore = score;
	}
	console.log(storeBestScore(bestScore, n));
	playBreakSound();
	game.background.changeState(game.background.states.off);
	game.foreground.changeState(game.foreground.states.off);
	game.scoreScreen.changeState(game.scoreScreen.states.off);
	game.boyFigure.changeState(game.boyFigure.states.killed);
	game.barrels.changeState(game.barrels.states.standing);
	game.endScreen.changeState(game.barrels.states.on);
	game.currentState = game.states.game_over;
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function clicked(e){
  //console.log('clicked');
	game.mouse = {};
	if(e.clientX != undefined && e.clientY != undefined){
		game.mouse.x = e.clientX - e.target.offsetLeft;
		game.mouse.y = e.clientY - e.target.offsetTop;
	}else if(e.touches[0].clientX != undefined && e.touches[0].clientY != undefined){
		game.mouse.x = e.touches[0].clientX - e.target.offsetLeft;
		game.mouse.y = e.touches[0].clientY  - e.target.offsetTop;
	}
	changeGameState();
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function update(){
	var correctRender = !checkIfMobilePhone() || game.rightOrientation;
	if(correctRender){
		game.currentFrame++;
	  game.background.update(game.scaleRatio);
	  game.foreground.update(game.scaleRatio);
		game.scoreScreen.update(game.scaleRatio);
	  game.boyFigure.update(game.scaleRatio);
		game.barrels.update(game.scaleRatio);
	  game.startScreen.update(game.scaleRatio);
	  game.introScreen.update(game.scaleRatio);
	  game.endScreen.update(game.scaleRatio);
	}else{
		game.orientImgMarginTop = (parseInt($('#orientDiv').css("height")) - parseInt($('#orientDiv img').css("height")))/2;
		$('#orientDiv img').css({"margin-top": game.orientImgMarginTop+"px"});
	}
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function render(){
	var correctRender = !checkIfMobilePhone() || game.rightOrientation;
	if(correctRender){
		$('#orientDiv').css({"display": "none"});
	  game.background.draw(gameCntx);
	  game.foreground.draw(gameCntx);
		game.scoreScreen.draw(gameCntx);
		game.boyFigure.draw(gameCntx);
		game.barrels.draw(gameCntx);
	  game.startScreen.draw(gameCntx);
	  game.introScreen.draw(gameCntx);
	  game.endScreen.draw(gameCntx);
	}else{
		$('#orientDiv').css({"display": "inline"});
	}
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function run() {
	if(window.innerHeight > window.innerWidth){
		dOrientation = "portrait";
	}else{
		dOrientation = "landscape";
	}
	if(dOrientation == game.orientation){
		game.rightOrientation = true;
	}else{
		game.rightOrientation = false;
	}
	autoResizeResize();
	playLoopSound();
	var loop = function() {
		update();
		render();
		window.requestAnimationFrame(loop);
	}
	window.requestAnimationFrame(loop);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function startGame(){
	gameGFX = createGameSprites(images.gameImgs[images.mainImageId].image);
	  run();
		if(checkIfMobilePhone()){
			evt = "touchstart";
		}else{
			evt = "mousedown";
		}
	  document.addEventListener(evt, clicked);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function createGameVars(){
	game.localBestScore = retrieveBestScore(n);
	if(game.localBestScore > bestScore){
		bestScore = game.localBestScore;
	}
	//
	game.currentFrame = 0;
	game.orientation = "landscape";
  game.states = {
    initial:"initial",
    intro:"intro",
    game_on:"game_on",
    game_over:"game_over",
    lets_jump:"lets_jump",
  };
  game.currentState = 'initial';
}
//---------------------------------------------------------------
function createGameClasses(){
  game.background = new Background(game.scaleRatio);
  game.foreground = new Foreground(game.scaleRatio);
	game.scoreScreen = new ScoreScreen(game.scaleRatio);
  game.boyFigure = new BoyFigure(game.scaleRatio);
	game.barrels = new Barrels(game,game.scaleRatio);
  game.startScreen = new StartScreen(game.scaleRatio);
  game.introScreen = new IntroScreen(game.scaleRatio);
  game.endScreen = new EndScreen(game.scaleRatio);
}
//---------------------------------------------------------------
function createGameCanvas(){
	gameCnvs = $('<canvas width="720" height="405" style="border:1px solid black">')[0];
  gameCntx = gameCnvs.getContext("2d");
	$('body').append(gameCnvs);
}
//---------------------------------------------------------------
function createGameReorient(){
	gameReorient.tag = $("<div>", {id: "orientDiv", "class": "fullscreenDiv"})[0];
	$(gameReorient.tag).css({"display" : "none"});
  $('body').append(gameReorient.tag);
}
//---------------------------------------------------------------
function createGamePreloader(){
	gamePreloader.tag = $("<div>", {id: "preloaderDiv", "class": "fullscreenDiv"})[0];
	$(gamePreloader.tag).css({"display" : "none"});
  $('body').append(gamePreloader.tag);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function initGame(){
	console.log('initGame');
	createGameCanvas();
	createGameReorient();
	createGamePreloader();
	createGameVars();
	createGameClasses();
	createAutoResize();
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function loadImagesAndAudios(){
	initGame();
	images = new ImageRepository();
	audios = new AudioRepository();
	var loop = function() {
		if((images.getLoadedCount() != images.gameImgs.length) || (audios.getLoadedCount() != audios.gameAudios.length)){
			if(images.checkPreloaderImages()){
				if(!gamePreloader.prepared){
					gamePreloader.prepared = true;
					$(gamePreloader.tag).css({"display" : "inline"});
					$(gamePreloader.tag).append(images.gameImgs[0].image);
					$(gamePreloader.tag).append('<div>');
					$(gamePreloader.tag).find('div').append(images.gameImgs[1].image);
					$(images.gameImgs[2].image).attr('id', 'maskedGamePreloader');
					$(gamePreloader.tag).find('div').append(images.gameImgs[2].image);
				}
				var bytesLoaded = 0;
				var bytesTotal = 0;
				for(var imgsCount = 0;imgsCount < images.gameImgs.length; imgsCount++){
					bytesLoaded += images.gameImgs[imgsCount].bytesLoaded;
					bytesTotal += images.gameImgs[imgsCount].bytesTotal;
				}
				for(var audiosCount = 0;audiosCount < audios.gameAudios.length; audiosCount++){
					bytesLoaded += audios.gameAudios[audiosCount].bytesLoaded;
					bytesTotal += audios.gameAudios[audiosCount].bytesTotal;
				}
				var percentage = bytesLoaded/ bytesTotal;
				$('#maskedGamePreloader').css({"clip-path": "polygon(0 0, "+100 * percentage+"% 0, "+100 * percentage+"% 100%, 0 100%)"});
			}

			//console.log(bytesLoaded +' of '+ bytesTotal);
			window.requestAnimationFrame(loop);
		}else{
			$(gameReorient.tag).append(images.gameImgs[3].image);
			$(gamePreloader.tag).css({"display" : "none"});
			$(gameCnvs).css({"display" : "inline"});
			startGame();
		}
	}
	window.requestAnimationFrame(loop);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
$(function(){
	dependants = new Dependants();
	dependants.init(
		"com/bftawfik/games/piratesEscape/imageRepository.js",
		"com/bftawfik/games/piratesEscape/audioRepository.js", "com/bftawfik/games/piratesEscape/sprite.js",
		"com/bftawfik/games/piratesEscape/autoResize.js",
		"com/bftawfik/games/piratesEscape/fullScreen.js", "com/bftawfik/games/piratesEscape/background.js", "com/bftawfik/games/piratesEscape/foreground.js", "com/bftawfik/games/piratesEscape/barrels.js", "com/bftawfik/games/piratesEscape/startScreen.js", "com/bftawfik/games/piratesEscape/introScreen.js", "com/bftawfik/games/piratesEscape/endScreen.js", "com/bftawfik/games/piratesEscape/boyFigure.js", "com/bftawfik/games/piratesEscape/scoreScreen.js"
	);
	dependants.loadAll('loadImagesAndAudios');
});
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------

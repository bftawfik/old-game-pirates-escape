function ScoreScreen(gsr){
  //--
  this.gameScaleRatio = gsr;
  this.x = 592;
  this.y = 15;
  this.alpha = 0;
  this.score_x = 620;
  this.score_y = 23;
  // this.currentFrame = 0;
  // this.frFix = 0;
  this.currentState = 'off';
  this.velocity = -4;
  // this.rotation = 0;
  // this.gravity = 0;
  this.stoping = [0];
  this.states = {
    off:'off',
    on:'on',
  };
  //---------------------------------------------------------------
  this.changeState = function(state){
    switch (state){
      case this.states.on:
        this.currentState =  this.states.on;
        this.alpha = 0;
      break;
      case this.states.off:
        this.currentState =  this.states.off;
        this.alpha = 100;
      break;
    }
  };
  //---------------------------------------------------------------
  this.update = function(gsr){
    this.gameScaleRatio = gsr;
    if(this.currentState == this.states.on){
      if(this.alpha >= 100){
        this.alpha = 100;
      }else{
        this.alpha -= this.velocity;
      }
    }else if(this.currentState == this.states.off){
      if(this.alpha <= 0){
        this.alpha = 0;
      }else{
        this.alpha += this.velocity;
      }
    }
  };
  //---------------------------------------------------------------
  this.draw = function(gameCntx){
    gameCntx.save();
    gameCntx.globalAlpha = (this.alpha/100);
    gameGFX.scoreScreen.sprites.draw(gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);
    this.drawScore();
    gameCntx.restore();
  };
  //---------------------------------------------------------------
  this.drawScore = function(){
    var stringScore;
    var char, char_x, char_y;
    var oldChars_width;
    stringScore = score+"";
    stringScore = stringScore.split('');
    oldChars_width = 0;
    for(var charCount = 0; charCount <stringScore.length;charCount++){
      char = parseInt(stringScore[charCount]);
      oldChars_width -= (gameGFX.numbers.sprites[char].width * 0.6);
      char_x = this.score_x - oldChars_width;
      char_y = this.score_y;
      gameGFX.numbers.sprites[char].draw(gameCntx, (char_x*this.gameScaleRatio), (char_y*this.gameScaleRatio), (0.6*this.gameScaleRatio));
    }
  }
  //---------------------------------------------------------------
}

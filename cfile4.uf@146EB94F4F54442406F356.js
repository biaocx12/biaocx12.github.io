/*
 Ping Pong Game with DOM Object
  by JI , 2012
*/
var KEY = {
 UP : 38,
 DOWN : 40,
 W : 87,
 S : 83
}
var pingpong = {
	scoreA : 0,
	scoreB : 0
};

pingpong.pressedKeys = [];
pingpong.ball = {
	speed : 5,
	x : 150,
	y : 100,
	directionX : 1,
	directionY : 1
};
 
$(function(){
	// 브라우저 화면 크기 획
	console.log("width : " + screen.availWidth + "height : " + screen.availHeight);
	
	// 핑퐁게임 역역을 .css의 #playground 아이디에서 획득할 수 있다.
	console.log("src width : " + $("#playground").css("width") + "src height : " + $("#playground").css("height"));
	
	// set interval to call gameloop every 30milisenconds
 	pingpong.timer = setInterval(gameloop, 30);
 	//pingpong.timer = setInterval(gameloop, 1000);
 
 	// mark down what key is down and up into an array called "pressedKeys"
 	$(document).keydown(function(e){
  		console.log("keydown :" + e.which);
  		pingpong.pressedKeys[e.which] = true;
 	});
 	$(document).keyup(function(e){
  		console.log("keyup :" + e.which);
  		pingpong.pressedKeys[e.which] = false;
 	});
 	
 	// listen to the key down event
 	/*$(document).keydown(function(e){
  		console.log(e.which);
   
  		switch(e.which){
   			case KEY.UP:  // arrow-up
    			var top = parseInt($("#paddleB").css("top"));
    			$("#paddleB").css("top", top-5);
    			break;
   
   			case KEY.DOWN:
    			var top = parseInt($("#paddleB").css("top"));
    			$("#paddleB").css("top", top+5);
    			break;
   
   			case KEY.W:  // arrow-up
    			var top = parseInt($("#paddleA").css("top"));
    			$("#paddleA").css("top", top-5);
    			break;
   
   			case KEY.S:
    			var top = parseInt($("#paddleA").css("top"));
    			$("#paddleA").css("top", top+5);
    			break;
  		}
 	});*/
});

function gameloop()
{
	//console.debug("Game loop");
	moveBall();
	movePaddles();
}

function moveBall()
{
	// reference useful variables
	var playgroundHeight = parseInt($("#playground").height());
	var playgroundWidth = parseInt($("#playground").width());
	var ball = pingpong.ball;

	// check playground boundary
	// check bottom edge
	if(ball.y + ball.speed*ball.directionY > playgroundHeight){
		ball.directionY = -1;
	}
	// check top edge
	if(ball.y + ball.speed*ball.directionY < 0){
		ball.directionY = 1;
	}
	// check right edge
	if(ball.x + ball.speed*ball.directionX > playgroundWidth){
		ball.directionX =  -1;
	}
	// check left edge
	if(ball.x + ball.speed*ball.directionX < 0){
		ball.directionX = 1;
	}
	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;
	
	// check moving paddle here, later.
	// check left paddle
	var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
	var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
	var paddleAYTop = parseInt($("#paddleA").css("top"));
	if(ball.x+ball.speed*ball.directionX < paddleAX)
	{
		if(ball.y+ball.speed*ball.directionY <= paddleAYBottom &&
			ball.y+ball.speed*ball.directionY >= paddleAYTop)
			{
				ball.directionX = 1;
			}
	}	
	
	var paddleBX = parseInt($("#paddleB").css("left"));
	var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
	var paddleBYTop = parseInt($("#paddleB").css("top"));
	if(ball.x+ball.speed*ball.directionX >= paddleBX)
	{
		if(ball.y+ball.speed*ball.directionY <= paddleBYBottom &&
			ball.y+ball.speed*ball.directionY >= paddleBYTop)
			{
				ball.directionX = -1;
			}
	}	
	
	// check right edge
	if(ball.x+ball.speed*ball.directionX > playgroundWidth)
	{
		// player B lost.
		pingpong.scoreA++;
		$("#scoreA").html(pingpong.scoreA);
		// reset the ball
		ball.x = 250;
		ball.y = 100;
		/*$("#ball").css({
			"left" : ball.x,
			"top" : ball.y
		});*/
		ball.directionX = -1;
	}
	
	// check left edge
	if(ball.x+ball.speed*ball.directionX < 0)
	{
		//player A lost
		pingpong.scoreB++;
		$("#scoreB").html(pingpong.scoreB);
		// reset the ball
		ball.x = 150;
		ball.y = 100;
		/*$("#ball").css({
			"left" : ball.x,
			"top" : ball.y
		});*/
		ball.directionX = 1;
	}
	
	
					
	// actually move the ball with speed and direction
	$("#ball").css({
		"left" : ball.x,
		"top" : ball.y
	});
}

function movePaddles()
{	
 	// use our custom timer to continuously check if a key is pressed.
 	if(pingpong.pressedKeys[KEY.UP]){
 		 var top = parseInt($("#paddleB").css("top"));
  		$("#paddleB").css("top", top-5);
 	}		
 	if(pingpong.pressedKeys[KEY.DOWN]){
 		 var top = parseInt($("#paddleB").css("top"));
 		 $("#paddleB").css("top", top+5);
 	}
 	if(pingpong.pressedKeys[KEY.W]){
 		 var top = parseInt($("#paddleA").css("top"));
 		 $("#paddleA").css("top", top-5);
 	}
 	if(pingpong.pressedKeys[KEY.S]){
 		 var top = parseInt($("#paddleA").css("top"));
  		$("#paddleA").css("top", top+5);
 	}
}
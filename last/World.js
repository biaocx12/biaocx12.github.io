
World = function() {
}

World.prototype.Render = function() {
	////////게임 공간 확인////////
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");

	Context.fillStyle = "#ffffff";
	Context.font = '10px Arial';
	Context.textBaseline = "top";

	for (var i = 0; i < 31; i++) {
		for (var j = 0; j < 10; j++) {
			Context.fillText(".", i * 40, j * 32);
		}
	}
}

World.prototype.location = function(object) {
	////////게임 공간 상에서 오브젝트의 위치 확인////////

	for (var i = 0; i < 31; i++) {
		for (var j = 0; j < 10; j++) {
			if ((object.y < (j * 32) + 32 && object.last_y > (i * 32)) || (object.last_y > (j * 32) && object.y < (j * 32) + 32)) {
				if ((object.x < (i * 40) + 40 && object.last_x > (i * 40)) || (object.last_x > (i * 40) && object.x < (i * 40) + 40)) {
					//console.log(object.x+","+object.y," 공간위치->"+i+","+j);
					object.i = i;
					object.j = j;
				}
			}
		}
	}
}

World.prototype.gravity_down = function(object) {

	//console.log("중력");
	if (object.jump == 0) {
		if (object.Coll == 0) {
			object.g_count++;
			//console.log(object.g_count);
			if (object.g_count % 4 == 0) {
				object.gravity++;
			}
			object.y += object.gravity;
			//console.log(object.gravity);
		} else {
			object.gravity = 0;
			object.g_count = 0;
		}
	}
}

World.prototype.gravity_up = function(object) {
	if (object.jump == 1) {
		console.log(object.gravity + ", " + object.jump);
		object.g_count++;

		if (object.g_count % 4 == 0) {
			object.gravity--;
		}
		object.y -= object.gravity;
	}
}
var game_world = new World();


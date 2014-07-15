Object = function(x, y, type, img_name, obj_type) {
	this.type = type;

	this.obj_type = obj_type;
	// 오브젝트의 타입. 0: 플레이어, 1: 블럭, 2: 사다리, 3:보석, 4 : 에너미

	this.Coll = 0;

	this.appear = 1;
	this.jump = 0;

	this.x = x;
	this.y = y;

	this.last_x = this.x + 40;
	this.last_y = this.y + 32;

	this.objdect_img = new Image();
	this.objdect_img.src = img_name;

	this.gravity = 0;
	this.g_count = 0;

	this.img = new SpriteAnimation(this.objdect_img, 40, 32, 4, 6);
	// 타입 1 : 움직이는 이미지
}

Object.prototype.Position_Update = function() {
	this.last_x = this.x + 40;
	this.last_y = this.y + 32;
}

Object.prototype.Render = function() {
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");

	Context.fillStyle = "#ffffff";
	Context.font = '10px Arial';
	Context.textBaseline = "top";

	//console.log("오브젝트 랜더 호출");
	this.img.Render(Context);
	this.img.SetPosition(this.x, this.y);

	if (this.type == 1)
		this.img.Update();
}

Object.prototype.Image_Change = function(img_name) {
	//console.log(img_name);
	this.objdect_img.src = img_name;
}

Object.prototype.ImageType_Change_Change = function(type) {
	this.type = type;
}

Object.prototype.Head = function(obj) {

	if (this.y - obj.y > 0)// 양수일 경우 : 플레이어 위측 위치
	{
		E_direc = 0;
	}
	if (this.y - obj.y < 0)// 음수일 경우 : 플레이어 아래측 위치
	{
		E_direc = 1;
	} else {
		if (this.x - obj.x > 0)// 양수일 경우 : 플레이어 좌측 위치
		{
			E_direc = 2;
		}
		if (this.x - obj.x < 0)// 음수일 경우 : 플레이어 우측 위치
		{
			E_direc = 3;
		}
	}
	if (E_direc == 0) {
	}
	else if (E_direc == 1) {
	}	
	else if (E_direc == 2) {
		this.objdect_img.src = "Resource/mummy_left.png";
		this.type = 1;
		this.x -= 2;
	} else if ( E_direc = 3) {
		this.objdect_img.src = "Resource/mummy_right.png";
		this.type = 1;
		this.x += 2;
	}
}

Object.prototype.Collision = function(object) {
	//console.log("("+this.x+","+this.y+"  "+object.x + "," + object.y+")");
	if ((object.y < this.last_y && object.last_y > this.y) || (object.last_y > this.y && object.y < this.last_y)) {
		if ((object.x + 13 < this.last_x && object.last_x - 13 > this.x) || (object.last_x - 13 > this.x && object.x + 13 < this.last_x)) {
			//console.log(this.obj_type);
			object.Coll = 1;
			// 충돌
			if (this.obj_type == 2) {// 사다리 오브젝트와 충돌
				//console.log("사다리충돌");
				if (object.last_y > this.y && object.last_y < this.last_y - 20)// 만약 오브젝트의 y끝이 충돌한 오브젝트의 y끝보다 높은곳에 위치해 있다면
				{
					object.gravity = 0;
					object.g_count = 0;
					if (object.jump == 1)
						object.jump = 0;
				} else {
					if (object.obj_type == 0) {
						Player.Image_Change("Resource/player_Floor.png");
						Player.ImageType_Change_Change(1);
					}
				}
				FloorColl = 1;
				object.gravity = 0;
				object.g_count = 1;
			} else {
				FloorColl = 0;
				//console.log("사다리비충돌" + FloorColl);
			}
			if (this.obj_type == 3) {
				//console.log("보석충돌");
				this.appear = 0;
			}
			if (this.obj_type == 4) {
				// 에너미와의 충돌
			}
			if (this.obj_type == 1) {// 블럭타입 오브젝트의 충돌

				if (object.last_y > this.y && object.last_y < this.last_y - 20)// 만약 오브젝트의 y끝이 충돌한 오브젝트의 y끝보다 높은곳에 위치해 있다면
				{
					//console.log("벽돌충돌");
					object.y = this.y - 31;
					object.gravity = 0;
					object.g_count = 0;
					if (object.jump == 1) {
						object.jump = 0;
						if (direc == 0 && object.obj_type == 0) {
							Player.Image_Change("Resource/player_left.png");
							Player.ImageType_Change_Change(1);
						} else if (direc == 1 && object.obj_type == 0) {
							Player.Image_Change("Resource/player_right.png");
							Player.ImageType_Change_Change(1);
						}
					}
				} else {
					if (object.jump == 1) {
						object.y += 2;
						object.gravity = 0;
						//object.g_count = 0;
						//object.jump = 0;
					}
					if (direc == 0 && object.y < this.last_y - 10)// 왼쪽으로부터
						object.x += 2;
					else if (direc == 1 && object.y < this.last_y - 10)// 오른쪽으로부터
						object.x -= 2;
				}
			} else {
				BlockColl = 0;
			}
		} else {
			object.Coll = 0;
			//console.log("x비충돌");
			// 비충돌
		}
	} else {
		object.Coll = 0;
		//console.log("y비충돌");
		// 비충돌
	}
}
Player = new Object(640, 64, 0, "Resource/player_left.png", 0);

Enemy = new Object(500, 0, 0, "Resource/mummy_left.png", 4);

var Block = new Array(200);

var Floor = new Array(20);

var Jam = new Array(20);

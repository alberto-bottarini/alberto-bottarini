var canvas = {
	w: 600,
	h: 600,
	ctx: undefined,
	timer: undefined,
	clean: function() {
		this.ctx.fillStyle = 'white';
		this.ctx.fillRect(config.itemSize, config.itemSize, this.w-config.itemSize*2, this.h-config.itemSize*2);
	},
	draw: function() {
		canvas.clean();
		var appleC = collapse.collideApple();
		snake.move(appleC);
		if(appleC) apple.init();
		snake.draw();
		apple.draw();
		if(collapse.collideBorderSnake()) {
			clearInterval(canvas.timer);
			alert("collapsed");
		}
	},
	init: function(canvasEl) {
		canvasEl.height = this.h;
		canvasEl.width = this.w;
		this.ctx = canvasEl.getContext("2d");
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, canvas.w, canvas.h);
		this.loadImage(function() {
			snake.init();
			apple.init();
			canvas.draw();
			canvas.timer = setInterval(canvas.draw, config.drawInterval);
			document.addEventListener('keyup', keyboard.onKeyUp, false);
		});
	},
	loadImage: function(callback) {
		var i = imageContainer;
		i.snakeHead = new Image();
		i.snakeHead.src = "snake.png";
		i.snakeHead.onload = function() {
			i.apple = new Image();
			i.apple.src = "apple.png";
			i.apple.onload = callback
		}
	}
}

var imageContainer = {
	snakeHead: undefined,
	apple: undefined
}

var direction = {
	NORTH: "N",
	EAST: "E",
	SOUTH: "S",
	WEST: "W"
}

var config = {
	itemSize: 24,
	drawInterval: 70
}	

var snake = {
	length: 12,
	size: config.itemSize,
	parts: [],
	nextDirection: undefined,
	init: function() {
		var half = this.size/2,
			centerX = canvas.w/2-half,
			centerY = canvas.h/2-half;
		for(var i = 0; i<this.length; i++) {
			this.parts.push({
				x:centerX, 
				y:centerY+this.size*i
			});
		}
	},
	draw: function() {
		canvas.ctx.drawImage(imageContainer.snakeHead, this.parts[0].x, this.parts[0].y);
		for(var i = 1; i < this.parts.length; i++) {
			canvas.ctx.fillStyle = '#036800';
			canvas.ctx.fillRect(this.parts[i].x, this.parts[i].y, this.size, this.size);
		}
	},
	getDirection: function() {
		var first = this.parts[0],
			second = this.parts[1];
		if(first.x == second.x) return first.y > second.y ? direction.SOUTH : direction.NORTH;
		else return first.x > second.x ? direction.EAST : direction.WEST;
	},
	prependParts: function(p, grow) {
		this.parts.unshift(p);
		if(!grow) this.parts.pop();
	},
	move: function(grow) {
		var d = this.nextDirection || this.getDirection(),
			first = this.parts[0],
			p;
		if(d == direction.NORTH) {
			p = { x: first.x, y: first.y - this.size }
		} else if(d == direction.SOUTH) {
			p = { x: first.x, y: first.y + this.size }
		} else if(d == direction.EAST) {
			p = { x: first.x + this.size, y: first.y }
		} else {
			p = { x: first.x - this.size, y: first.y }
		} 
		this.prependParts(p, grow);
		delete this.nextDirection;
	}
}

var apple = {
	x: undefined,
	y: undefined,
	size: config.itemSize,
	init: function() {
		var boundaries = { 
			x: [ this.size, canvas.w - this.size*2 ],
			y: [ this.size, canvas.h - this.size*2 ]
		}
		this.x = util.getRandomInt(boundaries.x[0], boundaries.x[1]);
		this.y = util.getRandomInt(boundaries.y[0], boundaries.y[1]);
		this.draw();
	},
	draw: function() {
		canvas.ctx.drawImage(imageContainer.apple, this.x, this.y);
	}
}

var collapse = {
	collideBorderSnake: function() {
		var head = snake.parts[0],
			size = config.itemSize;
		if(head.x < size || head.x+size > canvas.w-size || head.y < size || head.y+size > canvas.h-size) return true;
		for(var p in snake.parts) {
			for(var p2 in snake.parts) {
				if(p != p2) {
					if(this.collideBox(snake.parts[p].x, snake.parts[p].y, snake.parts[p2].x, snake.parts[p2].y)) return true;
				}
			}
		}
		return false;
	},
	collideApple: function() {
		var head = snake.parts[0];
		return this.collideBox(head.x, head.y, apple.x, apple.y);
	},
	collideBox: function (x1, y1, x2, y2) {
		var bottom1 = y1 + config.itemSize,
			bottom2 = y2 + config.itemSize,
			top1 = y1,
			top2 = y2,
			left1 = x1,
			left2 = x2,
			right1 = x1 + config.itemSize,
			right2 = x2 + config.itemSize;
		return !(left1 >= right2 || left2 >= right1 || top1 >= bottom2 || top2 >= bottom1);
	}
}

var keyboard = {
	onKeyUp: function(e) {
		if(snake.getDirection() == direction.NORTH || snake.getDirection() == direction.SOUTH) {
			if (e.keyCode == 39) snake.nextDirection = direction.EAST;
  			else if (e.keyCode == 37) snake.nextDirection = direction.WEST;
  		}
  		if(snake.getDirection() == direction.EAST || snake.getDirection() == direction.WEST) {
	  		if (e.keyCode == 38) snake.nextDirection = direction.NORTH;
	  		else if (e.keyCode == 40) snake.nextDirection = direction.SOUTH;
	  	}
	}
}

var util = {
	getRandomInt: function(from, to) {
		var interval = to-from+1;
		return Math.floor(Math.random()*(interval+1))+from;
	}
}

addEventListener('load', function() {
	canvas.init(document.getElementsByTagName("canvas")[0]);
}, false);

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
		snake.move();
		snake.draw();
		apple.draw();
	},
	init: function(canvasEl) {
		canvasEl.height = this.h;
		canvasEl.width = this.w;
		this.ctx = canvasEl.getContext("2d");
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, canvas.w, canvas.h);
		snake.init();
		apple.init();
		canvas.draw();
		this.timer = setInterval(canvas.draw, config.drawInterval);
		document.addEventListener('keyup', keyboard.onKeyUp, false);
	}
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
		for(var i = 0; i < this.parts.length; i++) {
			canvas.ctx.fillStyle = 'green';
			canvas.ctx.fillRect(this.parts[i].x, this.parts[i].y, this.size, this.size);
		}
	},
	getDirection: function() {
		var first = this.parts[0],
			second = this.parts[1];
		if(first.x == second.x) return first.y > second.y ? direction.SOUTH : direction.NORTH;
		else return first.x > second.x ? direction.EAST : direction.WEST;
	},
	prependParts: function(p) {
		this.parts.unshift(p);
		this.parts.pop();
	},
	move: function() {
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
		this.prependParts(p);
		delete this.nextDirection;
	}
}

var apple = {
	x: undefined,
	y: undefined,
	size: config.itemSize,
	init: function() {
		var boundaries = { 
			x: [ snake.size, canvas.w - this.size ],
			y: [ snake.size, canvas.h - this.size ]
		}
		this.x = util.getRandomInt(boundaries.x[0], boundaries.x[1]);
		this.y = util.getRandomInt(boundaries.y[0], boundaries.y[1]);
		this.draw();
	},
	draw: function() {
		canvas.ctx.fillStyle = 'red';
		canvas.ctx.fillRect(this.x, this.y, this.size, this.size);
	}
}

var keyboard = {
	onKeyUp: function(e) {
		if (e.keyCode == 39) snake.nextDirection = direction.EAST;
  		else if (e.keyCode == 37) snake.nextDirection = direction.WEST;
  		if (e.keyCode == 38) snake.nextDirection = direction.NORTH;
  		else if (e.keyCode == 40) snake.nextDirection = direction.SOUTH;
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

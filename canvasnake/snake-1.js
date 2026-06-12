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
		snake.draw();
	},
	init: function(canvasEl) {
		canvasEl.height = this.h;
		canvasEl.width = this.w;
		this.ctx = canvasEl.getContext("2d");
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, canvas.w, canvas.h);
		snake.init();
		canvas.draw();
	}
}

var direction = {
	NORTH: "N",
	EAST: "E",
	SOUTH: "S",
	WEST: "W"
}

var config = {
	itemSize: 24
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
	}
}

addEventListener('load', function() {
	canvas.init(document.getElementsByTagName("canvas")[0]);
}, false);

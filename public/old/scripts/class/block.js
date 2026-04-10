/ * Prototypes */
function Block(pos_x, pos_y, orientation, width, height, color, draggable, movement) {
	this.pos_x = pos_x;
	this.pos_y = pos_y;
	this.orientation = orientation;
	this.width = width;
	this.height = height;
	this.color = color;
	this.draggable = draggable;
	this.movement = movement;
	
	this.move = function (canvas, new_pos_x, new_pos_y) {
		this.pos_x = new_pos_x;
		this.pos_y = new_pos_y;
	};
	
	this.setDraggable = function (bool) {
		this.draggable = bool;
	};
	
	this.setMovement = function (bool) {
		this.movement = bool;
	};
}

function Level(number, blocks, isSolved, minSteps) {
	this.number = number;
	this.blocks = blocks;
	this.isSolved = isSolved;
	this.minSteps = minSteps;
}


/* Functions */
function createBlockList(blockInfos) {
	var k;
	var blockList = [];
	for (k = 0; k < blockInfos.length; k++){
		var block = new Block(blockInfos[k][0], blockInfos[k][1], blockInfos[k][2], blockInfos[k][3],
									 blockInfos[k][4], blockInfos[k][5], blockInfos[k][6], blockInfos[k][7]);
		blockList.push(block);
	}
	return blockList;
}

function initBoard(canvas, level, unit){
	// Clear all the canvas
	clearBlock(canvas, 10, 10, 6*unit, 6*unit);
	
	// Place the blocks
	var k;
	for (k=0; k < level.blocks.length ;k++) {
		drawBlock(canvas, level.blocks[k].pos_x, level.blocks[k].pos_y, 
					 level.blocks[k].width, level.blocks[k].height, level.blocks[k].color);
	}
}

function clearBlock (canvas, pos_x, pos_y, width, height) {
		var ctx = canvas.getContext('2d');
		ctx.clearRect(pos_x-1, pos_y-1, width+2, height+2);
	}

function drawBlock (canvas, pos_x, pos_y, width, height, color) {
	var ctx = canvas.getContext('2d');
	
	ctx.fillStyle = color;
	ctx.fillRect(pos_x, pos_y, width, height);
	ctx.strokeStyle = '#000';
	ctx.strokeRect(pos_x, pos_y, width, height);
}

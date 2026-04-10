var random_level = getRandomIntInclusive(0, 4);
var victorious;
var current_level = random_level;
var global_levels = [];
var unit;
var nb_plays = 0;
var reset = document.getElementById("reset");
var isTouchDevice = 'ontouchstart' in document.documentElement;
reset.onclick = function () {
	nb_plays = 0;
	victorious = false;
	var victoryWindow = document.getElementById("victoryWin");
	victoryWindow.style.display = "none";
	initGame(current_level);
}
window.onload = initGame(random_level);
window.onresize = function(){initGame(current_level)};

function initGame(level_id) {
	var levels = [];
	var gray = '#b3b3b3';
	var blue = '#49a0ff';
	
	/* Access and resize canvas */
	var canvas = document.getElementById("canvas");
	fitToContainer(canvas);
	var ctx = canvas.getContext("2d");
	unit = (canvas.width - 20) / 6;
	
	/* Draw the exit */
	ctx.fillStyle = '#222';
	ctx.fillRect(6*unit+15, 2*unit+15, unit-5, unit-5);

	/* Level 1 */
	// Define the blocks
	var blockInfos = [[15, 15, 'v', unit-5, 3*unit-5, gray, false, false], [15, 3*unit+15, 'h', 2*unit-5, unit-5, gray, false, false], [15, 4*unit+15, 'h', 2*unit-5, unit-5, gray, false, false],
				      [2*unit+15, 15, 'v', unit-5, 2*unit-5, gray, false, false], [2*unit+15, 3*unit+15, 'h', 2*unit-5, unit-5, gray, false, false], [2*unit+15, 4*unit+15, 'h', 2*unit-5, unit-5, gray, false, false],
				      [3*unit+15, 15, 'h', 3*unit-5, unit-5, gray, false, false], [3*unit+15, unit+15, 'v', unit-5, 2*unit-5, gray, false, false], [5*unit+15, 2*unit+15, 'v', unit-5, 3*unit-5, gray, false, false],
					  [unit+15, 2*unit+15, 'h', 2*unit-5, unit-5, blue, false, false]];
	var blocks = createBlockList(blockInfos);
	// Create level
	var level = new Level (1, blocks, false, 32);
	levels.push(level);
	
	/* Level 2 */
	// Define the blocks
	var blockInfos = [[15, 15, 'v', unit-5, 2*unit-5, gray, false, false], [15, 4*unit+15, 'h', 3*unit-5, unit-5, gray, false, false], [15, 5*unit+15, 'h', 3*unit-5, unit-5, gray, false, false],
				      [unit+15, 15, 'h', 2*unit-5, unit-5, gray, false, false], [unit+15, 3*unit+15, 'h', 2*unit-5, unit-5, gray, false, false], 
                      [2*unit+15, unit+15, 'v', unit-5, 2*unit-5, gray, false, false], [3*unit+15, 15, 'h', 2*unit-5, unit-5, gray, false, false],
                      [3*unit+15, unit+15, 'v', unit-5, 2*unit-5, gray, false, false], [3*unit+15, 3*unit+15, 'h', 2*unit-5, unit-5, gray, false, false], [3*unit+15, 4*unit+15, 'v', unit-5, 2*unit-5, gray, false, false],
                      [4*unit+15, unit+15, 'h', 2*unit-5, unit-5, gray, false, false], [5*unit+15, 2*unit+15, 'v', unit-5, 2*unit-5, gray, false, false],
                      [15, 2*unit+15, 'h', 2*unit-5, unit-5, blue, false, false]];
	blocks = createBlockList(blockInfos);
	// Create level
	level = new Level (2, blocks, false, 32);
	levels.push(level);
	
	/* Level 3 */
	// Define the blocks
	var blockInfos = [[15, unit+15, 'h', 3*unit-5, unit-5, gray, false, false], [15, 3*unit+15, 'v', unit-5, 2*unit-5, gray, false, false], [15, 5*unit+15, 'h', 2*unit-5, unit-5, gray, false, false],
                      [2*unit+15, 3*unit+15, 'h', 2*unit-5, unit-5, gray, false, false], [2*unit+15, 4*unit+15, 'v', unit-5, 2*unit-5, gray, false, false],
                      [3*unit+15, 15, 'v', unit-5, 3*unit-5, gray, false, false], [3*unit+15, 4*unit+15, 'h', 2*unit-5, unit-5, gray, false, false], 
                      [4*unit+15, 15, 'v', unit-5, 2*unit-5, gray, false, false], [4*unit+15, 2*unit+15, 'v', unit-5, 2*unit-5, gray, false, false], 
                      [5*unit+15, 2*unit+15, 'v', unit-5, 3*unit-5, gray, false, false],
                      [15, 2*unit+15, 'h', 2*unit-5, unit-5, blue, false, false]];
	blocks = createBlockList(blockInfos);
	// Create level
	level = new Level (3, blocks, false, 36);
	levels.push(level);
	
	/* Level 4 */
	// Define the blocks
	var blockInfos = [[15, 15, 'h', 3*unit-5, unit-5, gray, false, false], [15, unit+15, 'h', 3*unit-5, unit-5, gray, false, false], [15, 2*unit+15, 'v', unit-5, 2*unit-5, gray, false, false],
                      [unit+15, 3*unit+15, 'v', unit-5, 2*unit-5, gray, false, false],
                      [2*unit+15, 3*unit+15, 'h', 2*unit-5, unit-5, gray, false, false], [2*unit+15, 4*unit+15, 'v', unit-5, 2*unit-5, gray, false, false],
                      [3*unit+15, 4*unit+15, 'h', 2*unit-5, unit-5, gray, false, false], [3*unit+15, 5*unit+15, 'h', 2*unit-5, unit-5, gray, false, false],
                      [4*unit+15, 15, 'v', unit-5, 2*unit-5, gray, false, false], [4*unit+15, 2*unit+15, 'v', unit-5, 2*unit-5, gray, false, false],
                      [5*unit+15, 15, 'v', unit-5, 2*unit-5, gray, false, false], [5*unit+15, 2*unit+15, 'v', unit-5, 2*unit-5, gray, false, false],
                      [unit+15, 2*unit+15, 'h', 2*unit-5, unit-5, blue, false, false]];
	blocks = createBlockList(blockInfos);
	// Create level
	level = new Level (4, blocks, false, 31);
	levels.push(level);
    
    /* Level 5 */
	// Define the blocks
	var blockInfos = [[15, 15, 'v', unit-5, 2*unit-5, gray, false, false], [15, 3*unit+15, 'h', 2*unit-5, unit-5, gray, false, false],
                      [unit+15, unit+15, 'h', 3*unit-5, unit-5, gray, false, false],
                      [2*unit+15, 2*unit+15, 'v', unit-5, 2*unit-5, gray, false, false],
                      [3*unit+15, 2*unit+15, 'v', unit-5, 2*unit-5, gray, false, false], [3*unit+15, 4*unit+15, 'v', unit-5, 2*unit-5, gray, false, false],
                      [4*unit+15, 15, 'v', unit-5, 2*unit-5, gray, false, false], [4*unit+15, 2*unit+15, 'v', unit-5, 2*unit-5, gray, false, false], [4*unit+15, 4*unit+15, 'h', 2*unit-5, unit-5, gray, false, false],
                      [5*unit+15, 15, 'v', unit-5, 2*unit-5, gray, false, false], 
                      [15, 2*unit+15, 'h', 2*unit-5, unit-5, blue, false, false]];
	blocks = createBlockList(blockInfos);
	// Create level
	level = new Level (5, blocks, false, 32);
	levels.push(level);
	
	/* Load level and initialize the board */
	victorious = false;
	current_level = level_id;
	global_levels = levels;
	var moves = document.getElementById("nb_plays");
	moves.innerHTML = "0";
	initBoard(canvas, levels[level_id], unit);
	
	/* The mouseEvent functions */
    if (!isTouchDevice){
        canvas.onmousedown = function (event) {
            if (event.button == 0){
                var blocks = levels[level_id].blocks;
                var loc = windowToCanvas(canvas, event.clientX, event.clientY);
                var index = findBlockSelected(blocks, loc.x, loc.y);

                if (index != -1) {
                    var block = blocks[index];
                    var prev_pos_x = block.pos_x;
                    var prev_pos_y = block.pos_y;

                    block.setDraggable(true);

                    canvas.onmousemove = function (event) {
                        if (block.draggable) {
                            var new_loc = windowToCanvas(canvas, event.clientX, event.clientY);
                            var new_pos_x = new_loc.x - (loc.x - prev_pos_x);
                            var new_pos_y = new_loc.y - (loc.y - prev_pos_y);

                            if (block.orientation == 'h'){
                                block.setMovement(isMovableHorizontal(blocks, index, block.color == blue, new_pos_x, new_pos_y, block.width, block.height, canvas, 15, 15, 6*unit+25, 6*unit+25));
                                if (block.movement) {
                                    clearBlock(canvas, block.pos_x, block.pos_y, block.width, block.height);
                                    block.move(canvas, new_pos_x, block.pos_y);
                                    drawBlock(canvas, block.pos_x, block.pos_y, block.width, block.height, block.color);
                                }
                            }
                            else {
                                block.setMovement(isMovableVertical(blocks, index, new_pos_x, new_pos_y, block.width, block.height, canvas, 15, 15, 6*unit+25, 6*unit+25));
                                if (block.movement) {
                                    clearBlock(canvas, block.pos_x, block.pos_y, block.width, block.height);
                                    block.move(canvas, block.pos_x, new_pos_y);
                                    drawBlock(canvas, block.pos_x, block.pos_y, block.width, block.height, block.color);
                                }
                            }
                        }
                    };

                    window.onmouseup = function (event) {
                        if (block.draggable) {
                            var final_pos_x = (block.pos_x - 15) % unit;
                            var final_pos_y = (block.pos_y - 15) % unit;
                            clearBlock(canvas, block.pos_x, block.pos_y, block.width, block.height);
                            if (block.orientation == 'h'){
                                if (final_pos_x >= 0 & final_pos_x < unit/2) {
                                    block.move(canvas, Math.floor((block.pos_x - 15) / unit) * unit + 15, block.pos_y);
                                    if (Math.floor((block.pos_x - 15) / unit) * unit + 15 != prev_pos_x & !victorious) {
                                        nb_plays += 1;							
                                    }
                                }
                                else if (final_pos_x >= unit/2 & final_pos_x < unit) {
                                    block.move(canvas, Math.ceil((block.pos_x - 15) / unit) * unit + 15, block.pos_y);
                                    if (Math.ceil((block.pos_x - 15) / unit) * unit + 15 != prev_pos_x & !victorious) {
                                        nb_plays += 1;							
                                    }
                                }
                                if (block.color == blue & victorious) {
                                    block.move(canvas, 6*unit+15, block.pos_y);				
                                }
                            }
                            else {
                                if (final_pos_y >= 0 & final_pos_y < unit/2) {
                                    block.move(canvas, block.pos_x, Math.floor((block.pos_y - 15) / unit) * unit + 15);
                                    if (Math.floor((block.pos_y - 15) / unit) * unit + 15 != prev_pos_y) {
                                        nb_plays += 1;							
                                    }
                                }
                                else if (final_pos_y >= unit/2 & final_pos_y < unit) {
                                    block.move(canvas, block.pos_x, Math.ceil((block.pos_y - 15) / unit) * unit + 15);
                                    if (Math.ceil((block.pos_y - 15) / unit) * unit + 15 != prev_pos_y) {
                                        nb_plays += 1;							
                                    }
                                }
                            }
                            var moves = document.getElementById("nb_plays");
                            moves.innerHTML = nb_plays;
                            drawBlock(canvas, block.pos_x, block.pos_y, block.width, block.height, block.color);
                            block.setDraggable(false);
                        }
                    };
                }
            }
        };	
    }
    else {
        /* The touchEvent functions */
        canvas.ontouchstart = function (event) {
            var blocks = levels[level_id].blocks;
            var loc = windowToCanvas(canvas, event.touches[0].clientX, event.touches[0].clientY);
            var index = findBlockSelected(blocks, loc.x, loc.y);

            if (index != -1) {
                var block = blocks[index];
                var prev_pos_x = block.pos_x;
                var prev_pos_y = block.pos_y;

                block.setDraggable(true);

                canvas.ontouchmove = function (event) {
                    if (block.draggable) {
                        var new_loc = windowToCanvas(canvas, event.touches[0].clientX, event.touches[0].clientY);
                        var new_pos_x = new_loc.x - (loc.x - prev_pos_x);
                        var new_pos_y = new_loc.y - (loc.y - prev_pos_y);

                        if (block.orientation == 'h'){
                            block.setMovement(isMovableHorizontal(blocks, index, block.color == blue, new_pos_x, new_pos_y, block.width, block.height, canvas, 15, 15, 6*unit+25, 6*unit+25));
                            if (block.movement) {
                                clearBlock(canvas, block.pos_x, block.pos_y, block.width, block.height);
                                block.move(canvas, new_pos_x, block.pos_y);
                                drawBlock(canvas, block.pos_x, block.pos_y, block.width, block.height, block.color);
                            }
                        }
                        else {
                            block.setMovement(isMovableVertical(blocks, index, new_pos_x, new_pos_y, block.width, block.height, canvas, 15, 15, 6*unit+25, 6*unit+25));
                            if (block.movement) {
                                clearBlock(canvas, block.pos_x, block.pos_y, block.width, block.height);
                                block.move(canvas, block.pos_x, new_pos_y);
                                drawBlock(canvas, block.pos_x, block.pos_y, block.width, block.height, block.color);
                            }
                        }
                    }
                };

                window.ontouchend = function (event) {
                    if (block.draggable) {
                        var final_pos_x = (block.pos_x - 15) % unit;
                        var final_pos_y = (block.pos_y - 15) % unit;
                        clearBlock(canvas, block.pos_x, block.pos_y, block.width, block.height);
                        if (block.orientation == 'h'){
                            if (final_pos_x >= 0 & final_pos_x < unit/2) {
                                block.move(canvas, Math.floor((block.pos_x - 15) / unit) * unit + 15, block.pos_y);
                                if (Math.floor((block.pos_x - 15) / unit) * unit + 15 != prev_pos_x & !victorious) {
                                    nb_plays += 1;							
                                }
                            }
                            else if (final_pos_x >= unit/2 & final_pos_x < unit) {
                                block.move(canvas, Math.ceil((block.pos_x - 15) / unit) * unit + 15, block.pos_y);
                                if (Math.ceil((block.pos_x - 15) / unit) * unit + 15 != prev_pos_x & !victorious) {
                                    nb_plays += 1;							
                                }
                            }
                            if (block.color == blue & victorious) {
                                block.move(canvas, 6*unit+15, block.pos_y);				
                            }
                        }
                        else {
                            if (final_pos_y >= 0 & final_pos_y < unit/2) {
                                block.move(canvas, block.pos_x, Math.floor((block.pos_y - 15) / unit) * unit + 15);
                                if (Math.floor((block.pos_y - 15) / unit) * unit + 15 != prev_pos_y) {
                                    nb_plays += 1;							
                                }
                            }
                            else if (final_pos_y >= unit/2 & final_pos_y < unit) {
                                block.move(canvas, block.pos_x, Math.ceil((block.pos_y - 15) / unit) * unit + 15);
                                if (Math.ceil((block.pos_y - 15) / unit) * unit + 15 != prev_pos_y) {
                                    nb_plays += 1;							
                                }
                            }
                        }
                        var moves = document.getElementById("nb_plays");
                        moves.innerHTML = nb_plays;
                        drawBlock(canvas, block.pos_x, block.pos_y, block.width, block.height, block.color);
                        block.setDraggable(false);
                    }
                };
            }
        };	
    }
}


/* Other Functions */
function victory(canvas) {
	var victoryWindow = document.getElementById("victoryWin");
	victoryWindow.style.display = "block";
	
	var solvePlaysText = document.getElementById("solve_plays");
	var msgs = ["Come on, try harder!", "A little more effort!", "You were close!", "Congratulations!"];
	var victoryMsg = "";
	var minNbPlays = global_levels[current_level].minSteps
	console.log(nb_plays == minNbPlays);
	if (nb_plays == minNbPlays) {
		victoryMsg = msgs[3];
	}
	else if (nb_plays > minNbPlays & nb_plays <= minNbPlays + 5) {
		victoryMsg = msgs[2];
	}
	else if (nb_plays > minNbPlays+5 & nb_plays <= minNbPlays + 15) {
		victoryMsg = msgs[1];
	}
	else{
		victoryMsg = msgs[0];
	}
	solvePlaysText.innerHTML = "The best score is " + minNbPlays +" moves. " + victoryMsg; 
	
	var retryButton = document.getElementById("retry_button");
	retryButton.onclick = function () {
		nb_plays = 0;
		victorious = false;
		var victoryWindow = document.getElementById("victoryWin");
		victoryWindow.style.display = "none";
		initGame(current_level);
	};
	
	var nextButton = document.getElementById("next_button");
	nextButton.onclick = function () {
		nb_plays = 0;
		victorious = false;
		var victoryWindow = document.getElementById("victoryWin");
		victoryWindow.style.display = "none";
		var rand_level = getRandomIntInclusive(0,3);
		while (rand_level == current_level)
		{
			rand_level = getRandomIntInclusive(0,3);
		}
		initGame(rand_level);
	};
}

function isInBlock(pos_x, pos_y, block_x, block_y, width, height) {
	if (pos_x > block_x & pos_x < block_x + width & pos_y > block_y & pos_y < block_y + height){
		return true;	
	}
	else {
		return false;
	}
}

function isMovableHorizontal(blocks, index, is_blue, pos_x, pos_y, width, height, canvas, canvas_x, canvas_y, canvas_width, canvas_height) {
	/* Collision with borders */
	if (pos_x < canvas_x | canvas_width - (pos_x + width) <= canvas_x) {
		return false;
	}
	
	/* Collision with other blocks */	
	var i;
	for (i = 0; i < blocks.length; i++) {
		if (i != index) {
			// Test if we want to move in the direction of an adjacent block
			if ((isInBlock(blocks[index].pos_x-10,                         blocks[index].pos_y + blocks[index].height/2, blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) & pos_x < blocks[index].pos_x) |
				 (isInBlock(blocks[index].pos_x+10 + blocks[index].width+5, blocks[index].pos_y + blocks[index].height/2, blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) & pos_x > blocks[index].pos_x )){
					return false;				 		 
			}
			// Test 4 points of the block to be in or out of the other blocks
			if (isInBlock(pos_x,                           blocks[index].pos_y + blocks[index].height/2, blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(pos_x + blocks[index].width+5,   blocks[index].pos_y + blocks[index].height/2, blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(pos_x + blocks[index].width*1/4, blocks[index].pos_y,                          blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(pos_x + blocks[index].width*1/4, blocks[index].pos_y + blocks[index].height,   blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(pos_x + blocks[index].width*1/2, blocks[index].pos_y,                          blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(pos_x + blocks[index].width*1/2, blocks[index].pos_y + blocks[index].height,   blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(pos_x + blocks[index].width*3/4, blocks[index].pos_y,                          blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(pos_x + blocks[index].width*3/4, blocks[index].pos_y + blocks[index].height,   blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5)) {
				 	return false;
			}
			if (is_blue & (blocks[index].pos_x > canvas_width - (canvas_x + 5/4*blocks[index].width))) {
				victorious = true;	
				nb_plays += 1;
				var moves = document.getElementById("nb_plays");
				moves.innerHTML = nb_plays;
				blocks[index].setDraggable(false);
				victory(canvas);
				return true;
			}
		}
	}
	
	return true;
}

function isMovableVertical(blocks, index, pos_x, pos_y, width, height, canvas_x, canvas_y, canvas_width, canvas_height) {
	/* Collision with borders */
	if (pos_y < canvas_y | canvas_height - (pos_y + height) <= canvas_y) {
		return false;
	}
	
	/* Collision with other blocks */
	var i;
	for (i = 0; i < blocks.length; i++) {
		if (i != index) {
			// Test if we want to move in the direction of an adjacent block
			if ((isInBlock(blocks[index].pos_x + blocks[index].width/2, blocks[index].pos_y-10,                          blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) & pos_y < blocks[index].pos_y) |
				 (isInBlock(blocks[index].pos_x + blocks[index].width/2, blocks[index].pos_y+10 + blocks[index].height+5, blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) & pos_y > blocks[index].pos_y )){
					return false;				 		 
			}
			// Test 6 points of the block to be in or out of the other blocks
			if (isInBlock(blocks[index].pos_x + blocks[index].width/2,  pos_y,                            blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(blocks[index].pos_x + blocks[index].width/2,  pos_y + blocks[index].height+5,   blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(blocks[index].pos_x,                          pos_y + blocks[index].height*1/4, blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(blocks[index].pos_x + blocks[index].width,    pos_y + blocks[index].height*1/4, blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(blocks[index].pos_x,                          pos_y + blocks[index].height*1/2, blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(blocks[index].pos_x + blocks[index].width,    pos_y + blocks[index].height*1/2, blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(blocks[index].pos_x,                          pos_y + blocks[index].height*3/4, blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5) |
				 isInBlock(blocks[index].pos_x + blocks[index].width,    pos_y + blocks[index].height*3/4, blocks[i].pos_x, blocks[i].pos_y, blocks[i].width+5, blocks[i].height+5)) {
				 	return false;
			}
		}
	}
	
	return true;
}

function findBlockSelected(blocks, mouse_x, mouse_y) {
	var i;
	for (i = 0; i < blocks.length; i++) {
		if (mouse_x > blocks[i].pos_x & mouse_x < (blocks[i].pos_x + blocks[i].width) & mouse_y > blocks[i].pos_y & mouse_y < (blocks[i].pos_y + blocks[i].height)) {
			return i;
		}
	}
	return -1;
}

function getRandomIntInclusive(min, max) {
	min = Math.floor(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max-min+1)) + min;
}

function fitToContainer(canvas) {
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}

function windowToCanvas(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	
	return { x: x - bbox.left * (canvas.width / bbox.width),
			   y: y - bbox.top * (canvas.height / bbox.height)
			 };
}
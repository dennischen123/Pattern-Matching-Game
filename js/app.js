//grid classes approach



class Grid {
	constructor(level){
		this.hiddenBlocks = [];
		this.level = level;
		this.complexity = [3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
		this.patternSize = this.complexity[this.level];
		this.matrix = new Array(this.patternSize * this.patternSize);
	}
	//setup grid for round
	setupGrid() {
		this.generatePattern()
		this.fillGrid()
		this.addEventListeners()
		this.displayGrid()
	}
	//generate rand numbers to fill hiddenBlocks array - w/o duplicates
	generatePattern () {
		let rand = 0
		for (let i = 0; i < this.patternSize; i++) {
			rand = Math.floor(Math.random() * (this.matrix.length) + 0)
			if (this.hiddenBlocks.includes(rand))
				i--
			else
				this.hiddenBlocks.push(rand)
		}
	}
	//fill blocks with 1's or 0's.  1 = correct block, 0 = wrong block
	fillGrid() {
		for (let i = 0; i < this.matrix.length; i++) {
			this.matrix[i] = 0
		}
		this.hiddenBlocks.forEach( (element) => {
			this.matrix[element] = 1
		})
	}
	//add event listeners to each block
	addEventListeners() {
		console.log("Event Listeners Added")
	}

	displayGrid() {
		console.log("displaying grid")
		console.log(this.matrix)
	}
}

//creating grid on html





//create grid
const grid = new Grid(0)
grid.setupGrid()
// alert()
// grid.generatePattern()
// console.log(grid)

// console.log(grid.matrix)

//grid classes approach



class Grid {
	constructor(level){
		this.currentCorrect = 0;
		this.hiddenBlocks = [];
		this.level = level;
		this.complexity = [3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15];
		this.patternSize = this.complexity[this.level];
		this.matrix = new Array(this.patternSize * this.patternSize);
	}
	//setup grid for round
	setupGrid() {
		this.generatePattern()
		this.fillGrid()
		this.addEventListeners()
		this.generateUiGrid()

		//for testing
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
		document.querySelector('button').addEventListener('click', revealAndHide)
	}
	//creating grid on ui
	generateUiGrid() {
	
	document.querySelector('h2').innerHTML = `Round ${grid.level+1}`
	const main = document.querySelector("main")
	const table = document.createElement("table")
	table.setAttribute('align', "center")
	
	main.appendChild(table)

	//nested for loop to create tr and td and set id corresponding
	//to location of block
	for (let i = 0; i < grid.patternSize; i++) {
		let row = document.createElement('tr')
		for (let j = 0; j < grid.patternSize; j++) {
			let block = document.createElement('td')
			block.setAttribute('id', i * grid.patternSize + j)
			block.innerHTML = i * grid.patternSize + j

			// adding event listener to each block in grid
			block.addEventListener('click', isCorrect)
			row.appendChild(block)
		}
		table.appendChild(row)
	}
	if (grid.level > 0) {
		setTimeout(function () {
			revealAndHide()
		}, 1700)
	}
}

	displayGrid() {
		console.log("displaying grid")
		console.log(this.matrix)
	}
}




// Correct Block or not Logic
const isCorrect = (event) => {
	let index = event.target.getAttribute('id')
	if (grid.matrix[index]) {
		event.target.style.backgroundColor = "Green"
		grid.currentCorrect++;
		if (grid.currentCorrect == grid.patternSize){
			grid.level++
			console.log("win")
			setTimeout(function () {reset(grid.level,1);}, 300)
		}
	} else {
		event.target.style.backgroundColor = "Red"
		setTimeout(function () {reset(0,0) ;}, 300)
	}
}


//true or 1 = level up,   false or 0 = gameover
const reset = (level, mode) => {
	if (mode) {
		// alert("Level up")
		let header = document.querySelector('header')
		document.querySelector('h2').remove()
		header.appendChild(document.createElement('h2'))
		document.querySelector('h2').setAttribute('class','trackin')

	}
	else
		alert("You Lose")
	setTimeout(function (){;},1000)
	grid = new Grid(level)
	grid.setupGrid()

	console.log(grid)
	
	document.querySelector('table').remove()
	generateUiGrid()
}

//1 = reveal, 0 = hide 
const revealHidden = (mode) => {

	if (mode)
 		for (let i = 0; i < grid.hiddenBlocks.length; i++) {
 			document.querySelectorAll('td')[grid.hiddenBlocks[i]].style.backgroundColor = "green"
 		} else {
 		for (let i = 0; i < grid.hiddenBlocks.length; i++) {
			document.querySelectorAll('td')[grid.hiddenBlocks[i]].style.backgroundColor = "goldenrod"
 		}
	}
}

const revealAndHide = () => {
	revealHidden(1)
	setTimeout(function() {
		revealHidden(0)
	}, 1500)
}




let grid = new Grid(0)
grid.setupGrid()
// generateUiGrid()


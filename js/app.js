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

		//for testing
		// this.displayGrid()
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
		if (this.level === 0) {
			document.querySelector('button').addEventListener('click', revealAndHide)
		}

	}

	displayGrid() {
		console.log("displaying grid")
		console.log(this.matrix)
	}
}


//creating grid on ui
const generateUiGrid = () => {
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
				// block.innerHTML = i * grid.patternSize + j

				// adding event listener to each block in grid
				block.addEventListener('click', isCorrect)
				row.appendChild(block)
			}
			table.appendChild(row)
		}
		//auto reveal after first round
		if (grid.level > 0) {
			setTimeout(function () {
				revealAndHide()
			}, 1700)
		// document.querySelector('table').style.opacity = "50%"
		} else {document.querySelector('table').style.opacity = "50%"}
	}

// Correct Block or not Logic
const isCorrect = (event) => {
	let index = event.target.getAttribute('id')
	if (grid.matrix[index]) {
		event.target.style.backgroundColor = "Green"
		grid.currentCorrect++;
		event.target.removeEventListener('click',isCorrect)
		if (grid.currentCorrect == grid.patternSize){
			grid.level++
			// console.log("win")
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
		let header = document.querySelector('header')
		document.querySelector('h2').remove()
		header.appendChild(document.createElement('h2'))
		document.querySelector('h2').setAttribute('class','trackin')
		setTimeout(function (){;},1000)
		grid = new Grid(level)
		grid.setupGrid()
		document.querySelector('table').remove()
		generateUiGrid()
	}
	else{
		gameOver()
	}
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
	document.querySelector('table').style.opacity = "100%"
	if (document.querySelector('h3')){
		document.querySelector('h3').remove()
	}
	revealHidden(1)
	setTimeout(function() {
		revealHidden(0)
		document.querySelector('button').removeEventListener('click',revealAndHide)
	}, 1000)
}

//adds blinkings gameover animation and removing click eventlistener from grid
const gameOver = () => {
	document.querySelector('table').style.opacity = "50%"
	let p = document.querySelector('p')
	p.innerHTML = "Game Over"
	p.setAttribute('class', 'blinking')
	p.style.fontSize = "30px"

	addRemoveEventListeners(0,isCorrect, 'td')
	document.querySelector('button').addEventListener('click',function restart(){
		reset(0,1)
		p.innerHTML = ""
		document.querySelector('button').removeEventListener('click',restart)

	})
}

//add or remove a whole set of selectors passed in
// mode = 1 => addEventListeners  mode = 0 => removeEventListners
const addRemoveEventListeners = (mode, func, selector) => {
	if (mode) {
		let tags = document.querySelectorAll(selector)
		tags.forEach(function(tag){
			tag.addEventListener('click',func)
		})
	} else {
		let tags = document.querySelectorAll(selector)
		tags.forEach(function(tag){
			tag.removeEventListener('click',func)
		})
	}
}
// starting the game
let grid = new Grid(0)
grid.setupGrid()
generateUiGrid()


const Letter = require('./Letter');

const virtualBoard = {
	generate(rows, cols) {
		const instanceBoard = [];
		for (let row = 0; row < rows; row++) {
			instanceBoard.push([]);
			for (let col = 0; col < cols; col++) {
				instanceBoard[row].push(new Letter(
					row,
					col,
					this.mapToLetter(Math.random())
				));
			}
		}
		return instanceBoard;
	},
	mapToLetter(seed) {
		// Seed should be a number between 0 and 1 (inclusive)
		const percentThroughWeightedAlphabet = Math.floor(seed * 1000) / 10;
		let offset = 0, percentCovered = 0;
		// Modify randomness by frequency in English
		for (let i = 0; i < this.letterFrequency.length; i++) {
			percentCovered += this.letterFrequency[i];
			if (percentCovered < percentThroughWeightedAlphabet)
				offset++;
		}
		return String.fromCharCode(65 + offset);
	},
	letterFrequency: [
		8.167,
		1.492,
		2.782,
		4.253,
		12.702,
		2.228,
		2.015,
		6.094,
		6.966,
		0.153,
		0.772,
		4.025,
		2.406,
		6.749,
		7.507,
		1.929,
		0.095,
		5.987,
		6.327,
		9.056,
		2.758,
		0.978,
		2.360,
		0.150,
		1.974,
		0.074
	]
}

if (module.exports) module.exports = virtualBoard;
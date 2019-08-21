class Letter {
    constructor(col, row, content) {
        this.row = row;
        this.col = col;
        this.content = content;
    }

    equals(obj) {
        return obj.row === this.row && obj.col === this.col;
    }
}

// module.exports = Letter;
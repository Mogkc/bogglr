const Letter = require("../models/Letter");

module.exports = function (assert) {
    describe("Letter", () => {
        const row = 0, col = 1, content = "A";
        const example = new Letter(row, col, content);
        it("should use first argument for row", () => {
            assert.equal(example.row, row);
        });
        it("should use second argument for column", () => {
            assert.equal(example.col, col);
        });
        it("should use third argument for content", () => {
            assert.equal(example.content, content);
        });
        it("should be equal with identical attributes", () => {
            assert.equal(example.equals(new Letter(row, col, content)), true);
        });
        it("should compare only row/column with equals function", () => {
            assert.equal(example.equals(new Letter(row, col, content + "1")), true);
        });
        it("should not be equal with different row", () => {
            assert.equal(example.equals(new Letter(row + 1, col, content)), false);
        });
        it("should not be equal with different column", () => {
            assert.equal(example.equals(new Letter(row, col + 1, content)), false);
        });
    });
}

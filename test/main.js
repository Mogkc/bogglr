const assert = require("assert");
const Letter = require("../Letter");
const generateBoard = require("../virtualBoard");

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
        assert.equal(example.content, new Letter(row, col, content));
    });
    it("should be equal with identical content and different row/col", () => {
        assert.equal(example.content, new Letter(row, col, content));
    });
});

if (false)
    describe("GenerateBoard", () => {
        const rows = 2, cols = 4;
        const generated = generateBoard(rows, cols);
        it("should use first argument for rows", () => {
            assert.equal(generated.length, rows);
        });
        it("should use second argument for columns", () => {
            generated.forEach(col => {
                assert.equal(col.length, cols);
            });
        });
        it("should contain Letters", () => {
            assert.equal(typeof generated[0][0], typeof new Letter());
        });
    });
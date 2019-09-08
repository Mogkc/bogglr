const generateBoard = require("../models/virtualBoard");

module.exports = function (assert) {
    describe("virtualBoard.mapToLetter", () => {
        it("should return A for 0", () => {
            assert.equal(generateBoard.mapToLetter(0), 'A');
        });
        it("should return Z for close to 1", () => {
            assert.equal(generateBoard.mapToLetter(0.9999), 'Z');
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
}

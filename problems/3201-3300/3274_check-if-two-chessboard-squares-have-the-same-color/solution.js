/**
 * @param {string} coordinate1
 * @param {string} coordinate2
 * @return {boolean}
 */
var checkTwoChessboards = function (coordinate1, coordinate2) {
    // A square's color follows the parity of column index plus row
    // number; character-code offsets are even, so raw codes keep it.
    const p1 = (coordinate1.charCodeAt(0) + coordinate1.charCodeAt(1)) % 2;
    const p2 = (coordinate2.charCodeAt(0) + coordinate2.charCodeAt(1)) % 2;
    return p1 === p2;
};

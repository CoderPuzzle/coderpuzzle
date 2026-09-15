/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
    // Bijective base-26: letters are digits 1..26 with no zero, so every step
    // subtracts one before dividing; the off-by-one is the whole problem.
    const letters = [];
    while (columnNumber > 0) {
        // Map 1..26 onto 0..25, borrowing one from the next letter up.
        columnNumber--;
        letters.push(String.fromCharCode(65 + (columnNumber % 26)));
        columnNumber = Math.floor(columnNumber / 26);
    }
    // Remainders arrive least-significant letter first.
    return letters.reverse().join("");
};

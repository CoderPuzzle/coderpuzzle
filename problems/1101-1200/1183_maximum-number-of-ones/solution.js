/**
 * @param {number} width
 * @param {number} height
 * @param {number} sideLength
 * @param {number} maxOnes
 * @return {number}
 */
var maximumNumberOfOnes = function (width, height, sideLength, maxOnes) {
    // Each residue class (r, c) mod sideLength appears in every window
    // exactly once, so the constraint binds classes. Count how many grid
    // cells fall into each class: full blocks plus the leftover strip when
    // the remainder reaches r (or c).
    var counts = [];
    for (var r = 0; r < sideLength; r++) {
        for (var c = 0; c < sideLength; c++) {
            var rows = Math.floor(height / sideLength) + (height % sideLength > r ? 1 : 0);
            var cols = Math.floor(width / sideLength) + (width % sideLength > c ? 1 : 0);
            counts.push(rows * cols);
        }
    }
    counts.sort(function (a, b) {
        return b - a;
    });
    var total = 0;
    for (var i = 0; i < maxOnes; i++) {
        total += counts[i];
    }
    return total;
};

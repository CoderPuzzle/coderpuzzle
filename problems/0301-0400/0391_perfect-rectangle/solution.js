/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
var isRectangleCover = function (rectangles) {
    // Two signatures of an exact cover, gathered in one pass: the piece
    // areas must sum to the bounding rectangle's area, and every interior
    // corner cancels, leaving exactly the bounding box's four corners.
    let area = 0;
    let minX = Infinity;
    let minY = Infinity;
    let maxA = -Infinity;
    let maxB = -Infinity;
    const corners = new Set();
    const toggle = (x, y) => {
        // Toggle: add when absent, remove when present, so a corner shared
        // by 2 or 4 pieces vanishes instead of accumulating.
        const key = `${x},${y}`;
        if (!corners.delete(key)) {
            corners.add(key);
        }
    };
    for (const [x, y, a, b] of rectangles) {
        area += (a - x) * (b - y);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxA = Math.max(maxA, a);
        maxB = Math.max(maxB, b);
        toggle(x, y);
        toggle(x, b);
        toggle(a, y);
        toggle(a, b);
    }
    return (
        corners.size === 4 &&
        corners.has(`${minX},${minY}`) &&
        corners.has(`${minX},${maxB}`) &&
        corners.has(`${maxA},${minY}`) &&
        corners.has(`${maxA},${maxB}`) &&
        area === (maxA - minX) * (maxB - minY)
    );
};

/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function (points) {
    // Anchor each point in turn and bucket every later point by the
    // direction from the anchor: on any one line through the anchor all
    // other members share that direction, and the best line is counted
    // in full when the anchor is its earliest point.
    let best = 1;
    for (let i = 0; i < points.length; ++i) {
        const counts = new Map();
        for (let j = i + 1; j < points.length; ++j) {
            let dx = points[j][0] - points[i][0];
            let dy = points[j][1] - points[i][1];
            // Reduce to lowest terms, then canonicalize the sign so the
            // two readings of one line collapse onto a single key:
            // exact integers, never a floating-point slope.
            const g = gcd(Math.abs(dx), Math.abs(dy));
            dx /= g;
            dy /= g;
            if (dx < 0 || (dx === 0 && dy < 0)) {
                dx = -dx;
                dy = -dy;
            }
            const key = dx + "," + dy;
            counts.set(key, (counts.get(key) || 0) + 1);
        }
        for (const count of counts.values()) {
            best = Math.max(best, 1 + count);
        }
    }
    return best;
};

// Euclid's algorithm on absolute values, so it also reduces directions
// that point down or left.
function gcd(a, b) {
    while (b !== 0) {
        const remainder = a % b;
        a = b;
        b = remainder;
    }
    return a;
}

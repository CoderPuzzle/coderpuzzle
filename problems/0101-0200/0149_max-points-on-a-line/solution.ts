// Anchor each point in turn and bucket every later point by the direction
// from the anchor: on any one line through the anchor all other members
// share that direction, and the best line is counted in full when the
// anchor is its earliest point.
function maxPoints(points: number[][]): number {
    let best = 1;
    for (let i = 0; i < points.length; ++i) {
        const counts = new Map<number, number>();
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
            // A reduced |dy| stays below 2 * 10^4, far under the multiplier,
            // so packing the pair into one number cannot collide.
            const key = dx * 1000000 + dy;
            counts.set(key, (counts.get(key) || 0) + 1);
        }
        for (const count of counts.values()) {
            best = Math.max(best, 1 + count);
        }
    }
    return best;
}

// Euclid's algorithm on absolute values, so it also reduces directions
// that point down or left.
function gcd(a: number, b: number): number {
    while (b !== 0) {
        const remainder = a % b;
        a = b;
        b = remainder;
    }
    return a;
}

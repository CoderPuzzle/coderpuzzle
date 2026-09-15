/**
 * @param {number[][]} squares
 * @return {number}
 */
var separateSquares = function (squares) {
    let total = 0; // exact integer accumulation (mirrors Python's int sum)
    let hiTop = -Infinity;
    for (const sq of squares) {
        total += sq[2] * sq[2];
        const top = sq[1] + sq[2];
        if (top > hiTop) hiTop = top;
    }
    const target = total / 2.0;
    // area below a horizontal line is non-decreasing in its height, so
    // binary search the smallest y whose below-area reaches half the total
    let lo = 0.0;
    let hi = hiTop; // already an exact double
    // 60 halvings shrink the interval well below the 1e-5 tolerance
    for (let it = 0; it < 60; it++) {
        const mid = (lo + hi) / 2.0;
        let below = 0.0;
        // each square contributes width * height clipped to [0, l]
        for (const sq of squares) {
            const y = sq[1],
                l = sq[2];
            if (mid <= y) continue;
            const top = y + l;
            const m = mid < top ? mid : top; // min(mid, y + l)
            below += (m - y) * l;
        }
        // >= steers the search to the leftmost qualifying height
        if (below >= target) hi = mid;
        else lo = mid;
    }
    return hi;
};

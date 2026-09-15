// Coordinate compression: every left and right edge becomes a cell boundary,
// so each square's footprint is a run of compressed cells and touching edges
// share no cell — exactly the brushing rule. Heights stay well below 2^53:
// at most 1000 * 10^6 = 10^9.
function fallingSquares(positions: number[][]): number[] {
    const coords = Array.from(new Set(positions.flatMap((square) => [square[0], square[0] + square[1]]))).sort(
        (a, b) => a - b,
    );
    const index = new Map(coords.map((x, i) => [x, i]));
    // heights[k] is the top height over the cell [coords[k], coords[k+1]).
    const heights = new Array(coords.length).fill(0);
    const ans: number[] = [];
    let best = 0;
    for (const [left, side] of positions) {
        const lo = index.get(left) as number;
        const hi = index.get(left + side) as number;
        // The square lands on the tallest top among the cells it covers.
        let top = side;
        for (let cell = lo; cell < hi; cell += 1) {
            top = Math.max(top, side + heights[cell]);
        }
        for (let cell = lo; cell < hi; cell += 1) {
            heights[cell] = top;
        }
        best = Math.max(best, top);
        ans.push(best);
    }
    return ans;
}

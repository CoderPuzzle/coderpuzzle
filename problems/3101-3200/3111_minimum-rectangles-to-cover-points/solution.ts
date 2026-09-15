// Height never matters -- a rectangle's top may rise arbitrarily, so its
// reach is just the x-interval [start, start + w]. Sorting the x
// coordinates reduces the task to packing them into the fewest windows
// of width w: plant a window at the first uncovered point, drop
// everything it reaches, repeat.
function minRectanglesToCoverPoints(points: number[][], w: number): number {
    const xs = points.map((p) => p[0]).sort((a, b) => a - b);
    let count = 1;
    let anchor = xs[0];
    for (let i = 1; i < xs.length; i++) {
        if (xs[i] - anchor > w) {
            count++;
            anchor = xs[i];
        }
    }
    return count;
}

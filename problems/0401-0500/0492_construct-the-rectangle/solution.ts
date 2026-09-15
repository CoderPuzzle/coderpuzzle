function constructRectangle(area: number): number[] {
    // The best width is the largest divisor of area at or below its square
    // root: every factorization pairs a divisor above the root with one
    // below it, a larger W means a smaller L = area / W, and requirement 2
    // pins the answer to the below-root half — so the widest such W
    // minimizes L - W while keeping L >= W. The float square root can floor
    // one off at the edges, so settle it exactly first: starting below the
    // root could skip a square's [s, s] pair, and starting above it could
    // accept W > L (area 12 at width 4 gives [3, 4]).
    let width = Math.floor(Math.sqrt(area));
    while (width * width > area) {
        width -= 1;
    }
    while ((width + 1) * (width + 1) <= area) {
        width += 1;
    }
    while (area % width !== 0) {
        width -= 1;
    }
    return [area / width, width];
}

function maxCount(m: number, n: number, ops: number[][]): number {
    // Every operation covers the prefix rectangle anchored at the top-left
    // corner, so the cells incremented by all of them form the rectangle
    // sized by the smallest a and the smallest b; only those cells can
    // hold the maximum. Starting both minima at m and n covers empty ops,
    // where every cell stays 0 and all m*n cells are maximal.
    let minA = m;
    let minB = n;
    for (const [a, b] of ops) {
        if (a < minA) {
            minA = a;
        }
        if (b < minB) {
            minB = b;
        }
    }
    return minA * minB;
}

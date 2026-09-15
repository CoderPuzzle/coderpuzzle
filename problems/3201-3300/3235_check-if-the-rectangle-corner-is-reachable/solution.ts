function canReachCorner(xCorner: number, yCorner: number, circles: number[][]): boolean {
    // Nodes 0..n-1 are the circles, then the top, right, bottom, and left
    // edges of the rectangle. Touching circles merge into obstacle blobs,
    // and a blob pinned to two edges blocks the corner-to-corner path
    // exactly for the pairs left-right, left-bottom, right-top, and
    // top-bottom: spanning walls cut the rectangle in half, while the
    // other two pairs fence off the start and goal corners themselves.
    // A circle covering a corner touches both adjacent edges at once.
    // Squared distances reach ~4e18, beyond Number's exact integer range
    // of 2^53, so the geometry below uses BigInt; the inputs themselves
    // stay far below it and convert exactly.
    const limitX = BigInt(xCorner);
    const limitY = BigInt(yCorner);
    const disks = circles.map(([x, y, r]) => [BigInt(x), BigInt(y), BigInt(r)]);
    const n = disks.length;
    const top = n,
        right = n + 1,
        bottom = n + 2,
        left = n + 3;
    const parent = Array.from({ length: n + 4 }, (_, node) => node);
    const find = (node: number): number => {
        while (parent[node] !== node) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    };
    const unite = (a: number, b: number): void => {
        parent[find(a)] = find(b);
    };
    const clamp = (value: bigint, high: bigint): bigint => (value < 0n ? 0n : value > high ? high : value);
    const meetsEdge = (cx: bigint, cy: bigint, r2: bigint, fixed: bigint, vertical: boolean): boolean => {
        const px = vertical ? fixed : clamp(cx, limitX);
        const py = vertical ? clamp(cy, limitY) : fixed;
        return (cx - px) ** 2n + (cy - py) ** 2n <= r2;
    };
    for (let i = 0; i < n; ++i) {
        const [x, y, r] = disks[i];
        if (meetsEdge(x, y, r * r, limitY, false)) unite(top, i);
        if (meetsEdge(x, y, r * r, limitX, true)) unite(right, i);
        if (meetsEdge(x, y, r * r, 0n, false)) unite(bottom, i);
        if (meetsEdge(x, y, r * r, 0n, true)) unite(left, i);
        for (let j = 0; j < i; ++j) {
            const [xj, yj, rj] = disks[j];
            const dx = x - xj;
            const dy = y - yj;
            if (dx * dx + dy * dy <= (r + rj) * (r + rj)) unite(i, j);
        }
    }
    return (
        find(left) !== find(right) &&
        find(left) !== find(bottom) &&
        find(right) !== find(top) &&
        find(top) !== find(bottom)
    );
}

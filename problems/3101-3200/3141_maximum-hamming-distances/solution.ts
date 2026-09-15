function maxHammingDistances(nums: number[], m: number): number[] {
    // HD(x, y) + HD(~x, y) = m, so max distance from x = m - minDist(~x).
    const size = 1 << m;
    const full = size - 1;
    const dist: number[] = new Array(size).fill(size + 1);
    const queue: number[] = [];
    let head = 0;
    // Seed every distinct array value as a BFS source at distance 0.
    for (const value of new Set(nums)) {
        dist[value] = 0;
        queue.push(value);
    }
    // One bit flip = one Hamming step; unit edges make first reach shortest.
    while (head < queue.length) {
        const v = queue[head++];
        const nd = dist[v] + 1;
        for (let bit = 0; bit < m; bit++) {
            const u = v ^ (1 << bit);
            if (dist[u] > nd) {
                dist[u] = nd;
                queue.push(u);
            }
        }
    }
    // The complement's closest element is x's farthest.
    return nums.map((x) => m - dist[full ^ x]);
}

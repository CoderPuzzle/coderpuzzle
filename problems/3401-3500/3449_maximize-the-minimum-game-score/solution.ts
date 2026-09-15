function maxScore(points: number[], m: number): number {
    const n = points.length;

    const feasible = (target: number): boolean => {
        // an optimal walk for a fixed target never backtracks more than one
        // step: sweep left to right, bouncing across the i/i+1 boundary
        let moves = 0;
        // visits already banked at i by the bounce around the previous boundary
        let prev = 0;
        for (let i = 0; i < n; i++) {
            const gp = points[i];
            // visits still needed at i after crediting the banked ones
            const remain = Math.floor((target + gp - 1) / gp) - prev;
            if (remain >= 1) {
                // 2*remain-1 moves buy remain visits here, banking remain-1 at i+1
                prev = remain - 1;
                moves += 2 * remain - 1;
            } else if (i !== n - 1) {
                // quota already met: a single forward move, nothing banked
                prev = 0;
                moves += 1;
            }
            if (moves > m) {
                return false;
            }
        }
        return moves <= m;
    };

    let hi = 0;
    for (const p of points) {
        if (p * m > hi) hi = p * m;
    }
    let lo = 0;
    // feasibility is monotone in the target: binary search the largest achievable one
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo + 1) / 2);
        if (feasible(mid)) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
}

// Breaking lock i as the j-th lock (0-based) takes ceil(strength[i] /
// (1 + j*k)) minutes, because the sword banks 1 + j*k energy per minute.
// Which locks are already broken is all that matters, so a bitmask DP
// works: best[mask] is the minimum minutes to break exactly the locks in
// mask, and each unbroken lock i extends mask at the cost of one ceil
// division by the next slot's factor 1 + popcount*k. n <= 8 keeps this at
// a few thousand moves.
function findMinimumTime(strength: number[], k: number): number {
    const n = strength.length;
    const best: number[] = new Array(1 << n).fill(Infinity);
    best[0] = 0;
    for (let mask = 0; mask < 1 << n; mask++) {
        let rest = mask;
        let broken = 0;
        while (rest) {
            rest &= rest - 1;
            broken++;
        }
        const factor = 1 + broken * k;
        for (let i = 0; i < n; i++) {
            if ((mask >> i) % 2 === 0) {
                const cost = best[mask] + Math.ceil(strength[i] / factor);
                if (cost < best[mask | (1 << i)]) {
                    best[mask | (1 << i)] = cost;
                }
            }
        }
    }
    return best[(1 << n) - 1];
}

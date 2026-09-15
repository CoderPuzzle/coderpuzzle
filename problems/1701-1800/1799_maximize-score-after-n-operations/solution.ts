// dp[mask] is the best score once exactly the elements of mask have been
// removed; the next operation is popcount(mask) / 2 + 1 and pairs any two
// still-present elements. Ascending mask order works because transitions
// only set bits, and the growing multiplier is why the richest pair often
// belongs to the last operation, not the first. Totals stay below
// 28 * 10^6, far below 2^53, so plain numbers hold every score exactly.
function maxScore(nums: number[]): number {
    const m = nums.length;
    const g: number[][] = Array.from({ length: m }, () => new Array(m).fill(0));
    for (let i = 0; i < m; ++i) {
        for (let j = i + 1; j < m; ++j) {
            let a = nums[i];
            let b = nums[j];
            while (b !== 0) {
                const t = a % b;
                a = b;
                b = t;
            }
            g[i][j] = a;
            g[j][i] = a;
        }
    }
    const size = 1 << m;
    const dp: number[] = new Array(size).fill(0);
    for (let mask = 0; mask < size; ++mask) {
        let pc = 0;
        for (let i = 0; i < m; ++i) {
            pc += (mask >> i) & 1;
        }
        const k = (pc >> 1) + 1;
        const base = dp[mask];
        for (let i = 0; i < m; ++i) {
            if ((mask >> i) & 1) continue;
            for (let j = i + 1; j < m; ++j) {
                if ((mask >> j) & 1) continue;
                const next = mask | (1 << i) | (1 << j);
                const cand = base + k * g[i][j];
                if (cand > dp[next]) dp[next] = cand;
            }
        }
    }
    return dp[size - 1];
}

function minDistance(houses: number[], k: number): number {
    houses.sort((a, b) => a - b);
    const n = houses.length;
    const memo: number[][] = Array.from({ length: n }, () => new Array(k + 1).fill(-1));
    const runCost = (i: number, j: number): number => {
        let total = 0;
        for (let lo = i, hi = j; lo < hi; lo++, hi--) {
            total += houses[hi] - houses[lo];
        }
        return total;
    };
    const dp = (i: number, boxes: number): number => {
        if (boxes >= n - i) {
            return 0;
        }
        if (memo[i][boxes] !== -1) {
            return memo[i][boxes];
        }
        if (boxes === 1) {
            memo[i][boxes] = runCost(i, n - 1);
            return memo[i][boxes];
        }
        let best = Infinity;
        for (let j = i; j <= n - boxes; j++) {
            best = Math.min(best, runCost(i, j) + dp(j + 1, boxes - 1));
        }
        memo[i][boxes] = best;
        return best;
    };
    return dp(0, k);
}

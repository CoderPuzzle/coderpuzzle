function stoneGameV(stoneValue: number[]): number {
    const n = stoneValue.length;
    // Prefix sums turn any slice's weight into an O(1) subtraction.
    const prefix: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; ++i) {
        prefix[i + 1] = prefix[i] + stoneValue[i];
    }

    // dp[i][j] is the best score obtainable starting from the slice
    // [i, j]; a single stone (i == j) ends the game with no more score,
    // so the table is left at its zero-initialized default there.
    const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let length = 2; length <= n; ++length) {
        for (let i = 0; i + length - 1 < n; ++i) {
            const j = i + length - 1;
            let best = 0;
            for (let k = i; k < j; ++k) {
                const leftSum = prefix[k + 1] - prefix[i];
                const rightSum = prefix[j + 1] - prefix[k + 1];
                let candidate: number;
                if (leftSum < rightSum) {
                    candidate = leftSum + dp[i][k];
                } else if (leftSum > rightSum) {
                    candidate = rightSum + dp[k + 1][j];
                } else {
                    // A tie lets Alice keep whichever half scores more later.
                    candidate = leftSum + Math.max(dp[i][k], dp[k + 1][j]);
                }
                if (candidate > best) {
                    best = candidate;
                }
            }
            dp[i][j] = best;
        }
    }
    return dp[0][n - 1];
}

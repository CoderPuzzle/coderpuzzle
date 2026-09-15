function maxValueOfCoins(piles: number[][], k: number): number {
    // dp[j]: best value using exactly j coins from the piles seen so far
    let dp: number[] = new Array(k + 1).fill(0);
    for (const pile of piles) {
        // taking t coins from a pile means its top t: prefix[t]
        const prefix: number[] = [0];
        for (const coin of pile) {
            prefix.push(prefix[prefix.length - 1] + coin);
        }
        // t stays within both the pile's size and the budget
        const takeMax = Math.min(pile.length, k);
        // fresh row so transitions only read the previous pile's dp
        const ndp: number[] = new Array(k + 1).fill(0);
        for (let j = 0; j <= k; j++) {
            // t = 0 case: skip this pile entirely
            let value = dp[j];
            const lim = Math.min(takeMax, j);
            for (let t = 1; t <= lim; t++) {
                const cand = dp[j - t] + prefix[t];
                if (cand > value) value = cand;
            }
            ndp[j] = value;
        }
        dp = ndp;
    }
    // coin values are positive, so using all k coins is never worse
    return dp[k];
}

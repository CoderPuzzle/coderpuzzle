function minArraySum(nums: number[], k: number, op1: number, op2: number): number {
    // dp[a][b] = smallest achievable sum of the remaining suffix given a
    // op1 uses and b op2 uses left. Each index branches over: skip, op1
    // alone, op2 alone, and both operations on the same index — in either
    // order, because halve-then-subtract and subtract-then-halve land on
    // different values (e.g. 5 with k = 3: 5 -> 3 -> 0 beats 5 -> 2 -> 1).
    // Values reach 1e5 and n is at most 100, so sums stay far below 2^53
    // and plain numbers hold everything exactly.
    let nxt: number[][] = Array.from({ length: op1 + 1 }, () => new Array(op2 + 1).fill(0));
    for (let i = nums.length - 1; i >= 0; --i) {
        const value = nums[i];
        const halved = (value + 1) >> 1;
        const cur: number[][] = Array.from({ length: op1 + 1 }, () => new Array(op2 + 1).fill(0));
        for (let a = 0; a <= op1; ++a) {
            for (let b = 0; b <= op2; ++b) {
                let best = value + nxt[a][b];
                if (a > 0) {
                    best = Math.min(best, halved + nxt[a - 1][b]);
                    if (b > 0) {
                        // op2's precondition applies to the value it
                        // meets, which depends on the order chosen.
                        const both = nxt[a - 1][b - 1];
                        if (halved >= k) best = Math.min(best, halved - k + both);
                        if (value >= k) {
                            best = Math.min(best, ((value - k + 1) >> 1) + both);
                        }
                    }
                }
                if (b > 0 && value >= k) {
                    best = Math.min(best, value - k + nxt[a][b - 1]);
                }
                cur[a][b] = best;
            }
        }
        nxt = cur;
    }
    return nxt[op1][op2];
}

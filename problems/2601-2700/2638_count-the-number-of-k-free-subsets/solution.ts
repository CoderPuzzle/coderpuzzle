function countTheNumOfKFreeSubsets(nums: number[], k: number): number {
    nums = nums.slice().sort((a, b) => a - b);
    // Two elements conflict only when they differ by exactly k, which chains
    // values into arithmetic sequences: x joins x - k's group when that
    // predecessor exists, else starts a new one. Any conflicting pair lands
    // in the same chain, so groups are independent.
    const groupOf = new Map<number, number>();
    const lengths: number[] = [];
    for (const x of nums) {
        if (groupOf.has(x - k)) {
            const gid = groupOf.get(x - k)!;
            groupOf.set(x, gid);
            lengths[gid]++;
        } else {
            groupOf.set(x, lengths.length);
            lengths.push(1);
        }
    }
    // Product over chains; 1 counts the empty subset of the whole array.
    let ans = 1;
    for (const length of lengths) {
        // A k-free subset of a chain omits chain-adjacent members —
        // independent sets of a path. dp[i] = dp[i-1] + dp[i-2] is a
        // Fibonacci shift; after `length` steps b is the chain's count.
        let a = 1,
            b = 1;
        for (let _ = 0; _ < length; _++) {
            [a, b] = [b, a + b];
        }
        ans *= b;
    }
    return ans;
}

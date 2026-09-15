function longestArithSeqLength(nums: number[]): number {
    const n = nums.length;
    const dp: Map<number, number>[] = new Array(n);
    let best = 1;
    for (let i = 0; i < n; i++) {
        const cur = new Map<number, number>();
        for (let j = 0; j < i; j++) {
            const d = nums[i] - nums[j];
            const length = (dp[j].get(d) || 1) + 1;
            const existing = cur.get(d) || 1;
            if (length > existing) {
                cur.set(d, length);
                if (length > best) {
                    best = length;
                }
            }
        }
        dp[i] = cur;
    }
    return best;
}

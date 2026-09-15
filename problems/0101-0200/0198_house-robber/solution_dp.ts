function rob(nums: number[]): number {
    // Rolling two-variable DP: cur = best through house i-1, prev = best
    // through house i-2; both start at 0 ("nothing robbed yet").
    let prev = 0,
        cur = 0;
    for (const x of nums) {
        // Skip this house (keep cur) or rob it (prev + x).
        const next = Math.max(cur, prev + x);
        prev = cur;
        cur = next;
    }
    return cur;
}

function mostCompetitive(nums: number[], k: number): number[] {
    // "Most competitive" is the lexicographically smallest length-k
    // subsequence — build it as a non-decreasing stack in one pass.
    const stack: number[] = [];
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        const value = nums[i];
        const remaining = n - i;
        // Drop strictly larger tops while enough unread values remain to
        // refill to k; the strict > keeps the earlier of equal values,
        // which changes nothing lexicographically.
        while (stack.length && stack[stack.length - 1] > value && stack.length + remaining > k) {
            stack.pop();
        }
        // Append only while there is room; a full stack can only change
        // through eviction above.
        if (stack.length < k) {
            stack.push(value);
        }
    }
    return stack;
}

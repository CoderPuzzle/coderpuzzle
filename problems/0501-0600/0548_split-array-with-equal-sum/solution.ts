function splitArray(nums: number[]): boolean {
    // Fix the middle cut j: the four parts share one sum exactly when
    // some left split (0 < i < j - 1) balances — sum(0, i - 1) ==
    // sum(i + 1, j - 1) — and some right split (j + 1 < k < n - 1)
    // balances on the SAME value — sum(j + 1, k - 1) == sum(k + 1, n - 1).
    // Prefix sums turn every part into a difference of two table
    // entries: collect the balanced left values of this j in a set,
    // then scan k for a balanced right value already in the set.
    const n = nums.length;
    const prefix: number[] = new Array(n + 1).fill(0);
    for (let index = 0; index < n; ++index) {
        prefix[index + 1] = prefix[index] + nums[index];
    }
    for (let j = 3; j < n - 3; ++j) {
        const seen = new Set<number>();
        for (let i = 1; i < j - 1; ++i) {
            if (prefix[i] === prefix[j] - prefix[i + 1]) {
                seen.add(prefix[i]);
            }
        }
        for (let k = j + 2; k < n - 1; ++k) {
            if (prefix[k] - prefix[j + 1] === prefix[n] - prefix[k + 1] && seen.has(prefix[k] - prefix[j + 1])) {
                return true;
            }
        }
    }
    return false;
}

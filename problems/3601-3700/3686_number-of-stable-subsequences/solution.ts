function countStableSubsequences(nums: number[]): number {
    const MOD = 1e9 + 7;
    // Three same-parity elements in a row are the only way a subsequence
    // breaks, so four counters describe every stable subsequence seen so
    // far: trailing even run of length 1 or 2, trailing odd run of 1 or 2.
    // Every intermediate stays below 3 * MOD + 1, far inside Number's exact
    // integer range.
    let [e1, e2, o1, o2] = [0, 0, 0, 0];
    for (const x of nums) {
        if (x % 2 === 0) {
            // Fresh subsequence, odd-ending extensions (the even run restarts
            // at 1), or an even run of 1 promoted to 2; destructuring evaluates
            // the right-hand side before either update lands.
            [e1, e2] = [(e1 + o1 + o2 + 1) % MOD, (e2 + e1) % MOD];
        } else {
            // Mirror image with odd and even swapped.
            [o1, o2] = [(o1 + e1 + e2 + 1) % MOD, (o2 + o1) % MOD];
        }
    }
    return (e1 + e2 + o1 + o2) % MOD;
}

impl Solution {
    pub fn subsequence_count(nums: Vec<i32>) -> i32 {
        // Carry the count of even-sum and odd-sum subsequences of the
        // scanned prefix; an even element doubles both counts, an odd one
        // makes both counts their sum. Values stay below 2 * (10^9 + 6),
        // which fits in an i32.
        const MOD: i32 = 1_000_000_007;
        let mut even: i32 = 1;
        let mut odd: i32 = 0;
        for &num in &nums {
            if num % 2 != 0 {
                let merged = (even + odd) % MOD;
                even = merged;
                odd = merged;
            } else {
                even = (even * 2) % MOD;
                odd = (odd * 2) % MOD;
            }
        }
        odd
    }
}

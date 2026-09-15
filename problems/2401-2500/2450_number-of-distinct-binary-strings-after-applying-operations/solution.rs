impl Solution {
    pub fn count_distinct_strings(s: String, k: i32) -> i32 {
        // Only the number of size-k windows matters: e = n - k + 1. Flipping
        // a window is an independent yes/no choice and each combination gives
        // a distinct string (hint 2), so the answer is 2^e mod 1e9+7.
        const MOD: i64 = 1_000_000_007;
        let mut e = s.len() as i64 - k as i64 + 1;
        let (mut base, mut res) = (2i64, 1i64);
        while e > 0 {
            if e & 1 == 1 {
                res = res * base % MOD;
            }
            base = base * base % MOD;
            e >>= 1;
        }
        res as i32
    }
}

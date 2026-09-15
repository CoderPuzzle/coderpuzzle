impl Solution {
    pub fn find_derangement(n: i32) -> i32 {
        // Element 1 lands at some position i != 1 (n - 1 ways); either i's
        // element takes 1's slot (D(n - 2) ways) or it does not (D(n - 1)
        // ways), so D(n) = (n - 1) * (D(n - 1) + D(n - 2)). Both running
        // values stay under the modulus, but their sum times (i - 1)
        // reaches ~2e15, so the pair lives in i64s.
        const MOD: i64 = 1_000_000_007;
        let (mut prev, mut cur) = (1i64, 0i64); // D(0), D(1)
        for i in 2..=n as i64 {
            let next = (i - 1) * (cur + prev) % MOD;
            prev = cur;
            cur = next;
        }
        cur as i32
    }
}

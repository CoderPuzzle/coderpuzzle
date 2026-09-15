impl Solution {
    pub fn num_sub(s: String) -> i32 {
        // `run` tracks the length of the run of 1s ending at the current
        // position; adding it after each step accumulates n * (n + 1) / 2
        // for every completed run, one unit at a time. `total` is i64 so
        // the running sum never overflows before the mod is applied.
        const MOD: i64 = 1_000_000_007;
        let mut total: i64 = 0;
        let mut run: i64 = 0;
        for c in s.bytes() {
            run = if c == b'1' { run + 1 } else { 0 };
            total = (total + run) % MOD;
        }
        total as i32
    }
}

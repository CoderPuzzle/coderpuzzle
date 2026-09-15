impl Solution {
    pub fn count_ways(mut ranges: Vec<Vec<i32>>) -> i32 {
        // Sort by start point; overlapping ranges then form contiguous
        // runs, and each maximal run sits in either group freely, so
        // the answer is 2^(runs) mod 1e9+7 by iterative binary
        // exponentiation; i64s absorb the ~10^18 intermediate products
        // safely.
        const MOD: i64 = 1_000_000_007;
        ranges.sort_unstable();
        let mut groups = 1i64;
        let mut reach = ranges[0][1];
        for r in ranges.iter().skip(1) {
            let (s, e) = (r[0], r[1]);
            if s > reach {
                groups += 1;
                reach = e;
            } else if e > reach {
                reach = e;
            }
        }
        let mut result: i64 = 1;
        let mut base: i64 = 2 % MOD;
        while groups > 0 {
            if groups & 1 == 1 {
                result = result * base % MOD;
            }
            base = base * base % MOD;
            groups >>= 1;
        }
        result as i32
    }
}

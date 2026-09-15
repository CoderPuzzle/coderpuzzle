impl Solution {
    pub fn num_of_ways(n: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut a: i64 = 6;
        let mut b: i64 = 6;
        for _ in 1..n {
            let next_a = (3 * a + 2 * b) % MOD;
            let next_b = (2 * a + 2 * b) % MOD;
            a = next_a;
            b = next_b;
        }
        ((a + b) % MOD) as i32
    }
}

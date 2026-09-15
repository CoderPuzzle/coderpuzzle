impl Solution {
    pub fn count_orders(n: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut result: i64 = 1;
        // f(i) = f(i-1) * i * (2i-1): the 2(i-1) placed services leave
        // 2i-1 gaps; pickup picks one, delivery lands to its right (1+2+...+(2i-1))
        for i in 2..=n as i64 {
            result = result * (2 * i - 1) % MOD * i % MOD;
        }
        result as i32
    }
}

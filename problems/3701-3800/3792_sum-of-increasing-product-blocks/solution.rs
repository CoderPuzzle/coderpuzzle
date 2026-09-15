impl Solution {
    pub fn sum_of_blocks(n: i32) -> i32 {
        // Build the blocks in order from one shared counter: block i
        // multiplies the next i consecutive integers into a product that
        // is reduced modulo 10^9 + 7 after every factor, then folds it
        // into the running total. F(n) combines the blocks using only
        // multiplication and addition, so residue arithmetic reproduces
        // F(n) mod 10^9 + 7 exactly while the exact products are never
        // materialized.
        const MOD: i64 = 1_000_000_007;
        let mut total: i64 = 0;
        let mut cur: i64 = 1;
        for i in 1..=n {
            let mut prod: i64 = 1;
            for _ in 0..i {
                prod = prod * cur % MOD;
                cur += 1;
            }
            total = (total + prod) % MOD;
        }
        total as i32
    }
}

impl Solution {
    pub fn monkey_move(n: i32) -> i32 {
        // Complement counting: only the two unanimous rotations avoid
        // all collisions, so the answer is (2^n - 2) mod 1e9+7 by
        // iterative binary exponentiation; i64s absorb the ~10^18
        // intermediate products safely.
        const MOD: i64 = 1_000_000_007;
        let mut result: i64 = 1;
        let mut base: i64 = 2;
        let mut e = n as i64;
        while e > 0 {
            if e & 1 == 1 {
                result = result * base % MOD;
            }
            base = base * base % MOD;
            e >>= 1;
        }
        ((result - 2 + MOD) % MOD) as i32
    }
}

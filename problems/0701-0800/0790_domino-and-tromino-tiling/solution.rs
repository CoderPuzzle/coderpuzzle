impl Solution {
    pub fn num_tilings(n: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        if n == 1 {
            return 1;
        }
        if n == 2 {
            return 2;
        }
        let (mut a, mut b, mut c) = (1i64, 1i64, 2i64); // f(0), f(1), f(2)
        for _ in 3..=n {
            let next = (2 * c + a) % MOD;
            a = b;
            b = c;
            c = next;
        }
        c as i32
    }
}

impl Solution {
    pub fn number_of_ways(n: i32, m: i32, k: i32, source: Vec<i32>, dest: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let k = k as usize;
        // line_counts: walks of t steps (each step to a different position
        // on a line of `size` cells) ending at target vs anywhere else. A
        // step into target can come from any other position; a step
        // elsewhere has size - 1 options from target and size - 2 from any
        // other position.
        let line_counts = |size: i64, start: i32, target: i32| -> Vec<i64> {
            let mut a = vec![0i64; k + 1];
            let mut b = vec![0i64; k + 1];
            if start == target {
                a[0] = 1;
            } else {
                b[0] = 1;
            }
            let off_by_one = (size - 1) % MOD;
            let off_by_two = (size - 2) % MOD;
            for t in 0..k {
                a[t + 1] = b[t];
                b[t + 1] = (a[t] * off_by_one + b[t] * off_by_two) % MOD;
            }
            a
        };
        let ax = line_counts(n as i64, source[0], dest[0]);
        let ay = line_counts(m as i64, source[1], dest[1]);
        // Factorials for choosing which of the k moves change x.
        let mut fact = vec![1i64; k + 1];
        for i in 1..=k {
            fact[i] = fact[i - 1] * i as i64 % MOD;
        }
        let power = |mut base: i64, mut exp: i64| -> i64 {
            let mut result: i64 = 1;
            while exp > 0 {
                if exp & 1 == 1 {
                    result = result * base % MOD;
                }
                base = base * base % MOD;
                exp >>= 1;
            }
            result
        };
        let mut inv_fact = vec![1i64; k + 1];
        inv_fact[k] = power(fact[k], MOD - 2);
        for i in (1..=k).rev() {
            inv_fact[i - 1] = inv_fact[i] * i as i64 % MOD;
        }
        // A move keeps one coordinate fixed, so x and y evolve
        // independently: with i of the k moves changing x, the x-walk has i
        // steps, the y-walk k - i steps, and their interleavings number
        // C(k, i).
        let mut ans: i64 = 0;
        for i in 0..=k {
            let comb = fact[k] * inv_fact[i] % MOD * inv_fact[k - i] % MOD;
            ans = (ans + comb * ax[i] % MOD * ay[k - i]) % MOD;
        }
        ans as i32
    }
}

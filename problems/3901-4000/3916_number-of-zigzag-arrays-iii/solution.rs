impl Solution {
    pub fn zig_zag_arrays(n: i32, l: i32, r: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let points = n as usize + 1;
        let mut values = vec![0i64; points + 1];
        for width in 2..=points {
            let mut up: Vec<i64> = (0..width).map(|value| value as i64).collect();
            let mut down: Vec<i64> = (0..width).map(|value| (width - 1 - value) as i64).collect();
            for _ in 3..=n {
                let mut next_up = vec![0i64; width];
                let mut running = 0i64;
                for value in 0..width {
                    next_up[value] = running;
                    running = (running + down[value]) % MOD;
                }
                let mut next_down = vec![0i64; width];
                running = 0;
                for value in (0..width).rev() {
                    next_down[value] = running;
                    running = (running + up[value]) % MOD;
                }
                up = next_up;
                down = next_down;
            }
            for value in 0..width {
                values[width] = (values[width] + up[value] + down[value]) % MOD;
            }
        }
        let width = (r - l + 1) as usize;
        if width <= points {
            return values[width] as i32;
        }
        let power = |mut base: i64, mut exponent: i64| {
            let mut result = 1i64;
            while exponent > 0 {
                if exponent & 1 == 1 {
                    result = result * base % MOD;
                }
                base = base * base % MOD;
                exponent >>= 1;
            }
            result
        };
        let mut factorial = vec![1i64; points + 1];
        let mut inverse_factorial = vec![1i64; points + 1];
        for value in 1..=points {
            factorial[value] = factorial[value - 1] * value as i64 % MOD;
        }
        inverse_factorial[points] = power(factorial[points], MOD - 2);
        for value in (1..=points).rev() {
            inverse_factorial[value - 1] = inverse_factorial[value] * value as i64 % MOD;
        }
        let mut prefix = vec![1i64; points + 2];
        let mut suffix = vec![1i64; points + 2];
        for value in 1..=points {
            prefix[value] = prefix[value - 1] * (width - value) as i64 % MOD;
        }
        for value in (1..=points).rev() {
            suffix[value] = suffix[value + 1] * (width - value) as i64 % MOD;
        }
        let mut answer = 0i64;
        for value in 1..=points {
            let mut term = values[value] * prefix[value - 1] % MOD * suffix[value + 1] % MOD;
            term = term * inverse_factorial[value - 1] % MOD * inverse_factorial[points - value] % MOD;
            answer += if (points - value) % 2 == 0 { term } else { -term };
        }
        ((answer % MOD + MOD) % MOD) as i32
    }
}

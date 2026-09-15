impl Solution {
    fn mat_mul(a: &Vec<Vec<i64>>, b: &Vec<Vec<i64>>) -> Vec<Vec<i64>> {
        const MOD: i64 = 1_000_000_007;
        let size = a.len();
        let mut c = vec![vec![0i64; size]; size];
        for i in 0..size {
            for k in 0..size {
                let aik = a[i][k];
                if aik == 0 {
                    continue;
                }
                for j in 0..size {
                    c[i][j] = (c[i][j] + aik * b[k][j] % MOD) % MOD;
                }
            }
        }
        c
    }

    fn mat_pow(mut base: Vec<Vec<i64>>, mut exp: i64) -> Vec<Vec<i64>> {
        let size = base.len();
        let mut result = vec![vec![0i64; size]; size];
        for i in 0..size {
            result[i][i] = 1;
        }
        while exp > 0 {
            if exp & 1 != 0 {
                result = Self::mat_mul(&result, &base);
            }
            base = Self::mat_mul(&base, &base);
            exp >>= 1;
        }
        result
    }

    pub fn length_after_transformations(s: String, t: i32, nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut v = vec![0i64; 26];
        for b in s.bytes() {
            v[(b - b'a') as usize] += 1;
        }

        // transition[i][j] = 1 if character j produces character i.
        let mut transition = vec![vec![0i64; 26]; 26];
        for j in 0..26 {
            for a in 1..=nums[j] as usize {
                transition[(j + a) % 26][j] = 1;
            }
        }

        let powered = Self::mat_pow(transition, t as i64);
        let mut total: i64 = 0;
        for i in 0..26 {
            let mut si: i64 = 0;
            for j in 0..26 {
                si = (si + powered[i][j] * v[j] % MOD) % MOD;
            }
            total = (total + si) % MOD;
        }
        total as i32
    }
}

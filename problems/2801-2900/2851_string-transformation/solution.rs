impl Solution {
    pub fn number_of_ways(s: String, t: String, k: i64) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = s.len() as i64;
        let sb = s.as_bytes();
        let tb = t.as_bytes();
        let cnt = Self::count_rotations(sb, tb);

        // Aggregate rotations into two classes: cnt that spell t and n - cnt
        // that do not. From a T rotation one operation lands on cnt - 1
        // others (the identity shift is forbidden) or n - cnt non-T; from a
        // non-T it lands on cnt T or n - 1 - cnt non-T. Length-k walk
        // counts depend only on the starting class, hence this 2x2 matrix.
        let mat = [
            [Self::norm(cnt - 1, MOD), Self::norm(cnt, MOD)],
            [Self::norm(n - cnt, MOD), Self::norm(n - 1 - cnt, MOD)],
        ];
        // k reaches 1e15, so exponentiate by repeated squaring: O(log k)
        // constant-size multiplications under the modulus.
        let mk = Self::mat_pow(mat, k, MOD);
        // Start on the class-T rotation iff s == t; the answer is the
        // class-T component (automatically 0 when cnt = 0).
        let v0: i64 = if s == t { 1 } else { 0 };
        let v1 = 1 - v0;
        ((mk[0][0] * v0 + mk[0][1] * v1) % MOD) as i32
    }

    fn norm(x: i64, m: i64) -> i64 {
        let r = x % m;
        if r < 0 {
            r + m
        } else {
            r
        }
    }

    fn count_rotations(s: &[u8], t: &[u8]) -> i64 {
        // Every operation rotates s by a nonzero shift, so s is always one
        // of its n rotations. Count those equal to t by searching t in s+s
        // truncated to 2n-1 characters (dropping the last so the
        // full-string rotation is not double counted).
        let n = s.len();
        let mut pi = vec![0usize; n];
        for i in 1..n {
            let mut j = pi[i - 1];
            while j > 0 && t[i] != t[j] {
                j = pi[j - 1];
            }
            if t[i] == t[j] {
                j += 1;
            }
            pi[i] = j;
        }
        let mut cnt: i64 = 0;
        let mut j = 0usize;
        for i in 0..2 * n - 1 {
            let c = s[i % n];
            while j > 0 && c != t[j] {
                j = pi[j - 1];
            }
            if c == t[j] {
                j += 1;
            }
            if j == n {
                cnt += 1;
                j = pi[j - 1];
            }
        }
        cnt
    }

    fn mat_mul(a: [[i64; 2]; 2], b: [[i64; 2]; 2], m: i64) -> [[i64; 2]; 2] {
        let mut out = [[0i64; 2]; 2];
        for i in 0..2 {
            for j in 0..2 {
                out[i][j] = (a[i][0] * b[0][j] + a[i][1] * b[1][j]) % m;
            }
        }
        out
    }

    fn mat_pow(mut m: [[i64; 2]; 2], mut p: i64, m_od: i64) -> [[i64; 2]; 2] {
        let mut r = [[1i64, 0], [0, 1i64]];
        while p > 0 {
            if p & 1 == 1 {
                r = Self::mat_mul(r, m, m_od);
            }
            m = Self::mat_mul(m, m, m_od);
            p >>= 1;
        }
        r
    }
}

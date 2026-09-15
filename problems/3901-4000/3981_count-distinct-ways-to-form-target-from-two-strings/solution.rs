impl Solution {
    pub fn interleave_characters(a: String, b: String, t: String) -> i32 {
        const M: i64 = 1_000_000_007;
        let (a, b, t) = (a.as_bytes(), b.as_bytes(), t.as_bytes());
        let (n, m) = (a.len(), b.len());
        let mut d = vec![vec![0i64; m + 1]; n + 1];
        d[0][0] = 1;
        for &ch in t {
            let mut e = vec![vec![0i64; m + 1]; n + 1];
            for j in 0..=m {
                let mut run = 0;
                for i in 0..=n {
                    run = (run + d[i][j]) % M;
                    if i < n && a[i] == ch {
                        e[i + 1][j] = (e[i + 1][j] + run) % M
                    }
                }
            }
            for i in 0..=n {
                let mut run = 0;
                for j in 0..=m {
                    run = (run + d[i][j]) % M;
                    if j < m && b[j] == ch {
                        e[i][j + 1] = (e[i][j + 1] + run) % M
                    }
                }
            }
            d = e
        }
        let z = d.iter().flatten().fold(0, |s, &x| (s + x) % M);
        let sub = |w: &[u8]| {
            let mut x = vec![0i64; t.len() + 1];
            x[0] = 1;
            for &c in w {
                for j in (0..t.len()).rev() {
                    if t[j] == c {
                        x[j + 1] = (x[j + 1] + x[j]) % M
                    }
                }
            }
            x[t.len()]
        };
        ((z - sub(a) - sub(b) + 2 * M) % M) as i32
    }
}

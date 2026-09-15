impl Solution {
    pub fn zig_zag_arrays(n: i32, l: i32, r: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let m = (r - l + 1) as usize;
        // Reflecting the range (x -> l + r - x) swaps "next step must rise"
        // with "must fall" while fixing the all-ones start, so the falling
        // block always mirrors the rising one and one block evolves alone:
        // by the matrix S with S[w][u] = 1 exactly when u + w <= m - 2.
        let mut s: Vec<Vec<i64>> = vec![vec![0; m]; m];
        for w in 0..m {
            for u in 0..m {
                if u + w + 2 <= m {
                    s[w][u] = 1;
                }
            }
        }
        let mut v: Vec<i64> = vec![1; m];
        let mut k = n as i64 - 1;
        while k > 0 {
            if k & 1 == 1 {
                let mut nv: Vec<i64> = vec![0; m];
                for i in 0..m {
                    // A residue product stays under 2^60, so reduce every
                    // eight additions to keep the accumulator inside i64.
                    let mut acc: i64 = 0;
                    let mut t = 0;
                    for j in 0..m {
                        acc += s[i][j] * v[j];
                        t += 1;
                        if t == 8 {
                            acc %= MOD;
                            t = 0;
                        }
                    }
                    nv[i] = acc % MOD;
                }
                v = nv;
            }
            k >>= 1;
            if k > 0 {
                // S[w][u] depends only on w + u, so S is symmetric and stays
                // symmetric under powers: square it as its Gram matrix, one
                // triangle at a time.
                let mut g: Vec<Vec<i64>> = vec![vec![0; m]; m];
                for i in 0..m {
                    for j in i..m {
                        let mut acc: i64 = 0;
                        let mut t = 0;
                        for q in 0..m {
                            acc += s[i][q] * s[j][q];
                            t += 1;
                            if t == 8 {
                                acc %= MOD;
                                t = 0;
                            }
                        }
                        g[i][j] = acc % MOD;
                        g[j][i] = g[i][j];
                    }
                }
                s = g;
            }
        }
        // The mirrored block doubles the surviving block's mass.
        let total: i64 = v.iter().sum();
        ((2 * total) % MOD) as i32
    }
}

impl Solution {
    pub fn color_the_grid(m: i32, n: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let m = m as usize;
        let n = n as i64;

        // Enumerate all valid column colorings (adjacent rows differ).
        let total = 3usize.pow(m as u32);
        let mut states: Vec<Vec<u8>> = Vec::new();
        for code in 0..total {
            let mut col = vec![0u8; m];
            let mut c = code;
            for r in 0..m {
                col[r] = (c % 3) as u8;
                c /= 3;
            }
            if (0..m.saturating_sub(1)).all(|r| col[r] != col[r + 1]) {
                states.push(col);
            }
        }

        let len = states.len();
        // Two columns may be adjacent exactly when they differ in every row;
        // precompute that compatibility table once.
        let mut compat: Vec<Vec<usize>> = vec![Vec::new(); len];
        for i in 0..len {
            for j in 0..len {
                if (0..m).all(|r| states[i][r] != states[j][r]) {
                    compat[i].push(j);
                }
            }
        }

        // All ones: the first column can take any valid coloring (this also
        // makes n=1 fall out with the loop body never running).
        let mut cur = vec![1i64; len];
        for _ in 0..(n - 1) {
            let mut nxt = vec![0i64; len];
            for i in 0..len {
                if cur[i] != 0 {
                    // skip zero-count states (constant-factor saving)
                    for &j in &compat[i] {
                        nxt[j] = (nxt[j] + cur[i]) % MOD;
                    }
                }
            }
            cur = nxt;
        }
        // The last column may end in any state, so sum the whole vector.
        let mut ans: i64 = 0;
        for c in cur {
            ans = (ans + c) % MOD;
        }
        ans as i32
    }
}

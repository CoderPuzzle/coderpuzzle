impl Solution {
    const MOD: i64 = 1_000_000_007;
    const NEG: i64 = -1_000_000_000_000_000_000;

    // res[c] = max over x subset of c of a[x] + b[c^x]
    fn subset_convolve(a: &[i64; 1024], b: &[i64; 1024], res: &mut [i64; 1024]) {
        for c in 0..1024usize {
            let mut best = Self::NEG;
            let mut x = c;
            loop {
                let y = c ^ x;
                let v = a[x] + b[y];
                if v > best {
                    best = v;
                }
                if x == 0 {
                    break;
                }
                x = (x - 1) & c;
            }
            res[c] = best;
        }
    }

    pub fn good_subtree_sum(vals: Vec<i32>, par: Vec<i32>) -> i32 {
        let n = vals.len();
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        for i in 1..n {
            children[par[i] as usize].push(i);
        }

        let mut umask = vec![0usize; n];
        let mut selectable = vec![false; n];
        for i in 0..n {
            let s = vals[i].to_string();
            let mut mask = 0usize;
            let mut seen = [false; 10];
            let mut distinct = true;
            for ch in s.bytes() {
                let d = (ch - b'0') as usize;
                if seen[d] {
                    distinct = false;
                }
                seen[d] = true;
                mask |= 1 << d;
            }
            umask[i] = mask;
            selectable[i] = distinct;
        }

        // post-order
        let mut order: Vec<usize> = Vec::with_capacity(n);
        let mut stack: Vec<usize> = vec![0];
        while let Some(u) = stack.pop() {
            order.push(u);
            for &v in &children[u] {
                stack.push(v);
            }
        }

        let mut dp: Vec<[i64; 1024]> = vec![[Self::NEG; 1024]; n];
        let mut total: i64 = 0;
        let mut comb = [Self::NEG; 1024];
        let mut tmp = [Self::NEG; 1024];
        for idx in (0..n).rev() {
            let u = order[idx];
            comb = [Self::NEG; 1024];
            comb[0] = 0;
            for &c in &children[u] {
                Self::subset_convolve(&comb, &dp[c], &mut tmp);
                std::mem::swap(&mut comb, &mut tmp);
            }

            let mut du = comb;
            if selectable[u] {
                let mu = umask[u];
                for mask in 0..1024usize {
                    if mask & mu == mu {
                        let rest = mask ^ mu;
                        if comb[rest] != Self::NEG {
                            let val = comb[rest] + vals[u] as i64;
                            if val > du[mask] {
                                du[mask] = val;
                            }
                        }
                    }
                }
            }
            let mut best = du[0];
            for m in 1..1024usize {
                if du[m] > best {
                    best = du[m];
                }
            }
            total += best;
            dp[u] = du;
        }
        (total % Self::MOD) as i32
    }
}

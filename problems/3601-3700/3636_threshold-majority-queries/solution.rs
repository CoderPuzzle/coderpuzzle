impl Solution {
    pub fn subarray_majority(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let n = nums.len();
        // Rank-compress: "smallest value" becomes "smallest rank".
        let mut values = nums.clone();
        values.sort();
        values.dedup();
        let m = values.len();
        let a: Vec<usize> = nums
            .iter()
            .map(|value| values.partition_point(|candidate| candidate < value))
            .collect();
        // occ[x] lists the sorted positions of rank x, so any range frequency
        // is two binary searches.
        let mut occ: Vec<Vec<usize>> = vec![Vec::new(); m];
        for (pos, &x) in a.iter().enumerate() {
            occ[x].push(pos);
        }

        // Block size balancing the block-pair sweep against query fringes.
        let b = (n / isqrt(queries.len())).max(1);
        let k = (n + b - 1) / b;
        // top_f[i*k+j] / top_v[i*k+j]: highest frequency inside blocks i..j
        // and the smallest rank attaining it. One sweep per left block grows
        // the window additions-only, so counts never decrease and the mode
        // pair stays O(1) per element.
        let mut top_f = vec![0usize; k * k];
        let mut top_v = vec![0usize; k * k];
        let mut cnt = vec![0usize; m];
        for i in 0..k {
            cnt.fill(0);
            let (mut mf, mut mv, mut pos) = (0usize, 0usize, i * b);
            for j in i..k {
                let end = ((j + 1) * b).min(n);
                while pos < end {
                    let x = a[pos];
                    cnt[x] += 1;
                    let c = cnt[x];
                    if c > mf {
                        mf = c;
                        mv = x;
                    } else if c == mf && x < mv {
                        mv = x;
                    }
                    pos += 1;
                }
                top_f[i * k + j] = mf;
                top_v[i * k + j] = mv;
            }
        }

        // The overall top element clears any threshold exactly when something
        // does, so every answer is that element's pair checked once.
        let mut stamp = vec![0usize; m];
        let mut freq = vec![0usize; m];
        let mut seen: Vec<usize> = Vec::with_capacity(2 * b + 2);
        let mut token = 0usize;
        let mut out = Vec::with_capacity(queries.len());
        for query in &queries {
            let l = query[0] as usize;
            let r = query[1] as usize;
            let t = query[2] as usize;
            let (bl, br) = (l / b, r / b);
            token += 1;
            let mut bf;
            let mut bv;
            if br - bl <= 1 {
                // Range spans at most two blocks: count it directly.
                bf = 0;
                bv = 0;
                for pos in l..=r {
                    let x = a[pos];
                    if stamp[x] != token {
                        stamp[x] = token;
                        freq[x] = 1;
                    } else {
                        freq[x] += 1;
                    }
                    let c = freq[x];
                    if c > bf {
                        bf = c;
                        bv = x;
                    } else if c == bf && x < bv {
                        bv = x;
                    }
                }
            } else {
                // Whole blocks give the base candidate; every distinct fringe
                // rank gets its exact range frequency from two binary searches
                // (its total count also spans the middle blocks, so fringe
                // counts alone can never prune it).
                let idx = (bl + 1) * k + br - 1;
                bf = top_f[idx];
                bv = top_v[idx];
                seen.clear();
                for pos in l..(bl + 1) * b {
                    let x = a[pos];
                    if stamp[x] != token {
                        stamp[x] = token;
                        seen.push(x);
                    }
                }
                for pos in br * b..=r {
                    let x = a[pos];
                    if stamp[x] != token {
                        stamp[x] = token;
                        seen.push(x);
                    }
                }
                for &x in &seen {
                    let list = &occ[x];
                    let f = list.partition_point(|&p| p <= r) - list.partition_point(|&p| p < l);
                    if f > bf || (f == bf && x < bv) {
                        bf = f;
                        bv = x;
                    }
                }
            }
            if bf >= t {
                out.push(values[bv]);
            } else {
                out.push(-1);
            }
        }
        out
    }
}

fn isqrt(q: usize) -> usize {
    let mut s = (q as f64).sqrt() as usize;
    while s * s > q {
        s -= 1;
    }
    while (s + 1) * (s + 1) <= q {
        s += 1;
    }
    s
}

impl Solution {
    // An optimal plan serves each group of targets with a single element
    // (a multiple of the group's lcm), so it uses at most m elements in
    // total, and an exchange argument keeps every group's element among
    // the m cheapest servants of that group — the dp below only sweeps
    // those few candidates. Subsets whose lcm exceeds CAP are skipped:
    // serving such a subset with one element costs more than serving its
    // targets separately ever can, and the lcm fold stays below 10^9.
    pub fn minimum_increments(nums: Vec<i32>, target: Vec<i32>) -> i32 {
        let n = nums.len();
        let m = target.len();
        let full = (1usize << m) - 1;
        const CAP: i64 = 100_000;
        const INF: i64 = i64::MAX / 4;
        let mut lcms = vec![1i64; full + 1];
        for mask in 1..=full {
            let low = mask & mask.wrapping_neg();
            let mut l = lcms[mask ^ low];
            let t = target[low.trailing_zeros() as usize] as i64;
            l = l / Self::gcd(l, t) * t;
            lcms[mask] = if l <= CAP { l } else { 0 };
        }
        let mut cand = vec![false; n];
        for sub in 1..=full {
            let l = lcms[sub];
            if l == 0 {
                continue;
            }
            let mut best_cost = vec![INF; m];
            let mut best_idx = vec![-1i32; m];
            for (i, &x) in nums.iter().enumerate() {
                let x = x as i64;
                let cost = (l - x % l) % l;
                if cost >= best_cost[m - 1] {
                    continue;
                }
                let mut r = m - 1;
                while r > 0 && best_cost[r - 1] > cost {
                    best_cost[r] = best_cost[r - 1];
                    best_idx[r] = best_idx[r - 1];
                    r -= 1;
                }
                best_cost[r] = cost;
                best_idx[r] = i as i32;
            }
            for &idx in &best_idx {
                if idx >= 0 {
                    cand[idx as usize] = true;
                }
            }
        }
        let mut dp = vec![INF; full + 1];
        let mut ndp = vec![INF; full + 1];
        dp[0] = 0;
        for (i, &x) in nums.iter().enumerate() {
            if !cand[i] {
                continue;
            }
            let x = x as i64;
            ndp.copy_from_slice(&dp);
            for mask in 0..=full {
                let base = dp[mask];
                if base >= INF {
                    continue;
                }
                let comp = full ^ mask;
                let mut sub = comp;
                while sub != 0 {
                    let l = lcms[sub];
                    if l != 0 {
                        let cand_cost = base + (l - x % l) % l;
                        let nm = mask | sub;
                        if cand_cost < ndp[nm] {
                            ndp[nm] = cand_cost;
                        }
                    }
                    sub = (sub - 1) & comp;
                }
            }
            std::mem::swap(&mut dp, &mut ndp);
        }
        dp[full] as i32
    }

    fn gcd(mut a: i64, mut b: i64) -> i64 {
        while b != 0 {
            let t = a % b;
            a = b;
            b = t;
        }
        a
    }
}

impl Solution {
    pub fn maximum_tastiness(price: Vec<i32>, k: i32) -> i32 {
        // In a sorted selection the minimum pairwise gap always occurs between
        // adjacent picks, so sorting once reduces the problem to chain gaps.
        let mut p = price;
        p.sort_unstable();
        let n = p.len();
        let feasible = |x: i32| -> bool {
            // Leftmost greedy: take the first candy, then each candy at least x
            // above the last taken one. Postponing a pick can only shrink the
            // room for later picks, so this maximizes how many candies fit.
            let mut count = 1i64;
            let mut last = p[0];
            for i in 1..n {
                if p[i] - last >= x {
                    count += 1;
                    last = p[i];
                }
            }
            count >= k as i64
        };
        // "Every gap >= x is achievable" is monotone in x, so binary search
        // the largest feasible x over [0, max-min]; the upper-mid +1 keeps
        // lo = mid from stalling. Identical prices converge to lo = 0.
        let (mut lo, mut hi) = (0i32, p[n - 1] - p[0]);
        while lo < hi {
            let mid = lo + (hi - lo + 1) / 2;
            if feasible(mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo
    }
}

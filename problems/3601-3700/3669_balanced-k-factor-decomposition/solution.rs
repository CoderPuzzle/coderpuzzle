impl Solution {
    pub fn min_difference(n: i32, k: i32) -> Vec<i32> {
        // Trial division up to sqrt(n) gathers each divisor pair (d, n / d);
        // sorted ascending, they are the only values a decomposition can use.
        let big = n as i64;
        let mut divs: Vec<i32> = Vec::new();
        let mut d: i64 = 1;
        while d * d <= big {
            if big % d == 0 {
                divs.push(d as i32);
                if d * d != big {
                    divs.push((big / d) as i32);
                }
            }
            d += 1;
        }
        divs.sort();

        // Building factors in nondecreasing order makes the search visit
        // complete splits in lexicographic order, so replacing the best only
        // on a strictly smaller spread pins the lexicographically smallest
        // optimal split.
        let mut best: Vec<i32> = Vec::new();
        let mut path: Vec<i32> = Vec::with_capacity(k as usize);
        Self::dfs(&divs, &mut best, &mut path, n, k, 0, 1);
        best
    }

    fn dfs(divs: &[i32], best: &mut Vec<i32>, path: &mut Vec<i32>, n: i32, slots: i32, start: usize, prod: i64) {
        if slots == 1 {
            // The last factor is forced to carry the product up to n; it
            // completes a nondecreasing split exactly when it reaches the
            // last pick. Both ends of the spread then sit on the path.
            let last = (n as i64 / prod) as i32;
            if prod * last as i64 == n as i64 && (path.is_empty() || last >= path[path.len() - 1]) {
                let spread = if path.is_empty() {
                    0i64
                } else {
                    last as i64 - path[0] as i64
                };
                let seen = if best.is_empty() {
                    i64::MAX
                } else {
                    best[best.len() - 1] as i64 - best[0] as i64
                };
                if spread < seen {
                    *best = path.clone();
                    best.push(last);
                }
            }
            return;
        }
        let mut i = start;
        while i < divs.len() {
            let dv = divs[i];
            if dv as i64 * prod > n as i64 {
                break;
            }
            path.push(dv);
            Self::dfs(divs, best, path, n, slots - 1, i, prod * dv as i64);
            path.pop();
            i += 1;
        }
    }
}

impl Solution {
    pub fn min_max_weight(n: i32, edges: Vec<Vec<i32>>, threshold: i32) -> i32 {
        let n = n as usize;
        // Invert: "0 reachable from all" becomes "0 reaches all" in rev.
        let mut adj: Vec<Vec<(usize, i32)>> = vec![Vec::new(); n];
        let mut maxw = 0i32;
        for e in &edges {
            adj[e[1] as usize].push((e[0] as usize, e[2]));
            if e[2] > maxw {
                maxw = e[2];
            }
        }

        let mut seen = vec![false; n];
        let mut stack: Vec<usize> = Vec::with_capacity(n);
        let mut reachable = |limit: i32, seen: &mut Vec<bool>, stack: &mut Vec<usize>| -> bool {
            for s in seen.iter_mut() {
                *s = false;
            }
            seen[0] = true;
            stack.clear();
            stack.push(0);
            let mut count = 1usize;
            while let Some(x) = stack.pop() {
                for &(nxt, w) in &adj[x] {
                    if !seen[nxt] && w <= limit {
                        seen[nxt] = true;
                        count += 1;
                        stack.push(nxt);
                    }
                }
            }
            count == n
        };

        if !reachable(maxw, &mut seen, &mut stack) {
            return -1;
        }
        let (mut lo, mut hi) = (0i32, maxw);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if reachable(mid, &mut seen, &mut stack) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}

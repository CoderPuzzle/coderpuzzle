impl Solution {
    pub fn minimum_score(nums: Vec<i32>, edges: Vec<Vec<i32>>) -> i32 {
        let n = nums.len();
        let mut adj: Vec<Vec<i32>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0];
            let b = e[1];
            adj[a as usize].push(b);
            adj[b as usize].push(a);
        }

        // Iterative DFS from node 0 with an explicit stack: tin/tout record
        // each subtree as the half-open interval [tin[u], tout[u]) of entry
        // stamps, so the ancestor test is a plain range check. Popping the
        // !u marker is the post-order moment -- fold sub[u] into its parent
        // there, after every descendant has already contributed.
        let mut tin = vec![0usize; n];
        let mut tout = vec![0usize; n];
        let mut parent = vec![-1i32; n];
        let mut sub = nums.clone();
        let mut timer = 0usize;
        let mut stack: Vec<i32> = vec![0];
        while let Some(u) = stack.pop() {
            if u >= 0 {
                let un = u as usize;
                tin[un] = timer;
                timer += 1;
                stack.push(!u);
                let pu = parent[un];
                for &v in &adj[un] {
                    if v != pu {
                        parent[v as usize] = un as i32;
                        stack.push(v);
                    }
                }
            } else {
                let un = (!u) as usize;
                tout[un] = timer;
                let p = parent[un];
                if p >= 0 {
                    sub[p as usize] ^= sub[un];
                }
            }
        }

        // Every edge is its child endpoint, so the pairs below run over all
        // ways to remove two edges. The three cases are exhaustive and
        // mutually exclusive, and in each the third component's XOR is
        // recovered from the other two. Values are at most 10^8 (< 2^27),
        // so every XOR and every score difference fits an i32.
        let total = sub[0];
        let mut best = i32::MAX;
        for x in 1..n {
            let sx = sub[x];
            let (tx, ex) = (tin[x], tout[x]);
            let tpx = total ^ sx;
            for y in x + 1..n {
                let sy = sub[y];
                let ty = tin[y];
                let (a, b, c) = if tx <= ty && ty < ex {
                    // x is an ancestor of y
                    (sy, sx ^ sy, tpx)
                } else if ty <= tx && tx < tout[y] {
                    // y is an ancestor of x
                    (sx, sx ^ sy, total ^ sy)
                } else {
                    // disjoint subtrees
                    (sx, sy, tpx ^ sy)
                };
                let (mut lo, mut hi) = if a < b { (a, b) } else { (b, a) };
                if c < lo {
                    lo = c;
                } else if c > hi {
                    hi = c;
                }
                best = best.min(hi - lo);
            }
        }
        best
    }
}

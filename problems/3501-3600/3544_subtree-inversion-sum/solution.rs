impl Solution {
    pub fn subtree_inversion_sum(edges: Vec<Vec<i32>>, nums: Vec<i32>, k: i32) -> i64 {
        let n = nums.len();
        let k = k as usize;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let (u, v) = (e[0] as usize, e[1] as usize);
            adj[u].push(v);
            adj[v].push(u);
        }

        // BFS from the root records each parent and an order whose reversal
        // lists children before parents, so the DP below needs no recursion.
        let mut parent: Vec<i64> = vec![-1; n];
        parent[0] = -2;
        let mut order: Vec<usize> = Vec::with_capacity(n);
        order.push(0);
        let mut i = 0;
        while i < order.len() {
            let u = order[i];
            i += 1;
            for &v in &adj[u] {
                if v as i64 != parent[u] {
                    parent[v] = u as i64;
                    order.push(v);
                }
            }
        }

        // dp[u][flip][d]: best subtree sum of u given the parity of sign flips
        // applied from ancestors and the edge distance d to the nearest inverted
        // ancestor, capped at k since any larger distance behaves identically.
        let width = k + 1;
        // dp[u][flip][dist]
        let mut dp: Vec<Vec<Vec<i64>>> = vec![Vec::new(); n];
        for idx in (0..n).rev() {
            let u = order[idx];
            // Children are already computed; pool their tables per (flip, distance).
            let mut child_sum = vec![vec![0i64; width]; 2];
            for &v in &adj[u] {
                if v as i64 == parent[u] {
                    continue;
                }
                let cv = &dp[v];
                for flip in 0..2 {
                    for d in 0..width {
                        child_sum[flip][d] += cv[flip][d];
                    }
                }
            }

            // Not inverting: children observe distance+1 (capped at k). Once the
            // distance is >= k, inverting u is legal too: it flips the parity and
            // resets the child distance to 1; keep the better of the two options.
            let mut table = vec![vec![0i64; width]; 2];
            for flip in 0..2 {
                let s: i64 = if flip == 0 { 1 } else { -1 };
                let base_dont = nums[u] as i64 * s;
                let base_inv = -(nums[u] as i64) * s;
                let dont_row = &child_sum[flip];
                let inv_row = &child_sum[flip ^ 1];
                for dist in 0..width {
                    let dd = if dist < k { dist + 1 } else { k };
                    let val_dont = base_dont + dont_row[dd];
                    if dist >= k {
                        let val_inv = base_inv + inv_row[1];
                        table[flip][dist] = if val_dont > val_inv { val_dont } else { val_inv };
                    } else {
                        table[flip][dist] = val_dont;
                    }
                }
            }
            dp[u] = table;
        }
        // The root has no recent inversion above it, so it is free to invert.
        dp[0][0][k]
    }
}

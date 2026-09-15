impl Solution {
    pub fn placed_coins(edges: Vec<Vec<i32>>, cost: Vec<i32>) -> Vec<i64> {
        // Per subtree keep the three largest and the two smallest cost
        // values: the maximum product of three distinct nodes is either the
        // three largest or the two smallest times the largest. Subtrees can
        // be one long chain (n up to 2 * 10^4), so the traversal collects
        // parents by BFS and merges children in reverse BFS order.
        let n = cost.len();
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for edge in &edges {
            let (u, v) = (edge[0] as usize, edge[1] as usize);
            adj[u].push(v);
            adj[v].push(u);
        }

        let mut parent = vec![-1i64; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        order.push(0);
        let mut head = 0;
        while head < order.len() {
            let u = order[head];
            head += 1;
            for &v in &adj[u] {
                if v as i64 != parent[u] {
                    parent[v] = u as i64;
                    order.push(v);
                }
            }
        }

        let mut ans = vec![0i64; n];
        let mut size = vec![1usize; n];
        // Up to 3 largest / 2 smallest, padded with sentinels that sort away
        // from the kept ends; slots only hold real values once the subtree
        // reaches the needed size.
        const BIG: i64 = 4_000_000_000_000_000_000;
        let mut top: Vec<Vec<i64>> = (0..n).map(|i| vec![cost[i] as i64, -BIG, -BIG]).collect();
        let mut bot: Vec<Vec<i64>> = (0..n).map(|i| vec![cost[i] as i64, BIG]).collect();
        for k in (0..n).rev() {
            let u = order[k];
            if size[u] < 3 {
                ans[u] = 1;
            } else {
                let t = &top[u];
                let b = &bot[u];
                let best = (t[0] * t[1] * t[2]).max(b[0] * b[1] * t[0]);
                ans[u] = if best > 0 { best } else { 0 };
            }
            let p = parent[u];
            if p >= 0 {
                let p = p as usize;
                size[p] += size[u];
                let mut merged: Vec<i64> = top[p].iter().chain(top[u].iter()).copied().collect();
                merged.sort_unstable_by(|a, b| b.cmp(a));
                merged.truncate(3);
                top[p] = merged;
                let mut merged: Vec<i64> = bot[p].iter().chain(bot[u].iter()).copied().collect();
                merged.sort_unstable();
                merged.truncate(2);
                bot[p] = merged;
            }
        }
        ans
    }
}

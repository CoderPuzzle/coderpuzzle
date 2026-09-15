impl Solution {
    // A tree stays healthy exactly when every root-to-leaf path keeps at
    // least one un-taken node. dp[x] is the best score inside x's subtree
    // while every x-to-leaf path must still keep a node: keep x (its value
    // stays, so every descendant is free to take: the child subtree sums)
    // or take x and let each child subtree solve the same problem (dp of
    // the children). A leaf must keep itself, so its dp is 0. The answer
    // is dp[0]. n reaches 2 * 10^4 on path-shaped trees, so the two walks
    // run on explicit arrays, never on the call stack.
    pub fn maximum_score_after_operations(edges: Vec<Vec<i32>>, values: Vec<i32>) -> i64 {
        let n = values.len();
        let mut adj = vec![Vec::new(); n];
        for e in &edges {
            adj[e[0] as usize].push(e[1] as usize);
            adj[e[1] as usize].push(e[0] as usize);
        }
        // Iterative BFS from the root: fixes a parent for every node and an
        // order in which every parent precedes its children.
        let mut parent = vec![-1i32; n];
        let mut has_child = vec![false; n];
        let mut order = Vec::with_capacity(n);
        order.push(0);
        parent[0] = 0;
        let mut head = 0;
        while head < order.len() {
            let x = order[head];
            head += 1;
            for &y in &adj[x] {
                if parent[y] == -1 {
                    parent[y] = x as i32;
                    has_child[x] = true;
                    order.push(y);
                }
            }
        }
        // Reverse order visits children before parents; each finished node
        // hands its subtree sum and dp value up to its parent.
        let mut sub_sum = vec![0i64; n];
        let mut dp = vec![0i64; n];
        for i in (0..n).rev() {
            let x = order[i];
            let here = values[x] as i64 + sub_sum[x];
            if has_child[x] {
                dp[x] = (values[x] as i64 + dp[x]).max(here - values[x] as i64);
            }
            sub_sum[x] = here;
            if x != 0 {
                let p = parent[x] as usize;
                sub_sum[p] += here;
                dp[p] += dp[x];
            }
        }
        dp[0]
    }
}

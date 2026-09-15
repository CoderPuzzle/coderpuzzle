impl Solution {
    pub fn max_score(edges: Vec<Vec<i32>>) -> i64 {
        let n = edges.len();
        if n == 1 {
            return 0;
        }
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        for i in 1..n {
            children[edges[i][0] as usize].push(i);
        }
        // Iterative preorder; iterating it in reverse finalizes every child
        // before its parent, so no recursion (n can be 1e5, deep chains).
        let mut order: Vec<usize> = Vec::with_capacity(n);
        let mut stack: Vec<usize> = vec![0];
        while let Some(u) = stack.pop() {
            order.push(u);
            for &c in &children[u] {
                stack.push(c);
            }
        }
        // dp0[u]: parent edge not chosen; dp1[u]: chosen (its weight is
        // accounted by the parent, so dp1 only constrains u's own picks).
        let mut dp0 = vec![0i64; n];
        let mut dp1 = vec![0i64; n];
        for &u in order.iter().rev() {
            // base = take no child edge: sum of children in state 0.
            let mut base: i64 = 0;
            let mut best_gain: i64 = 0;
            for &c in &children[u] {
                let w = edges[c][1] as i64;
                base += dp0[c];
                // Switching c's edge on: child must drop its parent edge.
                let gain = dp1[c] + w - dp0[c];
                if gain > best_gain {
                    best_gain = gain;
                }
            }
            // u may take at most one child edge; only a positive gain is
            // applied, so negative-weight edges are never forced in.
            dp0[u] = base + best_gain;
            // Parent edge taken => no child edge allowed for u.
            dp1[u] = base;
        }
        dp0[0]
    }
}

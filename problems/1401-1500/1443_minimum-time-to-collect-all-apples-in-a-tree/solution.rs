impl Solution {
    pub fn min_time(n: i32, edges: Vec<Vec<i32>>, has_apple: Vec<bool>) -> i32 {
        let n = n as usize;
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        for edge in &edges {
            let a = edge[0] as usize;
            let b = edge[1] as usize;
            adjacency[a].push(b);
            adjacency[b].push(a);
        }

        // explicit-stack traversal from the root records parents plus a
        // discovery order — no recursion, safe for deep trees
        let mut parent = vec![0usize; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        let mut seen = vec![false; n];
        seen[0] = true;
        let mut stack: Vec<usize> = vec![0];
        while let Some(u) = stack.pop() {
            order.push(u);
            for &v in &adjacency[u] {
                if !seen[v] {
                    seen[v] = true;
                    parent[v] = u;
                    stack.push(v);
                }
            }
        }

        // reversed discovery order finishes every subtree before its parent,
        // so has[u] is true exactly when u or a descendant holds an apple;
        // each such used edge is walked down and back — hence the +2
        let mut has = has_apple;
        let mut time = 0i32;
        for &u in order.iter().rev() {
            if u == 0 {
                continue;
            }
            if has[u] {
                time += 2;
                // the parent must now be visited too — push the need upward
                has[parent[u]] = true;
            }
        }
        time
    }
}

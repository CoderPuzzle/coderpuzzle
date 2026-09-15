impl Solution {
    pub fn tree_diameter(edges: Vec<Vec<i32>>) -> i32 {
        // No edges: a single-node tree, diameter 0.
        if edges.is_empty() {
            return 0;
        }
        let n = edges.len() + 1;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        // Iterative DFS from root 0 with an explicit stack. Each node is
        // recorded as it is popped, and entered only from the neighbor it
        // came from, so `order` meets parents before children. The root's
        // parent is usize::MAX, which no node label equals.
        let mut parent = vec![usize::MAX; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        let mut stack = vec![0usize];
        while let Some(u) = stack.pop() {
            order.push(u);
            for &v in &adj[u] {
                if v != parent[u] {
                    parent[v] = u;
                    stack.push(v);
                }
            }
        }

        // Reversed, `order` is a bottom-up order: children settle before
        // parents. At each node the two deepest child heights combine:
        // their sum is the widest path turning there, the deeper one
        // alone is the node's own height for its parent.
        let mut height = vec![0usize; n];
        let mut diameter = 0usize;
        for &u in order.iter().rev() {
            let mut first = 0usize;
            let mut second = 0usize;
            for &v in &adj[u] {
                if v != parent[u] {
                    let child = height[v] + 1;
                    if child > first {
                        second = first;
                        first = child;
                    } else if child > second {
                        second = child;
                    }
                }
            }
            height[u] = first;
            if first + second > diameter {
                diameter = first + second;
            }
        }
        diameter as i32
    }
}

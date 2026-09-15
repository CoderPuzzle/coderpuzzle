impl Solution {
    pub fn count_good_nodes(edges: Vec<Vec<i32>>) -> i32 {
        let n = edges.len() + 1;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        // Breadth-first order from the root: parents are always recorded
        // before their children, so reading this vector backwards visits
        // every child before its parent -- an iterative post-order that
        // never touches the call stack.
        let mut order = vec![0usize; n];
        let mut parent = vec![usize::MAX; n];
        let mut visited = vec![false; n];
        visited[0] = true;
        let (mut head, mut tail) = (0usize, 1usize);
        while head < tail {
            let u = order[head];
            head += 1;
            for &v in &adj[u] {
                if !visited[v] {
                    visited[v] = true;
                    parent[v] = u;
                    order[tail] = v;
                    tail += 1;
                }
            }
        }

        // Reverse breadth-first order folds subtree sizes bottom-up: once
        // the fold reaches a node, every one of its descendants has
        // already been folded in, so size[i] ends as the number of nodes
        // in i's subtree.
        let mut size = vec![1i32; n];
        for idx in (1..n).rev() {
            let u = order[idx];
            size[parent[u]] += size[u];
        }

        // A node is good when its children's subtree sizes all agree.
        let mut is_good = vec![true; n];
        let mut seen_child = vec![false; n];
        let mut first_size = vec![0i32; n];
        for idx in 1..n {
            let v = order[idx];
            let p = parent[v];
            if !seen_child[p] {
                seen_child[p] = true;
                first_size[p] = size[v];
            } else if size[v] != first_size[p] {
                is_good[p] = false;
            }
        }

        is_good.iter().filter(|&&g| g).count() as i32
    }
}

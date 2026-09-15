impl Solution {
    pub fn maximum_subtree_size(edges: Vec<Vec<i32>>, colors: Vec<i32>) -> i32 {
        let n = colors.len();
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
        let mut parent = vec![-1i32; n];
        let mut visited = vec![false; n];
        visited[0] = true;
        let (mut head, mut tail) = (0usize, 1usize);
        while head < tail {
            let u = order[head];
            head += 1;
            for &v in &adj[u] {
                if !visited[v] {
                    visited[v] = true;
                    parent[v] = u as i32;
                    order[tail] = v;
                    tail += 1;
                }
            }
        }

        // mono[v] says every node in v's subtree so far shares v's color;
        // size[v] is how many nodes that monochrome run holds. A mixed
        // subtree poisons the parent outright; a clean one poisons it on
        // a color mismatch, otherwise it joins the parent's count.
        let mut mono = vec![true; n];
        let mut size = vec![1usize; n];
        let mut best = 1usize;

        // Reverse breadth-first order folds children into parents only
        // after every one of their own descendants has already folded in.
        for idx in (0..n).rev() {
            let u = order[idx];
            if mono[u] && size[u] > best {
                best = size[u];
            }
            if parent[u] != -1 {
                let p = parent[u] as usize;
                if !mono[u] || colors[u] != colors[p] {
                    mono[p] = false;
                } else {
                    size[p] += size[u];
                }
            }
        }
        best as i32
    }
}

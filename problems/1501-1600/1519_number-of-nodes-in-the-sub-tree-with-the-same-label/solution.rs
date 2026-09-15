impl Solution {
    pub fn count_sub_trees(n: i32, edges: Vec<Vec<i32>>, labels: String) -> Vec<i32> {
        let n = n as usize;
        let labels: Vec<u8> = labels.into_bytes();
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

        // counts[i] tallies, per letter, how many nodes folded into i's
        // subtree so far carry that letter.
        let mut counts = vec![[0i32; 26]; n];
        for i in 0..n {
            counts[i][(labels[i] - b'a') as usize] += 1;
        }

        // Reverse breadth-first order folds children into parents only
        // after every one of their own descendants has already folded in.
        for idx in (1..n).rev() {
            let u = order[idx];
            let p = parent[u];
            let cu = counts[u];
            for c in 0..26 {
                counts[p][c] += cu[c];
            }
        }

        (0..n).map(|i| counts[i][(labels[i] - b'a') as usize]).collect()
    }
}

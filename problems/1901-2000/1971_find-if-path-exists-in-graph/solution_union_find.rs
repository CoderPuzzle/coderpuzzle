impl Solution {
    pub fn valid_path(n: i32, edges: Vec<Vec<i32>>, source: i32, destination: i32) -> bool {
        // No graph is built and nothing is traversed: every edge simply
        // merges the components of its two endpoints, and afterwards a
        // route exists exactly when source and destination were pulled
        // into the same component -- that is, when they share a root.
        // Path-halving: splice every other node directly under its
        // grandparent, flattening the tree while walking to the root.
        fn find(parent: &mut [usize], mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }
        let n = n as usize;
        let mut parent: Vec<usize> = (0..n).collect();
        for edge in &edges {
            let ru = find(&mut parent, edge[0] as usize);
            let rv = find(&mut parent, edge[1] as usize);
            if ru != rv {
                parent[ru] = rv;
            }
        }
        find(&mut parent, source as usize) == find(&mut parent, destination as usize)
    }
}

impl Solution {
    pub fn is_bipartite(graph: Vec<Vec<i32>>) -> bool {
        let n = graph.len();
        let mut parent: Vec<usize> = (0..n).collect();
        let g: Vec<Vec<usize>> = graph
            .iter()
            .map(|row| row.iter().map(|&x| x as usize).collect())
            .collect();

        fn find(parent: &mut Vec<usize>, node: usize) -> usize {
            let mut root = node;
            while parent[root] != root {
                root = parent[root];
            }
            // Second walk repoints every visited node at the root (path
            // compression), flattening the structure for later finds.
            let mut node = node;
            while parent[node] != root {
                let next = parent[node];
                parent[node] = root;
                node = next;
            }
            root
        }

        // Bipartite means the nodes split into two groups with every edge
        // crossing between them, so all of a node's neighbors must be able
        // to share the one opposite group.
        for u in 0..n {
            for &v in g[u].iter().skip(1) {
                // Union u's enemies together: they all belong to one set.
                let ra = find(&mut parent, g[u][0]);
                let rb = find(&mut parent, v);
                parent[ra] = rb;
            }
        }
        // A node sharing a set with one of its own enemies sits inside an
        // odd cycle: not bipartite.
        for u in 0..n {
            for &v in &g[u] {
                if find(&mut parent, u) == find(&mut parent, v) {
                    return false;
                }
            }
        }
        true
    }
}

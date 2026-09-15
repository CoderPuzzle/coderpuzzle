impl Solution {
    pub fn valid_tree(n: i32, edges: Vec<Vec<i32>>) -> bool {
        let n = n as usize;
        // A tree needs exactly n - 1 edges: fewer cannot connect n nodes,
        // more cannot stay acyclic — any other count fails immediately.
        if edges.len() != n.wrapping_sub(1) {
            return false;
        }
        // Union-Find over the nodes, each starting as its own component.
        let mut parent: Vec<usize> = (0..n).collect();
        for e in &edges {
            let ra = find(&mut parent, e[0] as usize);
            let rb = find(&mut parent, e[1] as usize);
            // Same root: the edge joins two nodes already in one
            // component — it closes a cycle.
            if ra == rb {
                return false;
            }
            // Distinct roots: merge the two components.
            parent[ra] = rb;
        }
        // All n - 1 edges merged distinct components: connected and
        // acyclic, hence tree-shaped.
        true
    }
}

// Path halving: point each visited node at its grandparent on the way
// up, short-circuiting future traversals.
fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
    while parent[x] != x {
        parent[x] = parent[parent[x]];
        x = parent[x];
    }
    x
}

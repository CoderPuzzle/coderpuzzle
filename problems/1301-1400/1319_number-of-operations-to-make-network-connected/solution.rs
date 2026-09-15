impl Solution {
    pub fn make_connected(n: i32, connections: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        // Connecting n computers needs at least n-1 cables; with fewer the
        // task is impossible no matter how cables are rearranged.
        if connections.len() + 1 < n {
            return -1;
        }
        let mut parent: Vec<usize> = (0..n).collect();
        // Count components: every union between two different roots merges
        // two components; a cable whose endpoints already share a root is
        // redundant (the spare cable the counting argument relies on).
        let mut components = n as i32;
        for c in &connections {
            let ra = find(&mut parent, c[0] as usize);
            let rb = find(&mut parent, c[1] as usize);
            if ra != rb {
                parent[ra] = rb;
                components -= 1;
            }
        }
        // Each move links two components, so the minimum is components - 1.
        components - 1
    }
}

fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
    // Union-find with path halving: point each node at its
    // grandparent while climbing toward the root.
    while parent[x] != x {
        parent[x] = parent[parent[x]];
        x = parent[x];
    }
    x
}

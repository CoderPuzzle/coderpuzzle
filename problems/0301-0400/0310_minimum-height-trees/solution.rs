impl Solution {
    pub fn find_min_height_trees(n: i32, edges: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        // A one- or two-node tree is its own center; the general loop would
        // also mishandle two nodes that are each other's leaves.
        if n <= 2 {
            return (0..n as i32).collect();
        }
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut degree = vec![0i32; n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adjacency[a].push(b);
            adjacency[b].push(a);
            degree[a] += 1;
            degree[b] += 1;
        }
        let mut leaves: Vec<usize> = (0..n).filter(|&i| degree[i] == 1).collect();
        let mut remaining = n;
        // Peel the tree from the outside in, topological-sort style: delete
        // all current leaves at once, each layer shortening every longest
        // root-to-leaf distance of the remaining core. The MHT root is the
        // middle of the diameter path: one node when the diameter has an
        // even edge count, two adjacent middles when odd.
        while remaining > 2 {
            // Peel exactly this round's layer, collecting the leaves it
            // exposes for the next round.
            let mut next: Vec<usize> = Vec::new();
            for &leaf in &leaves {
                remaining -= 1;
                // The popped leaf's own degree is never zeroed; a popped
                // node is not examined again, so it is harmless.
                for &neighbor in &adjacency[leaf] {
                    degree[neighbor] -= 1;
                    if degree[neighbor] == 1 {
                        next.push(neighbor);
                    }
                }
            }
            leaves = next;
        }
        // The one or two survivors are the centroids (MHT roots).
        let mut result: Vec<i32> = leaves.into_iter().map(|v| v as i32).collect();
        result.sort_unstable();
        result
    }
}

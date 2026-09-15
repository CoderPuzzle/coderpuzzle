use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn find_redundant_connection(edges: Vec<Vec<i32>>) -> Vec<i32> {
        let mut adj: HashMap<i32, Vec<i32>> = HashMap::new();

        fn connected(adj: &HashMap<i32, Vec<i32>>, a: i32, b: i32) -> bool {
            let mut stack = vec![a];
            let mut seen: HashSet<i32> = HashSet::new();
            seen.insert(a);
            // The stack explores depth-first and marks nodes on push, so
            // each node enters it at most once per probe.
            while let Some(u) = stack.pop() {
                if u == b {
                    return true;
                }
                if let Some(neighbors) = adj.get(&u) {
                    for &v in neighbors {
                        if seen.insert(v) {
                            stack.push(v);
                        }
                    }
                }
            }
            false
        }

        // A tree plus one extra edge has exactly one cycle; the first edge
        // that closes it is the one to remove.
        for edge in &edges {
            let (a, b) = (edge[0], edge[1]);
            // Probe before inserting: if b is already reachable from a
            // through the edges added so far, this edge closes the cycle.
            if connected(&adj, a, b) {
                return vec![a, b];
            }
            // A safe edge joins two previously separate parts: register it
            // in both directions and keep scanning.
            adj.entry(a).or_insert_with(Vec::new).push(b);
            adj.entry(b).or_insert_with(Vec::new).push(a);
        }
        Vec::new()
    }
}

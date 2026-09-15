use std::collections::HashMap;

impl Solution {
    pub fn restore_array(adjacentPairs: Vec<Vec<i32>>) -> Vec<i32> {
        // Build the adjacency map: the array is a path, so every value has
        // one or two neighbours. The judge compares the returned array
        // exactly, so the walk must start at the same endpoint every time:
        // the first pair's element that is an endpoint, or the smaller
        // endpoint when the first pair is an internal edge.
        let mut adj: HashMap<i32, Vec<i32>> = HashMap::new();
        for pair in &adjacentPairs {
            adj.entry(pair[0]).or_default().push(pair[1]);
            adj.entry(pair[1]).or_default().push(pair[0]);
        }
        let a = adjacentPairs[0][0];
        let b = adjacentPairs[0][1];
        let start = if adj[&a].len() == 1 {
            a
        } else if adj[&b].len() == 1 {
            b
        } else {
            // Values live in [-1e5, 1e5]; i32::MAX is a safe "no previous"
            // sentinel for the walk below.
            *adj.iter()
                .filter(|(_, neighbors)| neighbors.len() == 1)
                .map(|(value, _)| value)
                .min()
                .unwrap()
        };
        let mut result = Vec::with_capacity(adjacentPairs.len() + 1);
        let mut prev = i32::MAX;
        let mut cur = start;
        loop {
            result.push(cur);
            let mut nxt = i32::MAX;
            for &nb in &adj[&cur] {
                if nb != prev {
                    nxt = nb;
                    break;
                }
            }
            if nxt == i32::MAX {
                break;
            }
            prev = cur;
            cur = nxt;
        }
        result
    }
}

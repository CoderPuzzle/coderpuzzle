use std::collections::HashSet;

impl Solution {
    pub fn is_possible(n: i32, edges: Vec<Vec<i32>>) -> bool {
        // One added edge flips exactly two parities, so at most four
        // odd-degree nodes are repairable. Normalized (min,max) pairs pack
        // into i64 keys inside one hash set for O(1) slot-free probes.
        let mut seen: HashSet<i64> = HashSet::with_capacity(edges.len());
        let mut degree = vec![0i32; n as usize + 1];
        for edge in &edges {
            degree[edge[0] as usize] += 1;
            degree[edge[1] as usize] += 1;
            let (u, v) = (edge[0] as i64, edge[1] as i64);
            seen.insert(if u < v { u * 200001 + v } else { v * 200001 + u });
        }
        let linked = |a: i32, b: i32| {
            let (u, v) = (a as i64, b as i64);
            let key = if u < v { u * 200001 + v } else { v * 200001 + u };
            seen.contains(&key)
        };
        let odds: Vec<i32> = (1..=n).filter(|&node| degree[node as usize] & 1 == 1).collect();
        match odds.len() {
            0 => true,
            2 => {
                let (a, b) = (odds[0], odds[1]);
                if !linked(a, b) {
                    return true;
                }
                (1..=n).any(|c| c != a && c != b && !linked(a, c) && !linked(b, c))
            }
            4 => {
                let (w, x, y, z) = (odds[0], odds[1], odds[2], odds[3]);
                (!linked(w, x) && !linked(y, z)) || (!linked(w, y) && !linked(x, z)) || (!linked(w, z) && !linked(x, y))
            }
            _ => false,
        }
    }
}

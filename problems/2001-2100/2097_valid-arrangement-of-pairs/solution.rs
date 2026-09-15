use std::collections::HashMap;

impl Solution {
    pub fn valid_arrangement(pairs: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Numbers are nodes, pairs are directed edges: the arrangement is an
        // Eulerian path (a walk using every edge exactly once).
        let mut adj: HashMap<i32, Vec<i32>> = HashMap::new();
        let mut indeg: HashMap<i32, i32> = HashMap::new();
        let mut outdeg: HashMap<i32, i32> = HashMap::new();
        let mut order: Vec<i32> = Vec::new();
        for p in &pairs {
            let (u, v) = (p[0], p[1]);
            if !adj.contains_key(&u) {
                order.push(u);
            }
            adj.entry(u).or_default().push(v);
            *outdeg.entry(u).or_insert(0) += 1;
            *indeg.entry(v).or_insert(0) += 1;
        }

        // The unique out-in == 1 node must start the walk; when all degrees
        // balance (Eulerian circuit) any edge-bearing node works — pairs[0][0].
        let mut start = pairs[0][0];
        for &u in &order {
            if outdeg.get(&u).copied().unwrap_or(0) - indeg.get(&u).copied().unwrap_or(0) == 1 {
                start = u;
                break;
            }
        }

        // Iterative Hierholzer (explicit stack — 1e5 edges would overflow
        // recursion): deepen while unused edges remain; a node joins `path`
        // only when stuck, so unwinding emits dead-ends first.
        let mut stack: Vec<i32> = vec![start];
        let mut path: Vec<i32> = Vec::new();
        while let Some(&u) = stack.last() {
            let has_edge = adj.get(&u).map_or(false, |e| !e.is_empty());
            if has_edge {
                let v = adj.get_mut(&u).unwrap().pop().unwrap();
                stack.push(v);
            } else {
                path.push(u);
                stack.pop();
            }
        }
        // Reversal restores walk order; consecutive nodes are the arranged pairs.
        path.reverse();

        let mut res: Vec<Vec<i32>> = Vec::with_capacity(path.len() - 1);
        for i in 0..path.len() - 1 {
            res.push(vec![path[i], path[i + 1]]);
        }
        res
    }
}

use std::collections::HashMap;

impl Solution {
    pub fn check_contradictions(equations: Vec<Vec<String>>, values: Vec<f64>) -> bool {
        let eps: f64 = 1e-5;
        let mut id: HashMap<String, usize> = HashMap::new();
        let cap = equations.len() * 2;
        // Each adjacency entry carries (neighbor, neighbor / name).
        let mut adj: Vec<Vec<(usize, f64)>> = vec![Vec::new(); cap];

        for i in 0..equations.len() {
            let a = {
                let s = &equations[i][0];
                let fresh = id.len();
                *id.entry(s.clone()).or_insert(fresh)
            };
            let b = {
                let s = &equations[i][1];
                let fresh = id.len();
                *id.entry(s.clone()).or_insert(fresh)
            };
            let w = values[i];
            adj[b].push((a, w));
            adj[a].push((b, 1.0 / w));
        }

        // ratio[x] = x / root of its component; 0.0 marks unvisited (labels are positive).
        let mut ratio: Vec<f64> = vec![0.0; cap];
        let mut queue: Vec<usize> = Vec::new();
        for root in 0..cap {
            if ratio[root] != 0.0 {
                continue;
            }
            ratio[root] = 1.0;
            queue.clear();
            queue.push(root);
            let mut head = 0;
            while head < queue.len() {
                let x = queue[head];
                head += 1;
                for &(y, factor) in &adj[x] {
                    if ratio[y] == 0.0 {
                        ratio[y] = ratio[x] * factor;
                        queue.push(y);
                    }
                }
            }
        }

        for i in 0..equations.len() {
            let a = id[equations[i][0].as_str()];
            let b = id[equations[i][1].as_str()];
            let w = values[i];
            if (ratio[a] / ratio[b] - w).abs() > eps {
                return true;
            }
        }
        false
    }
}

use std::collections::HashMap;

impl Solution {
    pub fn check_contradictions(equations: Vec<Vec<String>>, values: Vec<f64>) -> bool {
        let eps: f64 = 1e-5;
        let mut id: HashMap<String, usize> = HashMap::new();
        let cap = equations.len() * 2;
        let mut parent: Vec<usize> = (0..cap).collect();
        let mut weight: Vec<f64> = vec![1.0; cap];

        // Returns (root, x / root).
        fn find(x: usize, parent: &mut Vec<usize>, weight: &mut Vec<f64>) -> (usize, f64) {
            if parent[x] == x {
                return (x, 1.0);
            }
            let (root, w) = find(parent[x], parent, weight);
            parent[x] = root;
            weight[x] *= w;
            (root, weight[x])
        }

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
            let (root_a, wa) = find(a, &mut parent, &mut weight);
            let (root_b, wb) = find(b, &mut parent, &mut weight);
            if root_a == root_b {
                if (wa / wb - w).abs() > eps {
                    return true;
                }
            } else {
                parent[root_a] = root_b;
                weight[root_a] = wb * w / wa;
            }
        }
        false
    }
}

use std::collections::HashMap;

impl Solution {
    pub fn number_of_good_paths(vals: Vec<i32>, edges: Vec<Vec<i32>>) -> i32 {
        let n = vals.len();
        let mut parent: Vec<usize> = (0..n).collect();
        let mut size: Vec<usize> = vec![1; n];

        fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        let mut by_value: HashMap<i32, Vec<usize>> = HashMap::new();
        for (i, &v) in vals.iter().enumerate() {
            by_value.entry(v).or_default().push(i);
        }
        let mut value_keys: Vec<i32> = by_value.keys().copied().collect();
        value_keys.sort_unstable();

        let mut answer: i64 = 0;
        // Activate nodes in increasing value order: smaller values are
        // already merged, so unions only ever connect components whose
        // nodes are all <= v.
        for v in value_keys {
            let nodes = &by_value[&v];
            for &u in nodes {
                // Union across edges to already-active (<= v) endpoints:
                // the value-v nodes are then connected exactly through
                // paths whose interior nodes are all <= v.
                for &w in &adj[u] {
                    if vals[w] <= v {
                        let ra = find(&mut parent, u);
                        let rb = find(&mut parent, w);
                        if ra != rb {
                            let (mut ra, mut rb) = (ra, rb);
                            if size[ra] < size[rb] {
                                std::mem::swap(&mut ra, &mut rb);
                            }
                            parent[rb] = ra;
                            size[ra] += size[rb];
                        }
                    }
                }
            }
            // Group this value's nodes by component; a component holding c
            // of them yields c*(c-1)/2 good paths (each unordered pair).
            let mut component_count: HashMap<usize, i64> = HashMap::new();
            for &u in nodes {
                let r = find(&mut parent, u);
                *component_count.entry(r).or_insert(0) += 1;
            }
            for c in component_count.values() {
                answer += c * (c - 1) / 2;
            }
        }
        // Every single node is a good path on its own.
        (answer + n as i64) as i32
    }
}

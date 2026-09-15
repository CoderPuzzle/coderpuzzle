use std::collections::VecDeque;

impl Solution {
    pub fn minimum_diameter_after_merge(edges1: Vec<Vec<i32>>, edges2: Vec<Vec<i32>>) -> i32 {
        // Whatever the attachment pair, the merged diameter is the max of
        // three candidates: each original diameter, and the path that
        // crosses the new edge -- deepest leg of tree 1 from its
        // attachment node, plus deepest leg of tree 2, plus 1. Only the
        // third term depends on the choice, and the minimum over
        // attachment nodes of the deepest leg is the radius ceil(d / 2).
        // So connect the two centers: answer =
        // max(d1, d2, ceil(d1/2) + ceil(d2/2) + 1). Each diameter comes
        // from two strictly iterative BFS sweeps (VecDeque queues); with
        // 1e5 nodes recursion is not an option.
        fn diameter(edges: &[Vec<i32>]) -> i32 {
            let n = edges.len() + 1;
            let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
            for e in edges {
                let a = e[0] as usize;
                let b = e[1] as usize;
                adj[a].push(b);
                adj[b].push(a);
            }

            fn sweep(adj: &Vec<Vec<usize>>, src: usize) -> (usize, usize) {
                let n = adj.len();
                let mut dist = vec![-1_i64; n];
                dist[src] = 0;
                let mut queue = VecDeque::new();
                queue.push_back(src);
                let mut far = src;
                let mut best = 0_i64;
                while let Some(u) = queue.pop_front() {
                    for &v in &adj[u] {
                        if dist[v] < 0 {
                            dist[v] = dist[u] + 1;
                            if dist[v] > best {
                                far = v;
                                best = dist[v];
                            }
                            queue.push_back(v);
                        }
                    }
                }
                (far, best as usize)
            }

            let (far, _) = sweep(&adj, 0);
            sweep(&adj, far).1 as i32
        }

        let d1 = diameter(&edges1);
        let d2 = diameter(&edges2);
        let cross = (d1 + 1) / 2 + (d2 + 1) / 2 + 1;
        d1.max(d2).max(cross)
    }
}

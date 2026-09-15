use std::cmp::Reverse;
use std::collections::BinaryHeap;
impl Solution {
    pub fn shortest_path(n: i32, edges: Vec<Vec<i32>>, labels: String, k: i32) -> i64 {
        let (n, k) = (n as usize, k as usize);
        let mut g = vec![vec![]; n];
        for e in edges {
            g[e[0] as usize].push((e[1] as usize, e[2] as i64))
        }
        let b = labels.as_bytes();
        let mut d = vec![vec![i64::MAX / 4; k + 1]; n];
        let mut q = BinaryHeap::new();
        d[0][1] = 0;
        q.push(Reverse((0i64, 0usize, 1usize)));
        while let Some(Reverse((x, u, c))) = q.pop() {
            if x != d[u][c] {
                continue;
            }
            for &(v, w) in &g[u] {
                let nc = if b[u] == b[v] { c + 1 } else { 1 };
                if nc <= k && x + w < d[v][nc] {
                    d[v][nc] = x + w;
                    q.push(Reverse((x + w, v, nc)))
                }
            }
        }
        let z = *d[n - 1].iter().min().unwrap();
        if z == i64::MAX / 4 {
            -1
        } else {
            z
        }
    }
}

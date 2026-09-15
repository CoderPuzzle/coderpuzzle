use std::cmp::Reverse;
use std::collections::BinaryHeap;
impl Solution {
    pub fn min_time_max_power(
        n: i32,
        edges: Vec<Vec<i32>>,
        power: i32,
        cost: Vec<i32>,
        source: i32,
        target: i32,
    ) -> Vec<i64> {
        let (n, pw) = (n as usize, power as usize);
        let mut g = vec![vec![]; n];
        for e in edges {
            g[e[0] as usize].push((e[1] as usize, e[2] as i64))
        }
        let mut d = vec![vec![i64::MAX / 4; pw + 1]; n];
        let mut q = BinaryHeap::new();
        d[source as usize][pw] = 0;
        q.push(Reverse((0i64, source as usize, pw)));
        while let Some(Reverse((x, u, p))) = q.pop() {
            if x != d[u][p] {
                continue;
            }
            if p >= cost[u] as usize {
                let np = p - cost[u] as usize;
                for &(v, t) in &g[u] {
                    if x + t < d[v][np] {
                        d[v][np] = x + t;
                        q.push(Reverse((x + t, v, np)))
                    }
                }
            }
        }
        let z = *d[target as usize].iter().min().unwrap();
        if z == i64::MAX / 4 {
            return vec![-1, -1];
        }
        for p in (0..=pw).rev() {
            if d[target as usize][p] == z {
                return vec![z, p as i64];
            }
        }
        vec![-1, -1]
    }
}

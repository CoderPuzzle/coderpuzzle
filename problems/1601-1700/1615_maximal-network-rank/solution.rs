use std::collections::HashSet;

impl Solution {
    pub fn maximal_network_rank(n: i32, roads: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut degree = vec![0i32; n];
        let mut connected: HashSet<(usize, usize)> = HashSet::new();
        for road in &roads {
            let a = road[0] as usize;
            let b = road[1] as usize;
            degree[a] += 1;
            degree[b] += 1;
            connected.insert((a.min(b), a.max(b)));
        }

        let mut best = 0;
        for i in 0..n {
            for j in (i + 1)..n {
                let mut rank = degree[i] + degree[j];
                if connected.contains(&(i, j)) {
                    rank -= 1;
                }
                if rank > best {
                    best = rank;
                }
            }
        }
        best
    }
}

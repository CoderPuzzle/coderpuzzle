impl Solution {
    pub fn minimum_weight(edges: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i64> {
        let n = edges.len() + 1;
        let mut adj: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        for e in &edges {
            let (u, v, w) = (e[0] as usize, e[1] as usize, e[2] as i64);
            adj[u].push((v, w));
            adj[v].push((u, w));
        }

        // Root at 0 and walk an Euler tour iteratively, so deep chains cannot
        // overflow the call stack. Every node enters the tour at its first
        // visit and re-enters each time a child's subtree closes, giving
        // 2n - 1 entries; first[v] is v's earliest slot in that sequence.
        let mut depth = vec![0usize; n];
        let mut dist = vec![0i64; n];
        let mut parent = vec![usize::MAX; n];
        let mut first = vec![0usize; n];
        let mut it = vec![0usize; n];
        let mut tour: Vec<usize> = Vec::with_capacity(2 * n - 1);
        let mut stack: Vec<usize> = vec![0];
        tour.push(0);
        while let Some(&u) = stack.last() {
            if it[u] < adj[u].len() {
                let (v, w) = adj[u][it[u]];
                it[u] += 1;
                if v != parent[u] {
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
                    dist[v] = dist[u] + w;
                    first[v] = tour.len();
                    tour.push(v);
                    stack.push(v);
                }
            } else {
                stack.pop();
                if let Some(&p) = stack.last() {
                    tour.push(p);
                }
            }
        }
        let m = tour.len();

        // Sparse table: table[k][i] is the shallowest node over the 2^k tour
        // entries from i - the range argmin under depth comparison.
        let mut log = 1usize;
        while (1usize << log) <= m {
            log += 1;
        }
        let mut table: Vec<Vec<usize>> = vec![tour.clone()];
        for k in 1..log {
            let prev = &table[k - 1];
            let half = 1usize << (k - 1);
            let len = m - (1usize << k) + 1;
            let cur: Vec<usize> = (0..len)
                .map(|i| {
                    let (a, b) = (prev[i], prev[i + half]);
                    if depth[a] <= depth[b] {
                        a
                    } else {
                        b
                    }
                })
                .collect();
            table.push(cur);
        }

        let log2 = |len: usize| (usize::BITS - len.leading_zeros() - 1) as usize;
        let lca = |x: usize, y: usize| -> usize {
            let (mut l, mut r) = (first[x], first[y]);
            if l > r {
                std::mem::swap(&mut l, &mut r);
            }
            let k = log2(r - l + 1);
            let (a, b) = (table[k][l], table[k][r - (1usize << k) + 1]);
            if depth[a] <= depth[b] {
                a
            } else {
                b
            }
        };
        let distance = |x: usize, y: usize| -> i64 { dist[x] + dist[y] - 2 * dist[lca(x, y)] };

        // The minimal subtree joining a, b, c is the union of the three paths,
        // each edge lying on exactly two of them.
        queries
            .iter()
            .map(|q| {
                let (a, b, c) = (q[0] as usize, q[1] as usize, q[2] as usize);
                (distance(a, b) + distance(b, c) + distance(c, a)) / 2
            })
            .collect()
    }
}

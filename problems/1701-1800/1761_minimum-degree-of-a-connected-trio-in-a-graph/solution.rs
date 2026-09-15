// A trio's degree is deg(u) + deg(v) + deg(w) - 6: the three internal
// edges are exactly the ones double-counted by vertex degrees. Rank the
// nodes by (degree, id) and keep each node's neighbors as a bitset over
// those ranks; the cheapest trio through an edge (u, v) uses the
// minimum-degree common neighbor, which is the lowest set bit of
// mask[u] & mask[v].
impl Solution {
    pub fn min_trio_degree(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut deg = vec![0i32; n + 1];
        for e in &edges {
            deg[e[0] as usize] += 1;
            deg[e[1] as usize] += 1;
        }

        let mut order: Vec<usize> = (1..=n).collect();
        order.sort_by_key(|&x| (deg[x], x));
        let mut rank = vec![0usize; n + 1];
        let mut deg_at = vec![0i32; n];
        for (p, &node) in order.iter().enumerate() {
            rank[node] = p;
            deg_at[p] = deg[node];
        }

        let words = (n + 63) / 64;
        let mut mask = vec![vec![0u64; words]; n + 1];
        for e in &edges {
            let (u, v) = (e[0] as usize, e[1] as usize);
            let (ru, rv) = (rank[u], rank[v]);
            mask[u][rv >> 6] |= 1u64 << (rv & 63);
            mask[v][ru >> 6] |= 1u64 << (ru & 63);
        }

        let mut best = 3 * n as i32;
        for e in &edges {
            let (u, v) = (e[0] as usize, e[1] as usize);
            for t in 0..words {
                let common = mask[u][t] & mask[v][t];
                if common != 0 {
                    let p = (t << 6) + common.trailing_zeros() as usize;
                    let cand = deg[u] + deg[v] + deg_at[p] - 6;
                    if cand < best {
                        best = cand;
                    }
                    break;
                }
            }
        }
        if best < 3 * n as i32 {
            best
        } else {
            -1
        }
    }
}

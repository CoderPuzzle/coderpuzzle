impl Solution {
    pub fn minimum_cost(
        source: String,
        target: String,
        original: Vec<String>,
        changed: Vec<String>,
        cost: Vec<i32>,
    ) -> i64 {
        // A conversion rule is a directed edge in the 26-letter cost graph;
        // the cheapest a->b conversion is the shortest path a->b.
        const INF: i64 = i64::MAX / 4;
        let mut dist = [[INF; 26]; 26];
        for i in 0..26 {
            dist[i][i] = 0;
        }
        for e in 0..original.len() {
            let a = (original[e].as_bytes()[0] - b'a') as usize;
            let b = (changed[e].as_bytes()[0] - b'a') as usize;
            let w = cost[e] as i64;
            // Duplicate rules for the same pair just keep the minimum cost.
            if w < dist[a][b] {
                dist[a][b] = w;
            }
        }
        // Floyd–Warshall: relax every pair through each intermediate letter.
        for m in 0..26 {
            for i in 0..26 {
                let dim = dist[i][m];
                if dim == INF {
                    continue;
                }
                for j in 0..26 {
                    let nd = dim + dist[m][j];
                    if nd < dist[i][j] {
                        dist[i][j] = nd;
                    }
                }
            }
        }
        let sb = source.as_bytes();
        let tb = target.as_bytes();
        // Matching characters convert for free; one unreachable pair fails all.
        let mut total: i64 = 0;
        for p in 0..sb.len() {
            let s = (sb[p] - b'a') as usize;
            let t = (tb[p] - b'a') as usize;
            if s == t {
                continue;
            }
            let d = dist[s][t];
            if d == INF {
                return -1;
            }
            total += d;
        }
        total
    }
}

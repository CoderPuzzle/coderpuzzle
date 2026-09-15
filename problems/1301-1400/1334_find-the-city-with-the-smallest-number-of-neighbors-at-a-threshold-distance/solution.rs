impl Solution {
    pub fn find_the_city(n: i32, edges: Vec<Vec<i32>>, distance_threshold: i32) -> i32 {
        let n = n as usize;
        // With n <= 100, compute all-pairs distances at once: 0 diagonal,
        // symmetric direct weights, INF elsewhere.
        let inf = i32::MAX / 2;
        let mut dist = vec![vec![inf; n]; n];
        for i in 0..n {
            dist[i][i] = 0;
        }
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            let w = e[2];
            dist[a][b] = w;
            dist[b][a] = w;
        }
        // Floyd-Warshall: relax dist[i][j] through intermediate node k. The
        // inf guards skip pairs that cannot improve anything this pass.
        for k in 0..n {
            for i in 0..n {
                let dik = dist[i][k];
                if dik == inf {
                    continue;
                }
                for j in 0..n {
                    if dist[k][j] == inf {
                        continue;
                    }
                    let candidate = dik + dist[k][j];
                    if candidate < dist[i][j] {
                        dist[i][j] = candidate;
                    }
                }
            }
        }
        // Ascending scan with a strictly-smaller count (or equal count at a
        // larger index) implements the tie-break: greatest city number wins.
        let mut best_city = -1;
        let mut best_count = usize::MAX;
        for i in 0..n {
            let mut count = 0;
            for j in 0..n {
                if j != i && dist[i][j] <= distance_threshold {
                    count += 1;
                }
            }
            if count < best_count || (count == best_count && (i as i32) > best_city) {
                best_city = i as i32;
                best_count = count;
            }
        }
        best_city
    }
}

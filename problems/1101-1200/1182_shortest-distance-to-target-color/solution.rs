impl Solution {
    pub fn shortest_distance_color(colors: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        const INF: i32 = i32::MAX;
        let n = colors.len();
        // dist[i][c]: distance from i to nearest color c (1..3).
        let mut dist = vec![[INF; 4]; n];
        for c in 1..=3usize {
            // Left-to-right sweep carrying the distance to the most
            // recent occurrence of c.
            let mut last = INF;
            for i in 0..n {
                if colors[i] == c as i32 {
                    last = 0;
                } else if last != INF {
                    last += 1;
                }
                dist[i][c] = last;
            }
            // Mirror sweep keeps whichever side owns the closer one.
            let mut last = INF;
            for i in (0..n).rev() {
                if colors[i] == c as i32 {
                    last = 0;
                } else if last != INF {
                    last += 1;
                }
                if last < dist[i][c] {
                    dist[i][c] = last;
                }
            }
        }
        queries
            .iter()
            .map(|q| {
                let d = dist[q[0] as usize][q[1] as usize];
                if d == INF {
                    -1
                } else {
                    d
                }
            })
            .collect()
    }
}

impl Solution {
    pub fn shortest_distance_after_queries(n: i32, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // Every added road can only shorten paths, so nothing computed for
        // an earlier query stays reusable except the road set itself. Keep
        // an adjacency list, append each new road, then run one unweighted
        // BFS from city 0 that stops as soon as city n - 1 is settled.
        // With n, q <= 500 this recomputation per query is cheap and exact.
        let n = n as usize;
        let mut roads: Vec<Vec<usize>> = vec![Vec::new(); n];
        for i in 0..n - 1 {
            roads[i].push(i + 1);
        }
        let mut answer = Vec::with_capacity(queries.len());
        for query in &queries {
            let (u, v) = (query[0] as usize, query[1] as usize);
            roads[u].push(v);
            let mut dist = vec![-1i32; n];
            dist[0] = 0;
            let mut queue: Vec<usize> = vec![0];
            let mut head = 0;
            while head < queue.len() {
                let node = queue[head];
                head += 1;
                if node == n - 1 {
                    break;
                }
                for &nxt in &roads[node] {
                    if dist[nxt] == -1 {
                        dist[nxt] = dist[node] + 1;
                        queue.push(nxt);
                    }
                }
            }
            answer.push(dist[n - 1]);
        }
        answer
    }
}

use std::collections::VecDeque;

impl Solution {
    pub fn network_becomes_idle(edges: Vec<Vec<i32>>, patience: Vec<i32>) -> i32 {
        let mut graph = vec![Vec::new(); patience.len()];
        for edge in edges {
            let u = edge[0] as usize;
            let v = edge[1] as usize;
            graph[u].push(v);
            graph[v].push(u);
        }

        let mut distance = vec![-1_i32; patience.len()];
        distance[0] = 0;
        let mut queue = VecDeque::from([0_usize]);
        while let Some(node) = queue.pop_front() {
            for &neighbor in &graph[node] {
                if distance[neighbor] == -1 {
                    distance[neighbor] = distance[node] + 1;
                    queue.push_back(neighbor);
                }
            }
        }

        let mut last_arrival = 0_i64;
        for server in 1..patience.len() {
            let round_trip = 2_i64 * i64::from(distance[server]);
            let server_patience = i64::from(patience[server]);
            let last_send = ((round_trip - 1) / server_patience) * server_patience;
            last_arrival = last_arrival.max(last_send + round_trip);
        }
        (last_arrival + 1) as i32
    }
}

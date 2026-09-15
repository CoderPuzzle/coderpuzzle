use std::collections::VecDeque;

impl Solution {
    pub fn minimum_threshold(n: i32, edges: Vec<Vec<i32>>, source: i32, target: i32, k: i32) -> i32 {
        if source == target {
            return 0;
        }
        let n = n as usize;
        let source = source as usize;
        let target = target as usize;
        let mut graph = vec![Vec::<(usize, i32)>::new(); n];
        let mut high = 0;
        for edge in edges {
            let u = edge[0] as usize;
            let v = edge[1] as usize;
            graph[u].push((v, edge[2]));
            graph[v].push((u, edge[2]));
            high = high.max(edge[2]);
        }
        let feasible = |threshold: i32| -> bool {
            let mut distance = vec![k + 1; n];
            let mut queue = VecDeque::new();
            distance[source] = 0;
            queue.push_back(source);
            while let Some(node) = queue.pop_front() {
                for &(neighbor, weight) in &graph[node] {
                    let cost = if weight > threshold { 1 } else { 0 };
                    let candidate = distance[node] + cost;
                    if candidate < distance[neighbor] && candidate <= k {
                        distance[neighbor] = candidate;
                        if cost == 0 {
                            queue.push_front(neighbor);
                        } else {
                            queue.push_back(neighbor);
                        }
                    }
                }
            }
            distance[target] <= k
        };
        if !feasible(high) {
            return -1;
        }
        let mut low = 0;
        while low < high {
            let middle = low + (high - low) / 2;
            if feasible(middle) {
                high = middle;
            } else {
                low = middle + 1;
            }
        }
        low
    }
}

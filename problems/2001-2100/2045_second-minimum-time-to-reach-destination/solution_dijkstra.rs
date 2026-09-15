use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn second_minimum(n: i32, edges: Vec<Vec<i32>>, time: i32, change: i32) -> i32 {
        let size = n as usize;
        let mut graph = vec![Vec::new(); size + 1];
        for edge in edges {
            let left = edge[0] as usize;
            let right = edge[1] as usize;
            graph[left].push(right);
            graph[right].push(left);
        }

        let mut first = vec![i32::MAX; size + 1];
        let mut second = vec![i32::MAX; size + 1];
        first[1] = 0;
        let mut pending: BinaryHeap<Reverse<(i32, usize)>> = BinaryHeap::new();
        pending.push(Reverse((0, 1)));

        while let Some(Reverse((distance, vertex))) = pending.pop() {
            // stale entry: both slots improved after this was pushed
            if distance > second[vertex] {
                continue;
            }
            let next_distance = distance + 1;
            for &neighbor in &graph[vertex] {
                if next_distance < first[neighbor] {
                    second[neighbor] = first[neighbor];
                    first[neighbor] = next_distance;
                    pending.push(Reverse((next_distance, neighbor)));
                } else if first[neighbor] < next_distance && next_distance < second[neighbor] {
                    second[neighbor] = next_distance;
                    pending.push(Reverse((next_distance, neighbor)));
                }
            }
        }

        let mut elapsed = 0_i64;
        let edge_time = time as i64;
        let signal_change = change as i64;
        for _ in 0..second[size] {
            if (elapsed / signal_change) % 2 == 1 {
                elapsed = (elapsed / signal_change + 1) * signal_change;
            }
            elapsed += edge_time;
        }
        elapsed as i32
    }
}

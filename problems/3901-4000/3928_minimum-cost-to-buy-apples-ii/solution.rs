use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_cost(n: i32, prices: Vec<i32>, roads: Vec<Vec<i32>>) -> Vec<i64> {
        let n = n as usize;
        let mut graph = vec![Vec::<(usize, i64, i64)>::new(); n];
        for road in roads {
            let loaded = road[2] as i64 * road[3] as i64;
            graph[road[0] as usize].push((road[1] as usize, road[2] as i64, loaded));
            graph[road[1] as usize].push((road[0] as usize, road[2] as i64, loaded));
        }
        let dijkstra = |start: usize, carrying: bool| -> Vec<i64> {
            let mut distance = vec![i64::MAX; n];
            let mut heap = BinaryHeap::new();
            distance[start] = 0;
            heap.push(Reverse((0_i64, start)));
            while let Some(Reverse((current, node))) = heap.pop() {
                if current != distance[node] {
                    continue;
                }
                for &(neighbor, empty, loaded) in &graph[node] {
                    let candidate = current + if carrying { loaded } else { empty };
                    if candidate < distance[neighbor] {
                        distance[neighbor] = candidate;
                        heap.push(Reverse((candidate, neighbor)));
                    }
                }
            }
            distance
        };
        let mut answer = vec![0_i64; n];
        for start in 0..n {
            let empty_distance = dijkstra(start, false);
            let loaded_distance = dijkstra(start, true);
            answer[start] = (0..n)
                .filter(|&shop| empty_distance[shop] != i64::MAX)
                .map(|shop| prices[shop] as i64 + empty_distance[shop] + loaded_distance[shop])
                .min()
                .unwrap();
        }
        answer
    }
}

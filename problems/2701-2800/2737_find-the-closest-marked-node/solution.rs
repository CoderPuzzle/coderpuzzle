use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn minimum_distance(n: i32, edges: Vec<Vec<i32>>, s: i32, marked: Vec<i32>) -> i64 {
        let n = n as usize;
        // Adjacency lists over DIRECTED edges: u -> v only, never the reverse.
        // Parallel edges both enter the list; relaxation keeps the cheaper one.
        let mut graph = vec![Vec::<(usize, i32)>::new(); n];
        for edge in edges {
            graph[edge[0] as usize].push((edge[1] as usize, edge[2]));
        }

        // Dijkstra from s; weights are positive, so each pop finalizes its node.
        let mut distances = vec![i64::MAX; n];
        distances[s as usize] = 0;
        let mut heap = BinaryHeap::new();
        heap.push(Reverse((0_i64, s as usize)));
        while let Some(Reverse((distance, node))) = heap.pop() {
            if distance != distances[node] {
                continue; // stale entry; the node was finalized earlier
            }
            for &(neighbor, weight) in &graph[node] {
                let candidate = distance + weight as i64;
                if candidate < distances[neighbor] {
                    distances[neighbor] = candidate;
                    heap.push(Reverse((candidate, neighbor)));
                }
            }
        }

        // The answer is the closest marked node; unreachable ones stay at MAX.
        let best = marked.iter().map(|&node| distances[node as usize]).min().unwrap();
        if best == i64::MAX {
            -1
        } else {
            best
        }
    }
}

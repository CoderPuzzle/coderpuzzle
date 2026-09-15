use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn modified_graph_edges(
        n: i32,
        edges: Vec<Vec<i32>>,
        source: i32,
        destination: i32,
        target: i32,
    ) -> Vec<Vec<i32>> {
        let n = n as usize;
        let count = edges.len();

        // Weights <= 0 are skipped, so passing the raw list treats every -1
        // edge as absent, while passing the working copy gives the current
        // assignment.
        let dijkstra = |weights: &[i64], start: usize| -> Vec<i64> {
            const INFINITY: i64 = i64::MAX / 4;

            let mut graph: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
            for (index, edge) in edges.iter().enumerate() {
                let weight = weights[index];
                if weight <= 0 {
                    continue;
                }
                graph[edge[0] as usize].push((edge[1] as usize, weight));
                graph[edge[1] as usize].push((edge[0] as usize, weight));
            }

            let mut distance = vec![INFINITY; n];
            distance[start] = 0;
            let mut heap = BinaryHeap::new();
            heap.push(Reverse((0, start)));
            while let Some(Reverse((dist, node))) = heap.pop() {
                if dist > distance[node] {
                    continue;
                }
                for &(neighbor, weight) in &graph[node] {
                    let candidate = dist + weight;
                    if candidate < distance[neighbor] {
                        distance[neighbor] = candidate;
                        heap.push(Reverse((candidate, neighbor)));
                    }
                }
            }
            distance
        };

        let untouched: Vec<i64> = edges.iter().map(|edge| edge[2] as i64).collect();
        if dijkstra(&untouched, source as usize)[destination as usize] < target as i64 {
            return Vec::new();
        }

        let mut weights: Vec<i64> = untouched.iter().map(|&w| if w > 0 { w } else { 1 }).collect();
        if dijkstra(&weights, source as usize)[destination as usize] > target as i64 {
            return Vec::new();
        }

        loop {
            let distances = dijkstra(&weights, source as usize);
            let current = distances[destination as usize];
            if current == target as i64 {
                break;
            }

            let reverse = dijkstra(&weights, destination as usize);
            let deficit = target as i64 - current;
            let mut best_index = count;
            let mut best_key = i64::MAX;
            for (index, edge) in edges.iter().enumerate() {
                if untouched[index] != -1 {
                    continue;
                }
                let u = edge[0] as usize;
                let v = edge[1] as usize;
                let forward = distances[u] + weights[index] + reverse[v] == current;
                let backward = distances[v] + weights[index] + reverse[u] == current;
                if !forward && !backward {
                    continue;
                }
                let mut key = distances[u];
                if backward && (!forward || distances[v] < key) {
                    key = distances[v];
                }
                if key < best_key {
                    best_key = key;
                    best_index = index;
                }
            }
            weights[best_index] += deficit;
        }

        edges
            .iter()
            .enumerate()
            .map(|(index, edge)| vec![edge[0], edge[1], weights[index] as i32])
            .collect()
    }
}

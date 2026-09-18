use std::cmp::Reverse;
use std::collections::BinaryHeap;

pub struct Graph {
    adjacency: Vec<Vec<(usize, i64)>>,
}

impl Graph {
    pub fn new(n: i32, edges: Vec<Vec<i32>>) -> Self {
        // Edges are only appended, never removed or reweighted, so a
        // plain adjacency list never needs invalidating or rebuilding.
        let mut graph = Graph {
            adjacency: vec![Vec::new(); n as usize],
        };
        for edge in &edges {
            graph.adjacency[edge[0] as usize].push((edge[1] as usize, edge[2] as i64));
        }
        graph
    }

    pub fn addEdge(&mut self, edge: Vec<i32>) {
        self.adjacency[edge[0] as usize].push((edge[1] as usize, edge[2] as i64));
    }

    pub fn shortestPath(&mut self, node1: i32, node2: i32) -> i32 {
        let (node1, node2) = (node1 as usize, node2 as usize);
        if node1 == node2 {
            return 0;
        }
        // Every cost is positive, so Dijkstra applies: the min-heap
        // hands out nodes in settle order by tentative distance. i64s
        // keep the i64::MAX sentinel arithmetic clean.
        let mut distance = vec![i64::MAX; self.adjacency.len()];
        distance[node1] = 0;
        let mut heap = BinaryHeap::from([(Reverse(0), node1)]);
        while let Some((Reverse(soFar), node)) = heap.pop() {
            // Stale entry: the node was already settled through a
            // cheaper route, so skip it.
            if soFar > distance[node] {
                continue;
            }
            // Popping node2 settles it, so its distance is final here.
            if node == node2 {
                return soFar as i32;
            }
            for &(neighbor, cost) in &self.adjacency[node] {
                let candidate = soFar + cost;
                // Only improving relaxations push a fresh entry, so any
                // entry goes stale at most once.
                if candidate < distance[neighbor] {
                    distance[neighbor] = candidate;
                    heap.push((Reverse(candidate), neighbor));
                }
            }
        }
        -1
    }
}

use std::cmp::Ordering;
use std::collections::BinaryHeap;

// Wraps an f64 probability so it can sit in a max-heap: BinaryHeap is a
// max-heap by default, but f64 has no total order (NaN), so Ord is
// implemented via partial_cmp, which is safe here since every probability
// is a finite number in [0, 1].
#[derive(PartialEq)]
struct HeapEntry {
    probability: f64,
    node: usize,
}

impl Eq for HeapEntry {}
impl Ord for HeapEntry {
    fn cmp(&self, other: &Self) -> Ordering {
        self.probability.partial_cmp(&other.probability).unwrap()
    }
}
impl PartialOrd for HeapEntry {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Solution {
    pub fn max_probability(n: i32, edges: Vec<Vec<i32>>, succProb: Vec<f64>, start_node: i32, end_node: i32) -> f64 {
        let n = n as usize;
        let start_node = start_node as usize;
        let end_node = end_node as usize;

        let mut adjacency: Vec<Vec<(usize, f64)>> = vec![Vec::new(); n];
        for (edge, &probability) in edges.iter().zip(succProb.iter()) {
            let a = edge[0] as usize;
            let b = edge[1] as usize;
            adjacency[a].push((b, probability));
            adjacency[b].push((a, probability));
        }

        let mut best = vec![0.0_f64; n];
        best[start_node] = 1.0;
        let mut visited = vec![false; n];

        let mut heap = BinaryHeap::new();
        heap.push(HeapEntry {
            probability: 1.0,
            node: start_node,
        });
        while let Some(HeapEntry { probability, node }) = heap.pop() {
            if visited[node] {
                continue;
            }
            visited[node] = true;
            if node == end_node {
                return probability;
            }
            for &(neighbor, edge_probability) in &adjacency[node] {
                let candidate = probability * edge_probability;
                if candidate > best[neighbor] {
                    best[neighbor] = candidate;
                    heap.push(HeapEntry {
                        probability: candidate,
                        node: neighbor,
                    });
                }
            }
        }
        best[end_node]
    }
}

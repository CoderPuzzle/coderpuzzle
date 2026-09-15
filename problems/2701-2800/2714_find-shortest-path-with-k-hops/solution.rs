use std::cmp::Ordering;
use std::collections::BinaryHeap;

// Wraps a state so the BinaryHeap pops the smallest distance first: the
// heap is a max-heap by default, so Ord is implemented inverted (the other
// entry compares first); distances are plain ints with a total order, so
// no NaN-style caveats apply.
#[derive(PartialEq)]
struct HeapEntry {
    dist: i32,
    node: usize,
    hops: usize,
}

impl Eq for HeapEntry {}
impl Ord for HeapEntry {
    fn cmp(&self, other: &Self) -> Ordering {
        other.dist.cmp(&self.dist)
    }
}
impl PartialOrd for HeapEntry {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Solution {
    // Dijkstra over states (node, hops used): staying in a layer pays the
    // edge weight, a hop crosses into the next layer for free; node d pops
    // at the minimum over every way of spending at most k free edges.
    pub fn shortest_path_with_hops(n: i32, edges: Vec<Vec<i32>>, s: i32, d: i32, k: i32) -> i32 {
        let n = n as usize;
        let s = s as usize;
        let d = d as usize;
        let k = k as usize;

        let mut adjacency: Vec<Vec<(usize, i32)>> = vec![Vec::new(); n];
        for edge in &edges {
            adjacency[edge[0] as usize].push((edge[1] as usize, edge[2]));
            adjacency[edge[1] as usize].push((edge[0] as usize, edge[2]));
        }

        let inf = i32::MAX;
        let mut best = vec![vec![inf; k + 1]; n];
        best[s][0] = 0;

        let mut heap = BinaryHeap::new();
        heap.push(HeapEntry {
            dist: 0,
            node: s,
            hops: 0,
        });
        while let Some(HeapEntry { dist, node, hops }) = heap.pop() {
            if dist > best[node][hops] {
                continue;
            }
            if node == d {
                return dist;
            }
            for &(neighbor, weight) in &adjacency[node] {
                let candidate = dist + weight;
                if candidate < best[neighbor][hops] {
                    best[neighbor][hops] = candidate;
                    heap.push(HeapEntry {
                        dist: candidate,
                        node: neighbor,
                        hops,
                    });
                }
                if hops < k && dist < best[neighbor][hops + 1] {
                    best[neighbor][hops + 1] = dist;
                    heap.push(HeapEntry {
                        dist,
                        node: neighbor,
                        hops: hops + 1,
                    });
                }
            }
        }
        panic!("unreachable: the graph is connected");
    }
}

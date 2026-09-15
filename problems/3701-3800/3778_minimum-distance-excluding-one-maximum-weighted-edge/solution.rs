use std::cmp::Ordering;
use std::collections::BinaryHeap;

// Wraps a state so the BinaryHeap pops the smallest distance first: the
// heap is a max-heap by default, so Ord is implemented inverted (the other
// entry compares first); distances are plain integers with a total order,
// so no NaN-style caveats apply.
#[derive(PartialEq)]
struct HeapEntry {
    dist: i64,
    node: usize,
    used: usize,
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
    // Excluding the first maximum-weight edge of a path equals excluding
    // any one designated edge (both give sum - maxweight), so Dijkstra
    // runs over states (node, excluded): staying in a layer pays the edge
    // weight, crossing layers excludes exactly one edge for free. A path
    // cost can reach (n - 1) * 5 * 10^4 ~ 2.5 * 10^9, past 32 bits, so
    // distances ride in i64.
    pub fn min_cost_excluding_max(n: i32, edges: Vec<Vec<i32>>) -> i64 {
        let n = n as usize;
        let mut adjacency: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        for edge in &edges {
            adjacency[edge[0] as usize].push((edge[1] as usize, edge[2] as i64));
            adjacency[edge[1] as usize].push((edge[0] as usize, edge[2] as i64));
        }

        const INF: i64 = i64::MAX;
        let mut best = vec![[INF, INF]; n];
        best[0][0] = 0;

        let mut heap = BinaryHeap::new();
        heap.push(HeapEntry {
            dist: 0,
            node: 0,
            used: 0,
        });
        while let Some(HeapEntry { dist, node, used }) = heap.pop() {
            if dist > best[node][used] {
                continue;
            }
            if node == n - 1 && used == 1 {
                return dist;
            }
            for &(neighbor, weight) in &adjacency[node] {
                let candidate = dist + weight;
                if candidate < best[neighbor][used] {
                    best[neighbor][used] = candidate;
                    heap.push(HeapEntry {
                        dist: candidate,
                        node: neighbor,
                        used,
                    });
                }
                if used == 0 && dist < best[neighbor][1] {
                    best[neighbor][1] = dist;
                    heap.push(HeapEntry {
                        dist,
                        node: neighbor,
                        used: 1,
                    });
                }
            }
        }
        panic!("unreachable: the graph is connected");
    }
}

use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn find_cheapest_price(n: i32, flights: Vec<Vec<i32>>, src: i32, dst: i32, k: i32) -> i32 {
        let n = n as usize;
        let src = src as usize;
        let dst = dst as usize;
        let mut graph: Vec<Vec<(usize, i32)>> = vec![Vec::new(); n];
        for flight in &flights {
            graph[flight[0] as usize].push((flight[1] as usize, flight[2]));
        }
        // State = (cost, node, flights taken). Carrying the count in the
        // state is what enforces the limit: a state that already used its
        // k+1 flights is never allowed to board another.
        let mut heap: BinaryHeap<Reverse<(i32, usize, usize)>> = BinaryHeap::new();
        heap.push(Reverse((0, src, 0)));
        let mut best = vec![usize::MAX; n];
        while let Some(Reverse((cost, node, edges))) = heap.pop() {
            // The heap pops in cost order, so the first dst pop is final.
            if node == dst {
                return cost;
            }
            // Dominance prune: a cheaper state that used no more flights was
            // already expanded here, so this one cannot lead anywhere new.
            if edges > best[node] {
                continue;
            }
            best[node] = edges;
            if edges < (k + 1) as usize {
                for &(nxt, price) in &graph[node] {
                    heap.push(Reverse((cost + price, nxt, edges + 1)));
                }
            }
        }
        -1
    }
}

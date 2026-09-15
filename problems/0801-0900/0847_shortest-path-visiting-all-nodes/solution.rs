use std::collections::VecDeque;

impl Solution {
    pub fn shortest_path_length(graph: Vec<Vec<i32>>) -> i32 {
        let n = graph.len();
        let full = (1usize << n) - 1;
        // Walks may revisit nodes, so the state is (node, visited
        // bitmask) — at most n * 2^n states; the -1 sentinel doubles
        // as the visited marker.
        let mut dist = vec![-1i32; n * (1 << n)];
        let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
        // Multi-source: seed every (i, 1 << i) at distance 0 and let
        // BFS discover the best starting node itself.
        for i in 0..n {
            dist[i * (1 << n) + (1 << i)] = 0;
            queue.push_back((i, 1usize << i));
        }
        while let Some((node, mask)) = queue.pop_front() {
            // First full mask popped is the shortest walk visiting
            // every node.
            if mask == full {
                return dist[node * (1 << n) + mask];
            }
            for &nxt in &graph[node] {
                // Stepping to a neighbor ORs in its bit; BFS explores
                // in nondecreasing distance, so the first reach of a
                // state carries the optimal count.
                let nxt = nxt as usize;
                let nmask = mask | (1usize << nxt);
                if dist[nxt * (1 << n) + nmask] == -1 {
                    dist[nxt * (1 << n) + nmask] = dist[node * (1 << n) + mask] + 1;
                    queue.push_back((nxt, nmask));
                }
            }
        }
        // Unreachable for the connected graphs the constraints promise.
        0
    }
}

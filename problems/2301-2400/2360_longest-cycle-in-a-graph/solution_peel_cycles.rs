impl Solution {
    pub fn longest_cycle(edges: Vec<i32>) -> i32 {
        let n = edges.len();
        // Count in-edges first; a node nobody points at is a queue seed.
        // edges[i] == -1 points nowhere and counts for nothing.
        let mut indeg = vec![0i32; n];
        for &v in &edges {
            if v != -1 {
                indeg[v as usize] += 1;
            }
        }
        // Kahn-style peel: repeatedly remove in-degree-0 nodes, dropping the
        // in-edge their out-edge contributed to a successor. What survives
        // the queue is exactly the set of cycle nodes.
        let mut queue: Vec<usize> = Vec::new();
        for u in 0..n {
            if indeg[u] == 0 {
                queue.push(u);
            }
        }
        let mut head = 0usize;
        while head < queue.len() {
            let u = queue[head];
            head += 1;
            let w = edges[u];
            if w != -1 {
                let wu = w as usize;
                indeg[wu] -= 1;
                if indeg[wu] == 0 {
                    queue.push(wu);
                }
            }
        }
        // Each survivor lies on a ring: walk it once, zeroing indeg as nodes
        // are counted so the walk stops exactly where it started.
        let mut best: i32 = -1;
        for start in 0..n {
            if indeg[start] == 0 {
                continue;
            }
            let mut ring: i32 = 0;
            let mut node = start;
            while indeg[node] > 0 {
                indeg[node] = 0;
                ring += 1;
                node = edges[node] as usize;
            }
            if ring > best {
                best = ring;
            }
        }
        best
    }
}

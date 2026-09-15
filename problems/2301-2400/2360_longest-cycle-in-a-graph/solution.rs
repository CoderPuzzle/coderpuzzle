impl Solution {
    pub fn longest_cycle(edges: Vec<i32>) -> i32 {
        let n = edges.len();
        // Three colors: 0 = unvisited, 1 = on the current walk, 2 = finished.
        let mut color = vec![0i32; n];
        let mut step = vec![0i64; n];
        let mut timer: i64 = 1;
        let mut best: i32 = -1;
        for start in 0..n {
            if color[start] != 0 {
                continue;
            }
            let mut node = start as i32;
            let mut path: Vec<usize> = Vec::new();
            // Out-degree <= 1 means rho shapes: walk until dead-end (-1),
            // a finished node, or a node on the current walk (a cycle).
            while node != -1 && color[node as usize] == 0 {
                let u = node as usize;
                color[u] = 1;
                step[u] = timer;
                timer += 1;
                path.push(u);
                node = edges[u];
            }
            // Landing on color 1 means we looped back into this walk; the
            // cycle length is the steps taken since that node was stamped.
            if node != -1 && color[node as usize] == 1 {
                let len = (timer - step[node as usize]) as i32;
                if len > best {
                    best = len;
                }
            }
            // Mark the whole walk finished so later starts never re-walk it.
            for &v in &path {
                color[v] = 2;
            }
        }
        best
    }
}

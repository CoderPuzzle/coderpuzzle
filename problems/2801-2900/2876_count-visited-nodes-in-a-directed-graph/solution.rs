impl Solution {
    pub fn count_visited_nodes(edges: Vec<i32>) -> Vec<i32> {
        let n = edges.len();
        let mut state = vec![0i32; n]; // 0 unvisited, 1 on the current path, 2 resolved
        let mut ans = vec![0i32; n];

        for start in 0..n {
            if state[start] == 2 {
                continue;
            }
            let mut path: Vec<usize> = Vec::new();
            let mut cur = start;
            while state[cur] == 0 {
                state[cur] = 1;
                path.push(cur);
                cur = edges[cur] as usize;
            }
            if state[cur] == 1 {
                // A cycle was discovered; find its start inside path.
                let cycle_start = path.iter().position(|&node| node == cur).unwrap();
                let length = (path.len() - cycle_start) as i32;
                for &node in &path[cycle_start..] {
                    ans[node] = length;
                    state[node] = 2;
                }
                for depth in 0..cycle_start {
                    let node = path[depth];
                    ans[node] = length + (cycle_start - depth) as i32;
                    state[node] = 2;
                }
            } else {
                // path leads into an already-resolved component.
                let base = ans[cur];
                for depth in 0..path.len() {
                    let node = path[depth];
                    ans[node] = base + (path.len() - depth) as i32;
                    state[node] = 2;
                }
            }
        }
        ans
    }
}

impl Solution {
    pub fn largest_path_value(colors: String, edges: Vec<Vec<i32>>) -> i32 {
        let colors = colors.as_bytes();
        let n = colors.len();
        let mut graph: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut indeg = vec![0i32; n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            graph[a].push(b);
            indeg[b] += 1;
        }

        // dp[u][c] = max number of color-c nodes on any path ending at u.
        // Kahn's order guarantees every predecessor of u is finalized before
        // u is processed, so the row pushed out of u is final.
        let mut dp = vec![[0i32; 26]; n];
        let mut queue: std::collections::VecDeque<usize> = (0..n).filter(|&i| indeg[i] == 0).collect();
        let mut visited = 0i32;
        let mut ans = 0i32;
        while let Some(u) = queue.pop_front() {
            visited += 1;
            // u extends every incoming path, so count its own color.
            dp[u][(colors[u] - b'a') as usize] += 1;
            let du = dp[u];
            // A valid path may end at any node — the row's best entry is a
            // candidate (this is what lets single-node paths count).
            for c in 0..26 {
                if du[c] > ans {
                    ans = du[c];
                }
            }
            for &v in &graph[u] {
                // Element-wise max-merge into the neighbor's row.
                for c in 0..26 {
                    if du[c] > dp[v][c] {
                        dp[v][c] = du[c];
                    }
                }
                indeg[v] -= 1;
                if indeg[v] == 0 {
                    queue.push_back(v);
                }
            }
        }
        // Nodes on or downstream of a cycle never reach indegree zero.
        if visited != n as i32 {
            -1
        } else {
            ans
        }
    }
}

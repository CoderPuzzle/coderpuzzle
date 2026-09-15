impl Solution {
    pub fn longest_special_path(edges: Vec<Vec<i32>>, nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut adj: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            let w = e[2] as i64;
            adj[u].push((v, w));
            adj[v].push((u, w));
        }

        let mut best_len: i64 = 0;
        let mut best_nodes: i64 = 1; // a single node is always a valid special path
        let mut dist_path: Vec<i64> = Vec::new();
        // value -> depth of last occurrence
        let mut last: std::collections::HashMap<i32, i64> = std::collections::HashMap::new();
        let mut start_depth: i64 = 0;
        let mut last_restore: Vec<i64> = Vec::new();
        let mut start_restore: Vec<i64> = Vec::new();

        // Events on an explicit stack: (node, parent, depth, dist, is_exit)
        let mut st: Vec<(usize, i64, i64, i64, u8)> = vec![(0, -1, 0, 0, 0)];
        while let Some((u, par, depth, d, is_exit)) = st.pop() {
            if is_exit == 1 {
                dist_path.pop();
                let val = nums[u];
                let prev_last = last_restore.pop().unwrap();
                if prev_last >= 0 {
                    last.insert(val, prev_last);
                } else {
                    last.remove(&val);
                }
                start_depth = start_restore.pop().unwrap();
                continue;
            }
            // Enter node u.
            dist_path.push(d);
            let val = nums[u];
            let prev_last = *last.get(&val).unwrap_or(&-1);
            last_restore.push(prev_last);
            start_restore.push(start_depth);
            if prev_last >= start_depth {
                start_depth = prev_last + 1;
            }
            last.insert(val, depth);
            let length = d - dist_path[start_depth as usize];
            let nodes = depth - start_depth + 1;
            if length > best_len {
                best_len = length;
                best_nodes = nodes;
            } else if length == best_len && nodes < best_nodes {
                best_nodes = nodes;
            }
            st.push((u, par, depth, d, 1));
            for &(v, w) in &adj[u] {
                if (v as i64) != par {
                    st.push((v, u as i64, depth + 1, d + w, 0));
                }
            }
        }
        vec![best_len as i32, best_nodes as i32]
    }
}

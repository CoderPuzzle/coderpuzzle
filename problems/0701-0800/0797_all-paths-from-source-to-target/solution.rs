impl Solution {
    pub fn all_paths_source_target(graph: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let g: Vec<Vec<usize>> = graph
            .iter()
            .map(|row| row.iter().map(|&x| x as usize).collect())
            .collect();
        let target = g.len() - 1;
        let mut paths: Vec<Vec<i32>> = Vec::new();
        let mut path: Vec<i32> = vec![0];

        // The graph is acyclic, so every walk from 0 is a simple
        // path and DFS can never loop; at the target, snapshot a
        // copy and stop.
        fn dfs(g: &Vec<Vec<usize>>, target: usize, node: usize, path: &mut Vec<i32>, paths: &mut Vec<Vec<i32>>) {
            if node == target {
                paths.push(path.clone());
                return;
            }
            for &nxt in &g[node] {
                // Backtrack: pop after returning so sibling branches
                // each see a clean path. No visited set is needed —
                // paths legitimately share prefixes.
                path.push(nxt as i32);
                dfs(g, target, nxt, path, paths);
                path.pop();
            }
        }

        dfs(&g, target, 0, &mut path, &mut paths);
        paths
    }
}

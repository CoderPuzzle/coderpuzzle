impl Solution {
    pub fn count_components(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        // Both directions per edge: the graph is undirected, so each
        // endpoint must list the other among its neighbors.
        let n = n as usize;
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let (a, b) = (e[0] as usize, e[1] as usize);
            adjacency[a].push(b);
            adjacency[b].push(a);
        }
        let mut visited = vec![false; n];
        let mut components = 0;
        for start in 0..n {
            if visited[start] {
                continue;
            }
            // An unvisited node during the sweep starts a new component;
            // this one traversal absorbs exactly one component.
            components += 1;
            visited[start] = true;
            let mut stack: Vec<usize> = Vec::new();
            stack.push(start);
            while let Some(node) = stack.pop() {
                for &other in &adjacency[node] {
                    if !visited[other] {
                        // Mark at push time so no node is stacked twice;
                        // membership is by visitation, so a node shared by
                        // many edges is still discovered exactly once.
                        visited[other] = true;
                        stack.push(other);
                    }
                }
            }
        }
        components
    }
}

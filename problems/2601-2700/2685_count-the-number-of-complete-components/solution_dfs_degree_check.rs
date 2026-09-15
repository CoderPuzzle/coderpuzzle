impl Solution {
    pub fn count_complete_components(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        // Both directions per edge: the graph is undirected, so each
        // endpoint must list the other among its neighbors.
        let n = n as usize;
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        for edge in &edges {
            let (a, b) = (edge[0] as usize, edge[1] as usize);
            adjacency[a].push(b);
            adjacency[b].push(a);
        }
        let mut visited = vec![false; n];
        let mut complete = 0;
        for start in 0..n {
            if visited[start] {
                continue;
            }
            // An unclaimed vertex opens a fresh component; one flood
            // collects exactly that component and nothing else.
            visited[start] = true;
            let mut stack: Vec<usize> = vec![start];
            let mut component: Vec<usize> = Vec::new();
            while let Some(node) = stack.pop() {
                component.push(node);
                for &other in &adjacency[node] {
                    if !visited[other] {
                        // Mark at push time so no vertex is stacked twice.
                        visited[other] = true;
                        stack.push(other);
                    }
                }
            }
            // A component of k vertices is fully wired exactly when every
            // member is adjacent to all k - 1 others.
            let k = component.len();
            if component.iter().all(|&node| adjacency[node].len() == k - 1) {
                complete += 1;
            }
        }
        complete as i32
    }
}

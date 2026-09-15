impl Solution {
    pub fn find_smallest_set_of_vertices(n: i32, edges: Vec<Vec<i32>>) -> Vec<i32> {
        // A node with no incoming edge can only ever be reached by itself,
        // so it must be a starting vertex. Every other node has at least
        // one incoming edge and is therefore reachable from wherever that
        // edge originates, so the in-degree-zero nodes are also sufficient.
        let n = n as usize;
        let mut in_degree = vec![0i32; n];
        for edge in &edges {
            in_degree[edge[1] as usize] += 1;
        }
        (0..n as i32).filter(|&node| in_degree[node as usize] == 0).collect()
    }
}

impl Solution {
    pub fn critical_connections(n: i32, connections: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let n = n as usize;
        let mut graph: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &connections {
            let a = e[0] as usize;
            let b = e[1] as usize;
            graph[a].push(b);
            graph[b].push(a);
        }

        let mut disc: Vec<i32> = vec![-1; n];
        let mut low: Vec<i32> = vec![0; n];
        let mut timer: i32 = 0;
        let mut bridges: Vec<Vec<i32>> = Vec::new();

        fn dfs(
            u: usize,
            parent: i32,
            graph: &Vec<Vec<usize>>,
            disc: &mut Vec<i32>,
            low: &mut Vec<i32>,
            timer: &mut i32,
            bridges: &mut Vec<Vec<i32>>,
        ) {
            // Tarjan bridge finding: disc is the DFS discovery time, low the
            // earliest discovery reachable from u's subtree via tree edges
            // plus at most one back edge
            disc[u] = *timer;
            low[u] = *timer;
            *timer += 1;
            for &v in graph[u].iter() {
                if disc[v] == -1 {
                    dfs(v, u as i32, graph, disc, low, timer, bridges);
                    // fold the child's reach upward
                    if low[v] < low[u] {
                        low[u] = low[v];
                    }
                    // bridge iff v's subtree cannot see past u: this tree
                    // edge is the only route between the two sides
                    if low[v] > disc[u] {
                        let (a, b) = if u < v { (u, v) } else { (v, u) };
                        bridges.push(vec![a as i32, b as i32]);
                    }
                } else if v as i32 != parent {
                    // back edge to a non-parent ancestor relaxes low;
                    // skipping the parent matters — that edge is the tree
                    // edge itself
                    if disc[v] < low[u] {
                        low[u] = disc[v];
                    }
                }
            }
        }

        // graph is connected, so one root reaches every server
        dfs(0, -1, &graph, &mut disc, &mut low, &mut timer, &mut bridges);
        // sort only for a deterministic output order
        bridges.sort_unstable();
        bridges
    }
}

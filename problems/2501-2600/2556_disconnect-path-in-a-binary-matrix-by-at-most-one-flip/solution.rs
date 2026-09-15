use std::collections::VecDeque;

impl Solution {
    pub fn is_possible_to_cut_path(grid: Vec<Vec<i32>>) -> bool {
        // Only a 1->0 flip can ever help, so the game is decided by
        // vertex cuts of the monotone 1-cell DAG: at most one flip
        // succeeds exactly when fewer than two vertex-disjoint
        // corner-to-corner paths exist (Menger). Unit vertex capacities
        // come from the standard in/out split; cells off any
        // root-to-corner route are skipped outright. Augmenting BFS
        // stops early once flow 2 proves the answer false, so at most
        // two searches ever run.
        let m = grid.len();
        let n = grid[0].len();
        let count = m * n;
        let inf = count + 2;
        let mut arcs_to: Vec<usize> = Vec::new();
        let mut arcs_cap: Vec<usize> = Vec::new();
        let mut graph: Vec<Vec<usize>> = vec![Vec::new(); 2 * count];
        let mut connect = |u: usize, v: usize, cap: usize| {
            graph[u].push(arcs_to.len());
            arcs_to.push(v);
            arcs_cap.push(cap);
            graph[v].push(arcs_to.len());
            arcs_to.push(u);
            arcs_cap.push(0);
        };
        for i in 0..m {
            for j in 0..n {
                if grid[i][j] == 0 {
                    continue;
                }
                let cell = i * n + j;
                let corner = (i == 0 && j == 0) || (i == m - 1 && j == n - 1);
                connect(2 * cell, 2 * cell + 1, if corner { inf } else { 1 });
                if j + 1 < n && grid[i][j + 1] == 1 {
                    connect(2 * cell + 1, 2 * (cell + 1), inf);
                }
                if i + 1 < m && grid[i + 1][j] == 1 {
                    connect(2 * cell + 1, 2 * (cell + n), inf);
                }
            }
        }
        let source = 0usize;
        let sink = 2 * (count - 1) + 1;
        const NONE: usize = usize::MAX;
        let mut total = 0;
        while total < 2 {
            let mut parent = vec![NONE; 2 * count];
            let mut via = vec![NONE; 2 * count];
            let mut queue = VecDeque::new();
            parent[source] = source;
            queue.push_back(source);
            while let Some(u) = queue.pop_front() {
                if parent[sink] != NONE {
                    break;
                }
                for &e in &graph[u] {
                    let v = arcs_to[e];
                    if arcs_cap[e] > 0 && parent[v] == NONE {
                        parent[v] = u;
                        via[v] = e;
                        queue.push_back(v);
                        if v == sink {
                            break;
                        }
                    }
                }
            }
            if parent[sink] == NONE {
                break;
            }
            let mut v = sink;
            while v != source {
                let e = via[v];
                arcs_cap[e] -= 1;
                arcs_cap[e ^ 1] += 1;
                v = parent[v];
            }
            total += 1;
        }
        total < 2
    }
}

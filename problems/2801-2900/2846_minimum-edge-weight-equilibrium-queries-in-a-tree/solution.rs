impl Solution {
    pub fn min_operations_queries(n: i32, edges: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        // Adjacency as flat per-node vectors of (node, weight) pairs: two
        // passes over the edge list.
        let mut degree = vec![0usize; n];
        for edge in &edges {
            degree[edge[0] as usize] += 1;
            degree[edge[1] as usize] += 1;
        }
        let mut adjacency: Vec<Vec<(usize, i32)>> = (0..n).map(|node| Vec::with_capacity(degree[node])).collect();
        for edge in &edges {
            let (u, v, w) = (edge[0] as usize, edge[1] as usize, edge[2] - 1);
            adjacency[u].push((v, w));
            adjacency[v].push((u, w));
        }

        // One breadth-first search from node 0 fills every static structure:
        // parent/depth and a parent-before-child order that both the weight
        // frequency prefixes and the lifting table consume in one sweep. The
        // queue keeps a 10^4-node path off the call stack.
        let mut parent = vec![0usize; n];
        let mut pweight = vec![0i32; n];
        let mut depth = vec![0usize; n];
        let mut seen = vec![false; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        seen[0] = true;
        order.push(0);
        let mut head = 0usize;
        while head < order.len() {
            let node = order[head];
            head += 1;
            for &(next, weight) in &adjacency[node] {
                if !seen[next] {
                    seen[next] = true;
                    parent[next] = node;
                    pweight[next] = weight;
                    depth[next] = depth[node] + 1;
                    order.push(next);
                }
            }
        }

        // Changing an edge to any value leaves other edges untouched, so an
        // operation fixes exactly one edge of the path and the answer is the
        // path length minus its most frequent edge weight. Weights live in
        // 1..26, so freq[w][v] counts weight-w edges from the root down to
        // v; on the a..b path that count is freq[a][w] + freq[b][w] - 2 *
        // freq[lca][w]: every edge above the lowest common ancestor appears
        // in both root paths and cancels, and the LCA's own incoming edge
        // cancels with itself.
        let mut freq = vec![vec![0i32; n]; 26];
        for index in 1..order.len() {
            let node = order[index];
            for w in 0..26 {
                freq[w][node] = freq[w][parent[node]];
            }
            freq[pweight[node] as usize][node] += 1;
        }

        // Binary lifting over the parent pointers: table[level][v] is the
        // 2^level-th ancestor of v (the root maps to itself), which makes
        // each query an O(log n) climb instead of a walk along the possibly
        // O(n) path. Every stored value stays below 2^17 << 2^31.
        let max_depth = *depth.iter().max().unwrap();
        let mut levels = 1usize;
        while (1usize << levels) <= max_depth {
            levels += 1;
        }
        let mut table: Vec<Vec<usize>> = Vec::with_capacity(levels);
        table.push(parent.clone());
        for level in 1..levels {
            let previous = &table[level - 1];
            table.push((0..n).map(|node| previous[previous[node]]).collect());
        }

        let mut answer: Vec<i32> = Vec::with_capacity(queries.len());
        for query in &queries {
            let (a, b) = (query[0] as usize, query[1] as usize);
            let (mut u, mut v) = (a, b);
            if depth[u] < depth[v] {
                std::mem::swap(&mut u, &mut v);
            }
            let mut diff = depth[u] - depth[v];
            let mut level = 0usize;
            while diff > 0 {
                if diff & 1 == 1 {
                    u = table[level][u];
                }
                diff >>= 1;
                level += 1;
            }
            let lca;
            if u != v {
                for level in (0..levels).rev() {
                    let row = &table[level];
                    if row[u] != row[v] {
                        u = row[u];
                        v = row[v];
                    }
                }
                lca = parent[u];
            } else {
                lca = u;
            }
            let mut best = -1i32;
            for w in 0..26 {
                let cnt = freq[w][a] + freq[w][b] - 2 * freq[w][lca];
                if cnt > best {
                    best = cnt;
                }
            }
            let path_length = (depth[a] + depth[b] - 2 * depth[lca]) as i32;
            answer.push(path_length - best);
        }
        answer
    }
}

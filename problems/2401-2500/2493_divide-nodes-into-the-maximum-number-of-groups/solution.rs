impl Solution {
    pub fn magnificent_sets(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut graph: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            graph[a].push(b);
            graph[b].push(a);
        }

        let mut visited = vec![false; n + 1];
        let mut total: i32 = 0;

        for start in 1..=n {
            if visited[start] {
                continue;
            }
            // collect the connected component
            let mut component: Vec<usize> = Vec::new();
            let mut stack: Vec<usize> = vec![start];
            visited[start] = true;
            while let Some(u) = stack.pop() {
                component.push(u);
                for &v in &graph[u] {
                    if !visited[v] {
                        visited[v] = true;
                        stack.push(v);
                    }
                }
            }

            let mut best: i32 = 0;
            let mut dist = vec![-1i32; n + 1];
            for &source in &component {
                for d in dist.iter_mut() {
                    *d = -1;
                }
                dist[source] = 0;
                let mut queue: Vec<usize> = vec![source];
                let mut max_depth: i32 = 0;
                let mut bipartite = true;
                let mut head = 0usize;
                while head < queue.len() {
                    let u = queue[head];
                    head += 1;
                    for &v in &graph[u] {
                        if dist[v] != -1 {
                            if dist[v] == dist[u] {
                                bipartite = false;
                            }
                        } else {
                            dist[v] = dist[u] + 1;
                            if dist[v] > max_depth {
                                max_depth = dist[v];
                            }
                            queue.push(v);
                        }
                    }
                }
                if !bipartite {
                    return -1;
                }
                if max_depth > best {
                    best = max_depth;
                }
            }
            total += best + 1;
        }

        total
    }
}

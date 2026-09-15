impl Solution {
    pub fn count_pairs(n: i32, edges: Vec<Vec<i32>>) -> i64 {
        let n = n as usize;
        // components answer the question: all C(n, 2) pairs minus the pairs
        // inside one component, so enumerate each component exactly once
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            // an undirected edge is walkable both ways, so each endpoint
            // records the other as a neighbour
            let (a, b) = (e[0] as usize, e[1] as usize);
            adj[a].push(b);
            adj[b].push(a);
        }

        let mut visited = vec![false; n];
        // a flat Vec with a read cursor serves as the queue: push is the
        // push, the advancing cursor the pop. The walk is iterative end to
        // end -- recursive DFS would overflow the stack on one long component
        let mut queue: Vec<usize> = Vec::with_capacity(n);
        let total_pairs = n as i64 * (n as i64 - 1) / 2;
        let mut reachable: i64 = 0;
        for seed in 0..n {
            if visited[seed] {
                continue;
            }
            visited[seed] = true;
            queue.clear();
            queue.push(seed);
            // marking a node when it is enqueued, not when it is dequeued,
            // keeps every node in the queue exactly once
            let mut head = 0;
            while head < queue.len() {
                let u = queue[head];
                head += 1;
                for &v in &adj[u] {
                    if !visited[v] {
                        visited[v] = true;
                        queue.push(v);
                    }
                }
            }
            // the queue now holds precisely this component: its size*(size-1)/2
            // internal pairs are exactly the reachable pairs it contributes
            let size = queue.len() as i64;
            reachable += size * (size - 1) / 2;
        }
        // whatever remains of C(n, 2) counts each unreachable pair once
        total_pairs - reachable
    }
}

impl Solution {
    pub fn leads_to_destination(n: i32, edges: Vec<Vec<i32>>, source: i32, destination: i32) -> bool {
        let n = n as usize;
        let source = source as usize;
        let destination = destination as usize;
        let mut graph = vec![Vec::<usize>::new(); n];
        for edge in edges {
            graph[edge[0] as usize].push(edge[1] as usize);
        }

        // 0 = unvisited (white), 1 = on the current DFS path (gray), 2 = fully
        // verified safe (black). A node is a leaf when it has no outgoing
        // edges; a leaf is safe only if it is the destination. The
        // destination itself must also be a true leaf -- if it has outgoing
        // edges, any path through it keeps going and can only end somewhere
        // else (or loop forever), so it is unsafe the moment it is reached.
        const WHITE: u8 = 0;
        const GRAY: u8 = 1;
        const BLACK: u8 = 2;
        let mut state = vec![WHITE; n];

        // Returns a decided verdict for a leaf or for the destination
        // itself; None means the node needs a full DFS expansion first.
        let leaf_verdict = |graph: &Vec<Vec<usize>>, node: usize| -> Option<bool> {
            if graph[node].is_empty() {
                return Some(node == destination);
            }
            if node == destination {
                return Some(false);
            }
            None
        };

        if let Some(verdict) = leaf_verdict(&graph, source) {
            return verdict;
        }

        // Explicit stack of (node, next child index) frames -- an iterative
        // post-order DFS so the recursion depth never depends on graph depth.
        state[source] = GRAY;
        let mut stack: Vec<(usize, usize)> = vec![(source, 0)];
        while let Some(&(node, idx)) = stack.last() {
            if idx == graph[node].len() {
                state[node] = BLACK;
                stack.pop();
                continue;
            }
            let neighbor = graph[node][idx];
            stack.last_mut().unwrap().1 += 1;
            if state[neighbor] == GRAY {
                return false; // back edge to a node on the current path: a cycle
            }
            if state[neighbor] == BLACK {
                continue; // already proven safe on an earlier branch
            }
            match leaf_verdict(&graph, neighbor) {
                Some(false) => return false,
                Some(true) => {
                    state[neighbor] = BLACK;
                    continue;
                }
                None => {
                    state[neighbor] = GRAY;
                    stack.push((neighbor, 0));
                }
            }
        }
        true
    }
}

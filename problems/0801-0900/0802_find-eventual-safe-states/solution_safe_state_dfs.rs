impl Solution {
    pub fn eventual_safe_nodes(graph: Vec<Vec<i32>>) -> Vec<i32> {
        let n = graph.len();
        // Memoized DFS on the graph as given: ask each node directly whether
        // every walk from it terminates, and cache the verdict. The stack is
        // explicit, so a 10^4-deep chain cannot overflow recursion.
        const UNVISITED: u8 = 0;
        const VISITING: u8 = 1;
        const SAFE: u8 = 2;
        const UNSAFE: u8 = 3;
        let mut state = vec![UNVISITED; n];
        // Per-node scratch for the active frame; a node sits on the stack at
        // most once, so node indexing works for the cursor and the flag.
        let mut next = vec![0usize; n];
        let mut unsafe_child = vec![false; n];
        for start in 0..n {
            if state[start] != UNVISITED {
                continue; // verdict already memoized by an earlier start
            }
            state[start] = VISITING;
            let mut stack: Vec<usize> = vec![start];
            while !stack.is_empty() {
                let u = stack[stack.len() - 1];
                if next[u] < graph[u].len() {
                    let v = graph[u][next[u]] as usize;
                    next[u] += 1;
                    if state[v] == VISITING {
                        // Back edge onto the current path: a cycle runs
                        // through it, so this successor is never safe.
                        unsafe_child[u] = true;
                    } else if state[v] == UNVISITED {
                        state[v] = VISITING;
                        stack.push(v);
                    } else if state[v] == UNSAFE {
                        // Memoized danger feeds straight back.
                        unsafe_child[u] = true;
                    }
                    // A SAFE successor clears the bar on its own.
                } else {
                    stack.pop();
                    state[u] = if unsafe_child[u] { UNSAFE } else { SAFE };
                    if unsafe_child[u] && !stack.is_empty() {
                        // Danger propagates up: the node below reached it.
                        unsafe_child[stack[stack.len() - 1]] = true;
                    }
                }
            }
        }
        // The ascending scan yields the required sorted order.
        (0..n).filter(|&i| state[i] == SAFE).map(|i| i as i32).collect()
    }
}

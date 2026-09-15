impl Solution {
    pub fn possible_bipartition(n: i32, dislikes: Vec<Vec<i32>>) -> bool {
        let n = n as usize;
        // Dislike is symmetric, so build an undirected adjacency list: a
        // valid two-group split is exactly a 2-coloring of this graph.
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        for d in &dislikes {
            let a = d[0] as usize;
            let b = d[1] as usize;
            adjacency[a].push(b);
            adjacency[b].push(a);
        }

        let mut color = vec![0i32; n + 1]; // 0 = uncolored, 1 / -1 = the two groups

        // The dislike graph may be disconnected, so the scan restarts the
        // DFS from every still-uncolored person; each run colors one
        // whole connected component.
        for start in 1..=n {
            if color[start] != 0 {
                continue;
            }
            color[start] = 1;
            // The stack drives a depth-first sweep: pop a person, then
            // push every uncolored neighbor with the opposite color
            // (marking on push); a neighbor already sharing the current
            // color closes an odd cycle, so no split exists.
            let mut stack: Vec<usize> = Vec::new();
            stack.push(start);
            while let Some(person) = stack.pop() {
                for &neighbor in &adjacency[person] {
                    if color[neighbor] == 0 {
                        color[neighbor] = -color[person];
                        stack.push(neighbor);
                    } else if color[neighbor] == color[person] {
                        return false;
                    }
                }
            }
        }
        true
    }
}

impl Solution {
    pub fn minimum_flips(n: i32, edges: Vec<Vec<i32>>, start: String, target: String) -> Vec<i32> {
        let n = n as usize;
        let mut adjacency: Vec<Vec<(usize, usize)>> = vec![Vec::new(); n];
        for (index, edge) in edges.iter().enumerate() {
            let (u, v) = (edge[0] as usize, edge[1] as usize);
            adjacency[u].push((v, index));
            adjacency[v].push((u, index));
        }

        // Breadth-first discovery from node 0 records each node's parent
        // and the edge leading to it; an explicit queue keeps deep trees
        // off the call stack.
        let mut parent = vec![usize::MAX; n];
        let mut parent_edge = vec![0_usize; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        order.push(0);
        let mut index = 0;
        while index < order.len() {
            let node = order[index];
            index += 1;
            for &(neighbor, edge) in &adjacency[node] {
                if neighbor != parent[node] {
                    parent[neighbor] = node;
                    parent_edge[neighbor] = edge;
                    order.push(neighbor);
                }
            }
        }

        // need[node] stays 1 while the node's flip parity is unmatched.
        let start = start.as_bytes();
        let target = target.as_bytes();
        let mut need = vec![0_u8; n];
        for x in 0..n {
            need[x] = if start[x] != target[x] { 1 } else { 0 };
        }
        let mut take = vec![false; n - 1];
        for &node in order[1..].iter().rev() {
            if need[node] == 1 {
                // Children are done, so the parent edge is the only
                // remaining toggle touching this node: the choice is
                // forced, and the unmatched parity moves to the parent.
                take[parent_edge[node]] = true;
                need[parent[node]] ^= 1;
            }
        }
        // Whatever parity survives at the root cannot be fixed anywhere.
        if need[0] == 1 {
            return vec![-1];
        }
        // A final ascending scan emits the chosen indices in order.
        (0..n - 1)
            .filter(|&index| take[index])
            .map(|index| index as i32)
            .collect()
    }
}

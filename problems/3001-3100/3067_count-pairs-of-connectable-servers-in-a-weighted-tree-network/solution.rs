impl Solution {
    pub fn count_pairs_of_connectable_servers(edges: Vec<Vec<i32>>, signalSpeed: i32) -> Vec<i32> {
        let n = edges.len() + 1;
        let s = signalSpeed as usize;
        let mut adj: Vec<Vec<(usize, usize)>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].push((b, e[2] as usize));
            adj[b].push((a, e[2] as usize));
        }

        // For each server c, flood every branch (one component per neighbor)
        // separately, counting the servers whose distance from c is divisible
        // by signalSpeed. Two paths out of c share an edge exactly when they
        // leave along the same first edge, so cross-branch pairs are exactly
        // the connectable ones; c itself sits in no branch. A parent guard
        // prevents revisits -- sufficient in a tree -- and the explicit
        // stack keeps the walk off the call stack.
        let mut answer = vec![0i32; n];
        for c in 0..n {
            let mut total = 0usize;
            let mut square_sum = 0usize;
            for &(root_v, root_w) in &adj[c] {
                let mut count = 0usize;
                let mut stack = vec![(root_v, c, root_w % s)];
                while let Some((u, parent, dist)) = stack.pop() {
                    if dist == 0 {
                        count += 1;
                    }
                    for &(v, w) in &adj[u] {
                        if v != parent {
                            stack.push((v, u, (dist + w) % s));
                        }
                    }
                }
                total += count;
                square_sum += count * count;
            }
            // Cross-branch pairs: sum of cnt_i * cnt_j over i < j.
            answer[c] = ((total * total - square_sum) / 2) as i32;
        }
        answer
    }
}

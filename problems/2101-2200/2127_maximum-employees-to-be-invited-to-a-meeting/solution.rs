impl Solution {
    pub fn maximum_invitations(favorite: Vec<i32>) -> i32 {
        let n = favorite.len();
        // favorite defines a functional graph: disjoint cycles with in-trees
        // hanging off them.
        let mut indeg = vec![0i32; n];
        for &f in &favorite {
            indeg[f as usize] += 1;
        }

        // Kahn-style peel of the acyclic nodes: after it, depth[v] is the
        // node count of the longest chain of non-cycle employees leading
        // directly into v (at least 1 — itself), i.e. the arm length a
        // 2-cycle can absorb on that side.
        let mut depth = vec![1i64; n];
        let mut queue: Vec<usize> = Vec::with_capacity(n);
        for i in 0..n {
            if indeg[i] == 0 {
                queue.push(i);
            }
        }
        let mut head = 0usize;
        while head < queue.len() {
            let u = queue[head];
            head += 1;
            let v = favorite[u] as usize;
            if depth[u] + 1 > depth[v] {
                depth[v] = depth[u] + 1;
            }
            indeg[v] -= 1;
            if indeg[v] == 0 {
                queue.push(v);
            }
        }

        // Whatever still has positive indegree is a cycle node. A seating is
        // either one whole cycle >= 3 (outsiders can't join: every neighbor
        // seat is taken) or 2-cycles with both chains — and several pairs can
        // share one table, so those add up.
        let mut max_cycle: i64 = 0;
        let mut pair_sum: i64 = 0;
        let mut visited = vec![false; n];
        for i in 0..n {
            if indeg[i] > 0 && !visited[i] {
                let mut cycle_len: i64 = 0;
                let mut cur = i;
                while !visited[cur] {
                    visited[cur] = true;
                    cycle_len += 1;
                    cur = favorite[cur] as usize;
                }
                if cycle_len == 2 {
                    // The pair sits together; each side takes one chain.
                    pair_sum += depth[i] + depth[favorite[i] as usize];
                } else if cycle_len > max_cycle {
                    max_cycle = cycle_len;
                }
            }
        }
        std::cmp::max(max_cycle, pair_sum) as i32
    }
}

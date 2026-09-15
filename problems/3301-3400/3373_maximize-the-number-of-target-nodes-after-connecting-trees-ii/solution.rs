impl Solution {
    // In a tree, distance parity is the difference of depth parities, so
    // the nodes target to u are exactly u's own bipartition class and a
    // second-tree node v contributes its opposite class. One iterative
    // BFS per tree (a 1e5-node path would overflow the judged stack)
    // labels each node's parity and sizes both classes: answer[i] is
    // tree 1's class size at i's parity, plus tree 2's larger class —
    // the maximum opposite-class count over every connection node,
    // identical for every i.
    pub fn max_target_nodes(edges1: Vec<Vec<i32>>, edges2: Vec<Vec<i32>>) -> Vec<i32> {
        let counts2 = Self::classify(&edges2);
        let best2 = counts2[0].max(counts2[1]);
        let counts1 = Self::classify(&edges1);
        let n = counts1.len() - 2;
        (0..n)
            .map(|u| {
                if counts1[u + 2] == 0 {
                    counts1[0] + best2
                } else {
                    counts1[1] + best2
                }
            })
            .collect()
    }

    // Slots 0/1 hold the two depth-parity class sizes, slots 2.. hold
    // each node's depth parity. Pointer-queue BFS — iterative, so deep
    // paths cannot overflow the stack.
    fn classify(edges: &Vec<Vec<i32>>) -> Vec<i32> {
        let n = edges.len() + 1;
        let mut adj = vec![Vec::new(); n];
        for e in edges {
            let (a, b) = (e[0] as usize, e[1] as usize);
            adj[a].push(b);
            adj[b].push(a);
        }
        let mut res = vec![0i32; n + 2];
        let mut parity = vec![-1i32; n];
        parity[0] = 0;
        res[0] = 1;
        let mut queue = vec![0usize; n];
        let (mut head, mut tail) = (0usize, 1usize);
        while head < tail {
            let u = queue[head];
            head += 1;
            for &w in &adj[u] {
                if parity[w] < 0 {
                    parity[w] = parity[u] ^ 1;
                    res[parity[w] as usize] += 1;
                    queue[tail] = w;
                    tail += 1;
                }
            }
        }
        res[2..].copy_from_slice(&parity);
        res
    }
}

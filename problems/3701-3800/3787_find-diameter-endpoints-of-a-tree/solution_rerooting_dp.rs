impl Solution {
    pub fn find_special_nodes(n: i32, edges: Vec<Vec<i32>>) -> String {
        let n = n as usize;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        // Root at node 0 and sweep once for a BFS order plus parents: children
        // always sit after their parent in the order, and both passes lean on it.
        let mut parent = vec![-1i32; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        order.push(0);
        let mut head = 0;
        while head < order.len() {
            let u = order[head];
            head += 1;
            for &v in &adj[u] {
                if v as i32 != parent[u] {
                    parent[v] = u as i32;
                    order.push(v);
                }
            }
        }

        // Down pass, over the order reversed so each child is final before its
        // parent reads it: down[v] is the height of v's subtree. The top two
        // child chains ride along because the up pass must route around a
        // parent's best arm when the path re-enters through that arm.
        let mut down = vec![0i32; n];
        let mut second = vec![0i32; n];
        let mut best_child = vec![-1i32; n];
        for &v in order.iter().rev() {
            let p = parent[v];
            if p >= 0 {
                let p = p as usize;
                let chain = down[v] + 1;
                if chain > down[p] {
                    second[p] = down[p];
                    down[p] = chain;
                    best_child[p] = v as i32;
                } else if chain > second[p] {
                    second[p] = chain;
                }
            }
        }

        // Up pass, forward over the order: up[v] is the longest path leaving
        // v's subtree through its parent, and max(down[v], up[v]) is v's
        // eccentricity. A sibling arm stands in for the parent's best arm
        // exactly when v owns that arm, which is why second was kept.
        let mut up = vec![0i32; n];
        let mut diameter = 0i32;
        for &v in order.iter() {
            let p = parent[v];
            if p >= 0 {
                let p = p as usize;
                let arm = if v as i32 == best_child[p] { second[p] } else { down[p] };
                up[v] = up[p].max(arm) + 1;
            }
            diameter = diameter.max(down[v]).max(up[v]);
        }

        // A node terminates a diameter exactly when its eccentricity equals
        // the tree's widest path, so compare and print.
        let mut out = String::with_capacity(n);
        for v in 0..n {
            out.push(if down[v].max(up[v]) == diameter { '1' } else { '0' });
        }
        out
    }
}

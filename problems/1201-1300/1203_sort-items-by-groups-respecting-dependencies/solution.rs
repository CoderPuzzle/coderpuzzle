impl Solution {
    pub fn sort_items(n: i32, m: i32, group: Vec<i32>, before_items: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut total = m as usize;
        let mut grp = group;
        for i in 0..n {
            if grp[i] == -1 {
                grp[i] = total as i32;
                total += 1;
            }
        }

        let mut item_adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut group_adj: Vec<Vec<usize>> = vec![Vec::new(); total];
        let mut group_indeg = vec![0usize; total];
        for i in 0..n {
            for &b in &before_items[i] {
                let b = b as usize;
                item_adj[b].push(i);
                let gb = grp[b] as usize;
                let gi = grp[i] as usize;
                if gb != gi {
                    group_adj[gb].push(gi);
                    group_indeg[gi] += 1;
                }
            }
        }

        // LIFO Kahn: stack initialized in descending id order so the smallest
        // zero-indegree id pops first; newly available nodes are pushed on top.
        fn kahn(keys: &[usize], adj: &[Vec<usize>], indeg: &[usize]) -> Option<Vec<usize>> {
            let mut ind = indeg.to_vec();
            let mut available: Vec<usize> = keys.iter().cloned().filter(|&k| ind[k] == 0).collect();
            available.sort_unstable_by(|a, b| b.cmp(a));
            let mut order: Vec<usize> = Vec::with_capacity(keys.len());
            while let Some(u) = available.pop() {
                order.push(u);
                for &v in &adj[u] {
                    ind[v] -= 1;
                    if ind[v] == 0 {
                        available.push(v);
                    }
                }
            }
            if order.len() == keys.len() {
                Some(order)
            } else {
                None
            }
        }

        let keys: Vec<usize> = (0..total).collect();
        let group_order = match kahn(&keys, &group_adj, &group_indeg) {
            Some(o) => o,
            None => return Vec::new(),
        };

        let mut items_in_group: Vec<Vec<usize>> = vec![Vec::new(); total];
        for i in 0..n {
            items_in_group[grp[i] as usize].push(i);
        }

        let mut result: Vec<i32> = Vec::with_capacity(n);
        let mut indeg2 = vec![0usize; n];
        let mut adj2: Vec<Vec<usize>> = vec![Vec::new(); n];
        for g in group_order {
            let nodes = &items_in_group[g];
            if nodes.is_empty() {
                continue;
            }
            for &u in nodes {
                indeg2[u] = 0;
                adj2[u].clear();
            }
            for &u in nodes {
                for &v in &item_adj[u] {
                    if grp[v] as usize == g {
                        adj2[u].push(v);
                        indeg2[v] += 1;
                    }
                }
            }
            match kahn(nodes, &adj2, &indeg2) {
                Some(order) => {
                    for x in order {
                        result.push(x as i32);
                    }
                }
                None => return Vec::new(),
            }
        }
        result
    }
}

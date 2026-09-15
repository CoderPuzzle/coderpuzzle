impl Solution {
    pub fn delete_tree_nodes(nodes: i32, parent: Vec<i32>, value: Vec<i32>) -> i32 {
        // Fold bottom-up: each node hands its parent its subtree sum and
        // the number of kept nodes below it — but only if its own subtree
        // sum survived as nonzero. A zero-sum subtree contributes nothing
        // to either, which is exactly the cascade: its values stop counting
        // toward every ancestor's sum too.
        let n = nodes as usize;
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        for i in 0..n {
            let p = parent[i];
            if p >= 0 {
                children[p as usize].push(i);
            }
        }
        let mut order: Vec<usize> = Vec::with_capacity(n);
        order.push(0);
        let mut head = 0;
        while head < order.len() {
            for &child in &children[order[head]] {
                order.push(child);
            }
            head += 1;
        }
        let mut sub_sum: Vec<i64> = value.iter().map(|&v| v as i64).collect();
        let mut kept = vec![1i32; n];
        for &node in order.iter().rev() {
            let p = parent[node];
            if p >= 0 && sub_sum[node] != 0 {
                let p = p as usize;
                sub_sum[p] += sub_sum[node];
                kept[p] += kept[node];
            }
        }
        if sub_sum[0] != 0 {
            kept[0]
        } else {
            0
        }
    }
}

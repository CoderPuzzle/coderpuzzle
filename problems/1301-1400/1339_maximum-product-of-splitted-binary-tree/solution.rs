impl Solution {
    pub fn max_product(root: Option<Box<TreeNode>>) -> i64 {
        // Arena decompose (preorder ids: children after parents), bottom-up
        // sums by reverse id order, then every non-root id scores the cut
        // s * (total - s), maximized before the modulo. No recursion, no
        // parent-pointer aliasing.
        const MOD: i64 = 1_000_000_007;
        let mut vals: Vec<i64> = Vec::new();
        let mut left: Vec<Option<usize>> = Vec::new();
        let mut right: Vec<Option<usize>> = Vec::new();
        let mut root_id = 0usize;
        let mut stack: Vec<(Option<Box<TreeNode>>, Option<(usize, u8)>)> = vec![(root, None)];
        while let Some((node, parent)) = stack.pop() {
            if let Some(mut node) = node {
                let id = vals.len();
                vals.push(node.val as i64);
                left.push(None);
                right.push(None);
                match parent {
                    Some((p, side)) => {
                        if side == 0 {
                            left[p] = Some(id);
                        } else {
                            right[p] = Some(id);
                        }
                    }
                    None => root_id = id,
                }
                stack.push((node.right.take(), Some((id, 1))));
                stack.push((node.left.take(), Some((id, 0))));
            }
        }
        let n = vals.len();
        let mut sums = vec![0i64; n];
        for id in (0..n).rev() {
            let mut total = vals[id];
            if let Some(c) = left[id] {
                total += sums[c];
            }
            if let Some(c) = right[id] {
                total += sums[c];
            }
            sums[id] = total;
        }
        let grand = sums[root_id];
        let mut best: i64 = 0;
        for id in 0..n {
            if id == root_id {
                continue;
            }
            let product = sums[id] * (grand - sums[id]);
            if product > best {
                best = product;
            }
        }
        best % MOD
    }
}

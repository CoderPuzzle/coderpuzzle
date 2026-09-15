use std::collections::HashMap;

impl Solution {
    pub fn maximum_average_subtree(root: Option<Box<TreeNode>>) -> f64 {
        // Pre-order listing: each descendant appears after its ancestor, so
        // the reversed listing settles both subtrees before the node above
        // them. Indices replace pointers as aggregate keys.
        let mut order: Vec<&TreeNode> = Vec::new();
        let mut stack: Vec<&TreeNode> = root.as_deref().into_iter().collect();
        while let Some(node) = stack.pop() {
            order.push(node);
            // Push right first so left is visited first in the listing.
            if let Some(right) = node.right.as_deref() {
                stack.push(right);
            }
            if let Some(left) = node.left.as_deref() {
                stack.push(left);
            }
        }
        let mut index: HashMap<*const TreeNode, usize> = HashMap::new();
        for (i, node) in order.iter().enumerate() {
            index.insert(*node as *const TreeNode, i);
        }
        // 64-bit sums: 1e4 nodes of value 1e5 reach 1e9, past i32 range.
        let mut total = vec![0i64; order.len()];
        let mut size = vec![0i64; order.len()];
        let mut best = 0.0f64;
        for i in (0..order.len()).rev() {
            let node = order[i];
            let mut sum = node.val as i64;
            let mut count = 1i64;
            if let Some(left) = node.left.as_deref() {
                let j = index[&(left as *const TreeNode)];
                sum += total[j];
                count += size[j];
            }
            if let Some(right) = node.right.as_deref() {
                let j = index[&(right as *const TreeNode)];
                sum += total[j];
                count += size[j];
            }
            total[i] = sum;
            size[i] = count;
            let average = sum as f64 / count as f64;
            if average > best {
                best = average;
            }
        }
        best
    }
}

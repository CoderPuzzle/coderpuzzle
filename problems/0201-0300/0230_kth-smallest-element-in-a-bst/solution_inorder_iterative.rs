impl Solution {
    pub fn kth_smallest(root: Option<Box<TreeNode>>, k: i32) -> i32 {
        // In-order traversal of a BST visits values in ascending order, so
        // the kth visit is the kth smallest. The explicit stack simulates the
        // recursion, keeping space proportional to the tree height.
        let mut stack: Vec<&TreeNode> = Vec::new();
        let mut node: Option<&TreeNode> = root.as_deref();
        let mut k = k;
        while node.is_some() || !stack.is_empty() {
            // Push and descend the left spine as far as possible.
            while let Some(n) = node {
                stack.push(n);
                node = n.left.as_deref();
            }
            // Left spine exhausted: popping is the "visit".
            let n = stack.pop().unwrap();
            k -= 1;
            // Early stop: the unvisited remainder is never touched.
            if k == 0 {
                return n.val;
            }
            node = n.right.as_deref();
        }
        -1
    }
}

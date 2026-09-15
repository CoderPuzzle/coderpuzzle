impl Solution {
    pub fn get_all_elements(root1: Option<Box<TreeNode>>, root2: Option<Box<TreeNode>>) -> Vec<i32> {
        // Iterative in-order walks produce two sorted lists (no recursion, so
        // a 5000-node skewed tree cannot overflow the stack), then a merge.
        let first = Self::inorder(root1);
        let second = Self::inorder(root2);
        let mut merged = Vec::with_capacity(first.len() + second.len());
        let (mut i, mut j) = (0, 0);
        while i < first.len() && j < second.len() {
            if first[i] <= second[j] {
                merged.push(first[i]);
                i += 1;
            } else {
                merged.push(second[j]);
                j += 1;
            }
        }
        merged.extend_from_slice(&first[i..]);
        merged.extend_from_slice(&second[j..]);
        merged
    }

    fn inorder(root: Option<Box<TreeNode>>) -> Vec<i32> {
        let mut values = Vec::new();
        let mut stack: Vec<Box<TreeNode>> = Vec::new();
        let mut node = root;
        while !stack.is_empty() || node.is_some() {
            while let Some(mut cur) = node {
                // Detach the left child before pushing, so `cur` can be moved
                // into the stack whole.
                node = cur.left.take();
                stack.push(cur);
            }
            if let Some(cur) = stack.pop() {
                values.push(cur.val);
                node = cur.right;
            }
        }
        values
    }
}

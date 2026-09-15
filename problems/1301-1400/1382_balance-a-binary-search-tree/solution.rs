impl Solution {
    pub fn balance_bst(root: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        // phase 1: iterative in-order walk flattens the BST into sorted
        // values (explicit stack dodges recursion limits on chain inputs)
        let mut values: Vec<i32> = Vec::new();
        let mut stack: Vec<Box<TreeNode>> = Vec::new();
        let mut current = root;
        while current.is_some() || !stack.is_empty() {
            while let Some(mut node) = current {
                current = node.left.take();
                stack.push(node);
            }
            let node = stack.pop().unwrap();
            values.push(node.val);
            current = node.right;
        }

        // midpoint as root leaves at most half the range per side (hi is
        // exclusive here), so subtree depths differ by <= 1
        fn build(values: &[i32], lo: usize, hi: usize) -> Option<Box<TreeNode>> {
            if lo >= hi {
                return None;
            }
            let mid = (lo + hi - 1) / 2;
            Some(Box::new(TreeNode {
                val: values[mid],
                left: build(values, lo, mid),
                right: build(values, mid + 1, hi),
            }))
        }

        build(&values, 0, values.len())
    }
}

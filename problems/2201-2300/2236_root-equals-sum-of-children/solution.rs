impl Solution {
    pub fn check_tree(root: Option<Box<TreeNode>>) -> bool {
        let node = root.expect("three-node tree");
        let (left, right) = (node.left.expect("left child"), node.right.expect("right child"));
        node.val == left.val + right.val
    }
}

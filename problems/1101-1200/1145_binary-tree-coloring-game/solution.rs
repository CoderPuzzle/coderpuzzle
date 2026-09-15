impl Solution {
    pub fn btree_game_winning_move(root: Option<Box<TreeNode>>, n: i32, x: i32) -> bool {
        fn find(node: &Option<Box<TreeNode>>, x: i32) -> Option<&TreeNode> {
            let node = node.as_deref()?;
            if node.val == x {
                return Some(node);
            }
            find(&node.left, x).or_else(|| find(&node.right, x))
        }
        fn count(node: &Option<Box<TreeNode>>) -> i32 {
            match node.as_deref() {
                None => 0,
                Some(n) => 1 + count(&n.left) + count(&n.right),
            }
        }
        let target = find(&root, x).expect("x is a node of the tree");
        let left = count(&target.left);
        let right = count(&target.right);
        let above = n - left - right - 1;
        // Grabbing the largest of the three regions wins iff it alone holds
        // the majority of all nodes.
        left.max(right).max(above) * 2 > n
    }
}

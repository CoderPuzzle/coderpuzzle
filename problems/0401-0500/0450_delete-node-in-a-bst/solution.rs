impl Solution {
    pub fn delete_node(root: Option<Box<TreeNode>>, key: i32) -> Option<Box<TreeNode>> {
        fn delete(node: Option<Box<TreeNode>>, key: i32) -> Option<Box<TreeNode>> {
            let mut node = match node {
                None => return None,
                Some(node) => node,
            };
            if key < node.val {
                // Descend by BST order, rewriting the child link so the
                // tree relinks itself on the way back up.
                let child = node.left.take();
                node.left = delete(child, key);
            } else if key > node.val {
                let child = node.right.take();
                node.right = delete(child, key);
            } else {
                // One-child (and leaf) cases: lift the whole remaining
                // subtree — it stays on the same side of every ancestor.
                let left = node.left.take();
                let right = node.right.take();
                if left.is_none() {
                    return right;
                }
                if right.is_none() {
                    return left;
                }
                // Two children: adopt the in-order successor's value
                // (minimum of the right subtree). It exceeds everything on
                // the left and is minimal in the right, so ordering holds.
                let mut successor = right.as_ref().unwrap();
                while let Some(next) = successor.left.as_ref() {
                    successor = next;
                }
                let successor_val = successor.val;
                node.val = successor_val;
                node.left = left;
                // Delete the duplicate successor; that recursive call lands
                // on a node with no left child, i.e. an easy splice.
                node.right = delete(right, successor_val);
            }
            Some(node)
        }

        delete(root, key)
    }
}

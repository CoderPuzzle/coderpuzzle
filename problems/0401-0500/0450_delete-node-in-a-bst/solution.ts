function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
    const del = (node: TreeNode | null, key: number): TreeNode | null => {
        if (node === null) {
            return null;
        }
        if (key < node.val) {
            // Descend by BST order, rewriting the child link so the tree
            // relinks itself on the way back up.
            node.left = del(node.left, key);
        } else if (key > node.val) {
            node.right = del(node.right, key);
        } else {
            // One-child (and leaf) cases: lift the whole remaining subtree —
            // it stays on the same side of every ancestor.
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }
            // Two children: adopt the in-order successor's value (minimum of
            // the right subtree). It exceeds everything on the left and is
            // minimal in the right, so the ordering is preserved.
            let successor = node.right;
            while (successor.left !== null) {
                successor = successor.left;
            }
            node.val = successor.val;
            // Delete the duplicate successor; that recursive call lands on a
            // node with no left child, i.e. an easy splice.
            node.right = del(node.right, successor.val);
        }
        return node;
    };

    return del(root, key);
}

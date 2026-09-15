function inorderSuccessor(root: TreeNode | null, p: number): TreeNode | null {
    // One descent from the root, remembering the last node the walk
    // stepped left from: it is the best successor candidate so far —
    // smaller than every earlier candidate, still greater than p.
    let successor: TreeNode | null = null;
    let node = root;
    while (node !== null) {
        if (p < node.val) {
            successor = node;
            node = node.left;
        } else if (p > node.val) {
            node = node.right;
        } else {
            // Found p: with a right child the successor is the leftmost
            // node of that subtree; without one it is the candidate the
            // walk already remembers. Neither exists -> null, p is the
            // largest value in the tree.
            node = node.right;
            while (node !== null) {
                successor = node;
                node = node.left;
            }
            break;
        }
    }
    return successor;
}

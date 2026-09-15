function recoverTree(root: TreeNode | null): TreeNode | null {
    const stack: TreeNode[] = [];
    let node: TreeNode | null = root;
    let prev: TreeNode | null = null;
    let first: TreeNode | null = null;
    let second: TreeNode | null = null;
    // Loop invariant: `stack` holds the ancestors whose left subtrees are
    // still being descended into; `node` is the next subtree to process
    // (null means it is time to pop back up instead). Inorder of a healthy
    // BST is strictly ascending, so a predecessor greater than its successor
    // marks a misplaced pair: the node before the FIRST descent and after
    // the LAST descent are the two swapped nodes.
    while (node !== null || stack.length > 0) {
        // Descend the left spine, remembering every node on it.
        while (node !== null) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop()!;
        if (prev !== null && prev.val > node.val) {
            if (first === null) {
                first = prev;
            }
            second = node;
        }
        prev = node;
        node = node.right;
    }
    // Swap only values: nodes and links stay put ("without changing its
    // structure"), and the repaired root flows back to the judge.
    const temp = first!.val;
    first!.val = second!.val;
    second!.val = temp;
    return root;
}

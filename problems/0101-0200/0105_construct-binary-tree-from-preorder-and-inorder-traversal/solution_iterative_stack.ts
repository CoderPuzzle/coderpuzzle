function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0) {
        return null;
    }
    const root = new TreeNode(preorder[0]!);
    // The spine: every node whose left side is (possibly still) growing and
    // whose right child is still pending. Preorder's next value is either
    // the spine top's left child, or the right child of whatever portion of
    // the spine inorder has already finished.
    const spine: TreeNode[] = [root];
    let cursor = 0; // next inorder entry awaiting its turn
    for (let i = 1; i < preorder.length; i++) {
        const value = preorder[i]!;
        if (spine[spine.length - 1]!.val !== inorder[cursor]) {
            // The top is not due yet, so the value keeps descending left.
            const node = new TreeNode(value);
            spine[spine.length - 1]!.left = node;
            spine.push(node);
        } else {
            // The top is due in inorder: its whole left side is settled, so
            // pop it (and any ancestors also due) -- the new value is the
            // right child of the deepest node popped.
            let last = spine.pop()!;
            cursor++;
            while (spine.length > 0 && spine[spine.length - 1]!.val === inorder[cursor]) {
                last = spine.pop()!;
                cursor++;
            }
            const node = new TreeNode(value);
            last.right = node;
            spine.push(node);
        }
    }
    return root;
}

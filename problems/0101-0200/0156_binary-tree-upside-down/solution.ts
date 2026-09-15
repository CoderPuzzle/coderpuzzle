function upsideDownBinaryTree(root: TreeNode | null): TreeNode | null {
    let node: TreeNode | null = root;
    let parent: TreeNode | null = null;
    let sibling: TreeNode | null = null;
    // Loop invariant: `node` walks the original left spine, `parent` is its
    // original parent and `sibling` its original right sibling; every spine
    // node already passed is fully relinked into its flipped orientation, so
    // the loop only ever reads original edges ahead of it.
    while (node !== null) {
        // Save both links before overwriting: `next` continues the spine
        // walk, `rightSave` is the sibling of the next spine node.
        const next: TreeNode | null = node.left;
        const rightSave: TreeNode | null = node.right;
        // The original right sibling becomes the new left child.
        node.left = sibling;
        // The original parent becomes the new right child.
        node.right = parent;
        parent = node;
        sibling = rightSave;
        node = next;
    }
    // The walk ends past the leftmost node; `parent` is that node — the new
    // root.
    return parent;
}

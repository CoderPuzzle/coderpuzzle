function findLeaves(root: TreeNode | null): number[][] {
    const groups: number[][] = [];
    // Post-order: each visit reports the height of the subtree rooted at
    // `node` (a leaf is height 0) and files the node's value into that
    // height's group as the recursion unwinds — collecting leaves round by
    // round is just sorting the nodes by height, and finishing the left
    // subtree before entering the right one pins each group to
    // left-to-right order.
    const height = (node: TreeNode | null): number => {
        if (node === null) {
            return -1;
        }
        const nodeHeight = 1 + Math.max(height(node.left), height(node.right));
        // A first sighting of a height always arrives after every smaller
        // height has been seen, so this grows the list by exactly one.
        if (nodeHeight === groups.length) {
            groups.push([]);
        }
        groups[nodeHeight].push(node.val);
        return nodeHeight;
    };
    height(root);
    return groups;
}

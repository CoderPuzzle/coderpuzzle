function goodNodes(root: TreeNode | null): number {
    let count = 0;
    // each entry carries the max value along its root-to-node path
    const stack: Array<[TreeNode, number]> = [[root, root.val]];
    while (stack.length > 0) {
        const [node, maxSoFar] = stack.pop()!;
        let currentMax = maxSoFar;
        // non-strict: a value equal to the path max is still good; raising
        // currentMax here means children see the true maximum of their path
        if (node.val >= currentMax) {
            count += 1;
            currentMax = node.val;
        }
        if (node.left !== null) {
            stack.push([node.left, currentMax]);
        }
        if (node.right !== null) {
            stack.push([node.right, currentMax]);
        }
    }
    return count;
}

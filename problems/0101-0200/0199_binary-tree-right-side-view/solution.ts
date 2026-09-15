function rightSideView(root: TreeNode | null): number[] {
    const view: number[] = [];
    const queue: TreeNode[] = [];
    if (root !== null) {
        queue.push(root);
    }
    while (queue.length > 0) {
        // One round of the outer loop consumes exactly one level: the
        // nodes sitting in the queue when the round starts.
        const level: number[] = [];
        const remaining = queue.length;
        for (let i = 0; i < remaining; ++i) {
            const node = queue.shift()!;
            level.push(node.val);
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        // A level was collected left to right, so its last value is the
        // one the right side sees.
        view.push(level[level.length - 1]);
    }
    return view;
}

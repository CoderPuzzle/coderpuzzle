function isPreorder(nodes: number[][]): boolean {
    // Stack of ancestors whose subtrees are still open. Popping until the
    // parent surfaces closes every subtree finished since the last visit;
    // an empty stack before that means the parent is gone for good.
    const stack: number[] = [];
    for (let i = 0; i < nodes.length; ++i) {
        const nodeId = nodes[i][0];
        const parentId = nodes[i][1];
        if (i === 0) {
            if (parentId !== -1) {
                return false;
            }
        } else {
            while (stack.length > 0 && stack[stack.length - 1] !== parentId) {
                stack.pop();
            }
            if (stack.length === 0) {
                return false;
            }
        }
        stack.push(nodeId);
    }
    return true;
}

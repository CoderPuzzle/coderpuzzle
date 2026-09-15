function diameter(root: Node | null): number {
    if (root === null) return 0;
    // best tracks the widest bend seen anywhere: the two tallest child
    // arms through some node plus the two edges that join them.
    let best = 0;
    // Returns the node's height -- its longest downward arm in edges.
    const height = (node: Node): number => {
        let first = -1;
        let second = -1;
        for (const child of node.children) {
            const arm = height(child);
            if (arm > first) {
                second = first;
                first = arm;
            } else if (arm > second) {
                second = arm;
            }
        }
        best = Math.max(best, first + second + 2);
        return first + 1;
    };
    height(root);
    return best;
}

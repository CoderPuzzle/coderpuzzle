function findMode(root: TreeNode | null): number[] {
    // Counting modes never needed the BST ordering: the modes are a
    // property of the multiset of values, whatever order a walk meets them
    // in. So this version takes the tree as an ordinary container — a
    // stack pops a node, tallies its value into a Map keyed by the value
    // itself, and pushes the children — and the Map, not adjacency, does
    // the bookkeeping. The walk stays iterative: the tree may be a single
    // 10^4-node chain, whose walk would nest 10000 calls — over the 512k
    // V8 stack this judge runs Node with.
    const counts = new Map<number, number>();
    const stack: TreeNode[] = [];
    if (root !== null) {
        stack.push(root);
    }
    while (stack.length > 0) {
        const node = stack.pop()!;
        counts.set(node.val, (counts.get(node.val) ?? 0) + 1);
        if (node.right !== null) {
            stack.push(node.right);
        }
        if (node.left !== null) {
            stack.push(node.left);
        }
    }

    // One pass over the Map finds the largest count; a second collects
    // every value that reaches it. A Map iterates in insertion order —
    // not the ascending order the streak walk gets for free from inorder
    // — so the survivors are sorted once at the end.
    let best = 0;
    for (const count of counts.values()) {
        best = Math.max(best, count);
    }
    const modes: number[] = [];
    for (const [value, count] of counts) {
        if (count === best) {
            modes.push(value);
        }
    }
    return modes.sort((a, b) => a - b);
}

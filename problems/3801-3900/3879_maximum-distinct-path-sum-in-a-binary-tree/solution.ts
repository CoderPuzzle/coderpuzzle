// Parent pointers let the DFS move up as well as down. Trying every node as a
// path start, the search only enters a neighbor whose value is not already on
// the current path — the seen set alone blocks the way back to the parent,
// since the parent is always on the path. Iterative with enter/exit markers,
// so a 1000-node chain cannot blow the call stack.
function maxSum(root: TreeNode | null): number {
    const parent = new Map<TreeNode, TreeNode | null>();
    parent.set(root, null);
    const nodes: TreeNode[] = [];
    const pending: (TreeNode | null)[] = [root];
    while (pending.length > 0) {
        const node = pending.pop();
        if (node === null) continue;
        nodes.push(node);
        if (node.left !== null) {
            parent.set(node.left, node);
            pending.push(node.left);
        }
        if (node.right !== null) {
            parent.set(node.right, node);
            pending.push(node.right);
        }
    }
    let best = -1e9;
    for (const start of nodes) {
        const seen = new Set<number>();
        const stack: [TreeNode, number, number][] = [[start, start.val, 0]]; // phase 0 enter
        while (stack.length > 0) {
            const [node, s, phase] = stack.pop()!;
            if (phase === 1) {
                seen.delete(node.val);
                continue;
            }
            seen.add(node.val);
            if (s > best) {
                best = s;
            }
            stack.push([node, s, 1]);
            const neighbors = [node.left, node.right, parent.get(node) ?? null];
            for (const next of neighbors) {
                if (next !== null && !seen.has(next.val)) {
                    stack.push([next, s + next.val, 0]);
                }
            }
        }
    }
    return best;
}

function amountOfTime(root: TreeNode | null, start: number): number {
    // Infection crosses one edge per minute in both directions, so the
    // answer is the maximum distance from `start` once parent edges are
    // added. BFS layers off an adjacency map measure it.
    const adj = new Map<number, number[]>();
    const link = (a: number, b: number): void => {
        if (!adj.has(a)) adj.set(a, []);
        if (!adj.has(b)) adj.set(b, []);
        adj.get(a)!.push(b);
        adj.get(b)!.push(a);
    };
    const stack: (TreeNode | null)[] = [root];
    while (stack.length > 0) {
        const node = stack.pop()!;
        if (node === null) continue;
        if (node.left !== null) {
            link(node.val, node.left.val);
            stack.push(node.left);
        }
        if (node.right !== null) {
            link(node.val, node.right.val);
            stack.push(node.right);
        }
    }
    const seen = new Set<number>([start]);
    let frontier = [start];
    let minutes = 0;
    while (frontier.length > 0) {
        const next: number[] = [];
        for (const u of frontier) {
            for (const v of adj.get(u) ?? []) {
                if (!seen.has(v)) {
                    seen.add(v);
                    next.push(v);
                }
            }
        }
        if (next.length === 0) break;
        ++minutes;
        frontier = next;
    }
    return minutes;
}

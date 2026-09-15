function verticalTraversal(root: TreeNode | null): number[][] {
    // One (column, row, value) record per node, gathered by an
    // explicit-stack DFS — no recursion, so a 1000-node chain cannot
    // exhaust any call stack.
    const cells = new Map<number, [number, number][]>();
    const pending: Array<[TreeNode | null, number, number]> = [[root, 0, 0]];
    while (pending.length > 0) {
        const [node, row, col] = pending.pop()!;
        if (node === null) {
            continue;
        }
        if (!cells.has(col)) {
            cells.set(col, []);
        }
        cells.get(col)!.push([row, node.val]);
        pending.push([node.right, row + 1, col + 1]);
        pending.push([node.left, row + 1, col - 1]);
    }
    // Rows read top to bottom and values break the ties of nodes sharing one
    // cell; every sort carries a numeric comparator, and the column keys run
    // left to right.
    const columns = [...cells.keys()].sort((a, b) => a - b);
    const out: number[][] = [];
    for (const col of columns) {
        const records = cells.get(col)!;
        records.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
        out.push(records.map((record) => record[1]));
    }
    return out;
}

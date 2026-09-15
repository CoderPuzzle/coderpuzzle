function verticalOrder(root: TreeNode | null): number[][] {
    // Pure collector: a root-first DFS (left before right) appends one
    // (column, row, value) record per node and defers all ordering to a
    // single sort afterwards.
    const triples: Array<[number, number, number]> = [];
    const walk = (node: TreeNode | null, row: number, col: number): void => {
        if (node === null) {
            return;
        }
        triples.push([col, row, node.val]);
        walk(node.left, row + 1, col - 1);
        walk(node.right, row + 1, col + 1);
    };
    walk(root, 0, 0);
    // Array#sort is stable, and the comparator stops at (column, row):
    // within one cell the records keep their walk order, and a left-before-
    // right walk visits same-depth nodes exactly in the statement's
    // left-to-right reading order — the value must not take part.
    triples.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const out: number[][] = [];
    for (let index = 0; index < triples.length; ++index) {
        if (index === 0 || triples[index][0] !== triples[index - 1][0]) {
            out.push([]);
        }
        out[out.length - 1].push(triples[index][2]);
    }
    return out;
}

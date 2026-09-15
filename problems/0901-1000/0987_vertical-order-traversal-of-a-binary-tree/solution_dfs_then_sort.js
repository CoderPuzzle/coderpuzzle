/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
    // Pure collector: a root-first DFS (left before right, explicit stack,
    // no recursion) appends one (column, row, value) record per node and
    // keeps no answer structure at all.
    const triples = [];
    const pending = [[root, 0, 0]];
    while (pending.length > 0) {
        const [node, row, col] = pending.pop();
        if (node === null) {
            continue;
        }
        triples.push([col, row, node.val]);
        pending.push([node.right, row + 1, col + 1]);
        pending.push([node.left, row + 1, col - 1]);
    }
    // One sort settles every ordering at once: columns left to right, rows
    // top to bottom, and values breaking the ties of nodes that share one
    // cell — the comparator subtracts the three components in turn. The
    // answer is then just runs of equal columns.
    triples.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
    const out = [];
    for (let index = 0; index < triples.length; ++index) {
        if (index === 0 || triples[index][0] !== triples[index - 1][0]) {
            out.push([]);
        }
        out[out.length - 1].push(triples[index][2]);
    }
    return out;
};

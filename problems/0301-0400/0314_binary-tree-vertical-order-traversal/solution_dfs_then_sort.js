/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalOrder = function (root) {
    // Pure collector: a root-first DFS (left before right) appends one
    // (column, row, value) record per node and defers all ordering to a
    // single sort afterwards.
    const triples = [];
    const walk = (node, row, col) => {
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
    const out = [];
    for (let index = 0; index < triples.length; ++index) {
        if (index === 0 || triples[index][0] !== triples[index - 1][0]) {
            out.push([]);
        }
        out[out.length - 1].push(triples[index][2]);
    }
    return out;
};

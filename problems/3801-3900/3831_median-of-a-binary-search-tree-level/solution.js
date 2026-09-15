/**
 * @param {TreeNode} root
 * @param {number} level
 * @return {number}
 */
var levelMedian = function (root, level) {
    // Descend one frontier at a time: every pass replaces the current
    // level's nodes with their children, so after `level` passes the
    // frontier IS the queried level. If it empties first, that level
    // does not exist and -1 is the answer. Plain loops over an explicit
    // frontier — no recursion — so a 200,000-node chain is as safe as a
    // bushy tree.
    let frontier = root === null ? [] : [root];
    for (let depth = 0; depth < level && frontier.length > 0; depth++) {
        const next = [];
        for (const node of frontier) {
            if (node.left !== null) {
                next.push(node.left);
            }
            if (node.right !== null) {
                next.push(node.right);
            }
        }
        frontier = next;
    }
    if (frontier.length === 0) {
        return -1;
    }
    // The upper median sits at index floor(len / 2) of the sorted level
    // values: the exact middle for odd counts, the larger of the two
    // middle elements for even counts.
    const values = frontier.map((node) => node.val).sort((a, b) => a - b);
    return values[Math.floor(values.length / 2)];
};

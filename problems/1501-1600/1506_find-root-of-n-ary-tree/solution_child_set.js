/**
 * @param {Node[]} tree
 * @return {Node}
 */
var findRoot = function (tree) {
    // Indegree zero: every node except the root appears exactly once as
    // someone's child. Collect all the nodes, then discard every node seen
    // as a child — the one survivor is the root.
    const survivors = new Set(tree);
    for (const node of tree) {
        for (const child of node.children) {
            survivors.delete(child);
        }
    }
    return survivors.values().next().value;
};

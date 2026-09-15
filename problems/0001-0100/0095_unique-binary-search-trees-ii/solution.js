/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
    const build = function (lo, hi) {
        // An empty range still offers one choice: the null subtree.
        if (lo > hi) {
            return [null];
        }
        const trees = [];
        for (let root = lo; root <= hi; ++root) {
            const lefts = build(lo, root - 1);
            const rights = build(root + 1, hi);
            // Left choices vary slower than right choices, so the loop
            // nesting emits the trees in the order the statement pins.
            for (const left of lefts) {
                for (const right of rights) {
                    const node = new TreeNode(root);
                    node.left = left;
                    node.right = right;
                    trees.push(node);
                }
            }
        }
        return trees;
    };

    return build(1, n);
};

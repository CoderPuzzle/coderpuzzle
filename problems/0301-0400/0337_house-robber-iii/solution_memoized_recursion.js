/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
    // Two independent questions per subtree, each with its own memo table:
    // the best with the root chosen, and the best with the root barred.
    // Asking them separately can re-descend a subtree, but the tables make
    // sure each question is settled once per node. Node objects key the
    // tables by identity.
    const takeMap = new Map();
    const skipMap = new Map();

    const take = function (node) {
        if (node === null) {
            return 0;
        }
        if (takeMap.has(node)) {
            return takeMap.get(node);
        }
        // Taking this node bars both children outright.
        const best = node.val + skip(node.left) + skip(node.right);
        takeMap.set(node, best);
        return best;
    };

    const skip = function (node) {
        if (node === null) {
            return 0;
        }
        if (skipMap.has(node)) {
            return skipMap.get(node);
        }
        // Each child keeps its better option.
        const best = Math.max(take(node.left), skip(node.left)) + Math.max(take(node.right), skip(node.right));
        skipMap.set(node, best);
        return best;
    };

    return Math.max(take(root), skip(root));
};

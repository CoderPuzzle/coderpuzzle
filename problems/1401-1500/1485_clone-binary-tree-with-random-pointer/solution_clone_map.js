/**
 * @param {RandomTreeNode} root
 * @return {RandomTreeNode}
 */
var copyRandomBinaryTree = function (root) {
    const clones = new Map();
    const clone = (node) => {
        if (node === null) return null;
        if (clones.has(node)) return clones.get(node);
        const copy = new RandomTreeNode(node.val);
        clones.set(node, copy);
        copy.left = clone(node.left);
        copy.right = clone(node.right);
        copy.random = clone(node.random);
        return copy;
    };
    return clone(root);
};

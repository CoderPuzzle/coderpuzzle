/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function (descriptions) {
    const nodes = new Map();
    const children = new Set();

    const get = (value) => {
        let node = nodes.get(value);
        if (node === undefined) {
            node = new TreeNode(value);
            nodes.set(value, node);
        }
        return node;
    };

    for (const [parent, child, isLeft] of descriptions) {
        children.add(child);
        if (isLeft === 1) {
            get(parent).left = get(child);
        } else {
            get(parent).right = get(child);
        }
    }

    for (const [value, node] of nodes) {
        if (!children.has(value)) {
            return node;
        }
    }
    return null;
};

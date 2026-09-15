/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
    const info = new Map(); // serial -> { node, lastIndex, count }
    let counter = 0;

    const key = function (node) {
        if (node === null) {
            return "#";
        }
        const index = counter;
        counter += 1;
        const serial = `${node.val},${key(node.left)},${key(node.right)}`;
        const entry = info.get(serial);
        if (entry) {
            entry.lastIndex = index;
            entry.count += 1;
        } else {
            info.set(serial, { node: node, lastIndex: index, count: 1 });
        }
        return serial;
    };

    key(root);
    const duplicates = Array.from(info.values())
        .sort((a, b) => a.lastIndex - b.lastIndex)
        .filter((entry) => entry.count >= 2)
        .map((entry) => entry.node);
    return duplicates;
};

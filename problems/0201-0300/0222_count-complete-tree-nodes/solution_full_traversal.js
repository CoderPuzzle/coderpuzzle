/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
    // Count every node the plain way: run down each left spine, then pop
    // back for the right turns. The stack holds one node per level.
    let count = 0;
    const stack = [];
    let node = root;
    while (node !== null || stack.length > 0) {
        while (node !== null) {
            count += 1;
            stack.push(node);
            node = node.left;
        }
        node = stack.pop().right;
    }
    return count;
};

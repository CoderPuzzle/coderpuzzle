/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function (root) {
    if (root === null) return [];
    const out = [];
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        out.push(node.val);
        for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push(node.children[i]);
        }
    }
    return out;
};

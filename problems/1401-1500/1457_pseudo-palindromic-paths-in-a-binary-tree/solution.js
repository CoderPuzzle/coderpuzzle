/**
 * @param {TreeNode} root
 * @return {number}
 */
var pseudoPalindromicPaths = function (root) {
    if (root === null) {
        return 0;
    }
    let count = 0;
    // Explicit stack: the tree may be a chain 10^5 deep, too deep for
    // recursion under the small run-time stacks.
    const stack = [[root, 1 << (root.val - 1)]];
    while (stack.length > 0) {
        const [node, mask] = stack.pop();
        if (node.left === null && node.right === null) {
            // At most one set bit <=> at most one odd digit count.
            if ((mask & (mask - 1)) === 0) {
                count++;
            }
            continue;
        }
        if (node.left !== null) {
            stack.push([node.left, mask ^ (1 << (node.left.val - 1))]);
        }
        if (node.right !== null) {
            stack.push([node.right, mask ^ (1 << (node.right.val - 1))]);
        }
    }
    return count;
};

/**
 * @param {TreeNode} root
 * @param {number[]} arr
 * @return {boolean}
 */
var isValidSequence = function (root, arr) {
    if (root === null) {
        return false;
    }
    const n = arr.length;
    // Explicit stack of (node, index): a chain thousands deep must not
    // recurse, so the walk keeps its own frame list.
    const stack = [[root, 0]];
    while (stack.length > 0) {
        const [node, i] = stack.pop();
        if (node.val !== arr[i]) {
            continue;
        }
        if (i === n - 1) {
            // The array is consumed: valid only at a leaf.
            if (node.left === null && node.right === null) {
                return true;
            }
            continue;
        }
        if (node.left !== null) {
            stack.push([node.left, i + 1]);
        }
        if (node.right !== null) {
            stack.push([node.right, i + 1]);
        }
    }
    return false;
};

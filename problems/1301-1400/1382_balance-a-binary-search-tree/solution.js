/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var balanceBST = function (root) {
    // phase 1: iterative in-order walk flattens the BST into sorted
    // values (explicit stack dodges recursion limits on chain inputs)
    const values = [];
    const stack = [];
    let current = root;
    while (stack.length > 0 || current !== null) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        values.push(current.val);
        current = current.right;
    }

    // midpoint as root leaves at most half the range per side, so subtree
    // depths differ by <= 1 (build recursion is O(log n) deep)
    const build = (lo, hi) => {
        if (lo > hi) {
            return null;
        }
        const mid = (lo + hi) >> 1;
        const node = new TreeNode(values[mid]);
        node.left = build(lo, mid - 1);
        node.right = build(mid + 1, hi);
        return node;
    };

    return build(0, values.length - 1);
};

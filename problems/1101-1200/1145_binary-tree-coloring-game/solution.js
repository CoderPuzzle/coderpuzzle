/**
 * @param {TreeNode} root
 * @param {number} n
 * @param {number} x
 * @return {boolean}
 */
var btreeGameWinningMove = function (root, n, x) {
    const find = (node) => {
        if (node === null || node.val === x) return node;
        return find(node.left) || find(node.right);
    };
    const count = (node) => {
        if (node === null) return 0;
        return 1 + count(node.left) + count(node.right);
    };
    const target = find(root);
    const left = count(target.left);
    const right = count(target.right);
    const above = n - left - right - 1;
    // Grabbing the largest of the three regions wins iff it alone holds the
    // majority of all nodes.
    return Math.max(left, right, above) * 2 > n;
};

/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @param {number} target
 * @return {boolean}
 */
var twoSumBSTs = function (root1, root2, target) {
    const a = inorder(root1);
    const b = inorder(root2);
    let i = 0;
    let j = b.length - 1;
    while (i < a.length && j >= 0) {
        const total = a[i] + b[j];
        if (total === target) return true;
        if (total < target) ++i;
        else --j;
    }
    return false;
};

// Lists a BST's values ascending; iterative because a degenerate 5000-node
// tree would recurse past the smallest judged stacks.
function inorder(root) {
    const values = [];
    const stack = [];
    let node = root;
    while (stack.length > 0 || node !== null) {
        while (node !== null) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();
        values.push(node.val);
        node = node.right;
    }
    return values;
}

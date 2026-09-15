/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumEvenGrandparent = function (root) {
    // Each stack entry carries (node, parent value, grandparent value) so the
    // parity test needs no upward links. Explicit stack: the tree may be a
    // 10^4-node chain, beyond any recursion budget.
    const NONE = 1; // odd sentinel: contributes nothing
    let total = 0;
    const stack = [[root, NONE, NONE]];
    while (stack.length > 0) {
        const [node, parent, grandparent] = stack.pop();
        if (node === null) continue;
        if (grandparent % 2 === 0) total += node.val;
        stack.push([node.left, node.val, parent]);
        stack.push([node.right, node.val, parent]);
    }
    return total;
};

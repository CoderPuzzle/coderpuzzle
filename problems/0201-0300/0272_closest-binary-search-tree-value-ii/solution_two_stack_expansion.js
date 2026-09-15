/**
 * @param {TreeNode} root
 * @param {number} target
 * @param {number} k
 * @return {number[]}
 */
var closestKValues = function (root, target, k) {
    // One descent from the root sorts the tree around target. A node at
    // or below target is a candidate predecessor and anything nearer to
    // target on that side lives in its right subtree, so the walk steps
    // right after pushing it; a node above target mirrors onto the
    // successor stack and steps left. Each stack ends with its side's
    // nearest value on top, the rest of the side ordered underneath.
    const predecessors = [];
    const successors = [];
    let node = root;
    while (node !== null) {
        if (node.val <= target) {
            predecessors.push(node);
            node = node.right;
        } else {
            successors.push(node);
            node = node.left;
        }
    }
    // Each pick pops the nearer top — a tie goes to the predecessor,
    // which holds the smaller value — then restores its stack by pushing
    // the popped node's inner spine: the right edge of a predecessor's
    // left subtree, the left edge of a successor's right subtree. Each
    // side sweeps outward from target one value at a time, so picks come
    // out ordered exactly as the statement pins them.
    const result = [];
    for (let i = 0; i < k; ++i) {
        const takePredecessor =
            successors.length === 0 ||
            (predecessors.length > 0 &&
                Math.abs(predecessors[predecessors.length - 1].val - target) <=
                    Math.abs(successors[successors.length - 1].val - target));
        if (takePredecessor) {
            const picked = predecessors.pop();
            result.push(picked.val);
            let child = picked.left;
            while (child !== null) {
                predecessors.push(child);
                child = child.right;
            }
        } else {
            const picked = successors.pop();
            result.push(picked.val);
            let child = picked.right;
            while (child !== null) {
                successors.push(child);
                child = child.left;
            }
        }
    }
    return result;
};

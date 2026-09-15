/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var evaluateTree = function (root) {
    // The tree is a formula: leaves hold the literals (1 is true, 0 is
    // false) and internal nodes apply their operator — 2 ORs the two
    // child bits, 3 ANDs them — so the answer is a post-order fold.
    // Spines of this tree can run hundreds of nodes deep, so the fold
    // runs on explicit stacks instead of the call stack: entries say
    // either "expand this node" or "apply this operator". Expanding an
    // internal node parks its operator beneath its children, left on
    // top; because the tree is full, each subtree's entries net out to
    // exactly one bit, so an operator resurfaces only after its two
    // operands sit ready on the operand shelf.
    if (root === null) {
        return false;
    }
    const operands = [];
    const work = [{ kind: "expand", node: root }];
    while (work.length > 0) {
        const entry = work.pop();
        if (entry.kind === "expand") {
            if (entry.node.left === null || entry.node.right === null) {
                operands.push(entry.node.val === 1);
            } else {
                work.push({ kind: "apply", isOr: entry.node.val === 2 });
                work.push({ kind: "expand", node: entry.node.right });
                work.push({ kind: "expand", node: entry.node.left });
            }
        } else {
            const right = operands.pop();
            const left = operands.pop();
            operands.push(entry.isOr ? left || right : left && right);
        }
    }
    return operands.pop();
};

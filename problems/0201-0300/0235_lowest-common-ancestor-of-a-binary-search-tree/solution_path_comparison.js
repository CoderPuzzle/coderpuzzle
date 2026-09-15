/**
 * @param {TreeNode} root
 * @param {number} p
 * @param {number} q
 * @return {number}
 */
var lowestCommonAncestor = function (root, p, q) {
    // pathTo walks a target home in a straight line: every node recorded is
    // a strict ancestor-or-self of the target.
    const pathTo = function (target) {
        const path = [];
        let node = root;
        while (node.val !== target) {
            path.push(node.val);
            node = target < node.val ? node.left : node.right;
        }
        path.push(target);
        return path;
    };
    // Two written-down paths instead of one simultaneous descent.
    const first = pathTo(p);
    const second = pathTo(q);
    // Shared entries are exactly the shared ancestors; read both lists in
    // lockstep until they split (or one ends, when one target sits above
    // the other) and report the last value they agreed on.
    let answer = first[0];
    for (let i = 0; i < first.length && i < second.length; i++) {
        if (first[i] !== second[i]) {
            break;
        }
        answer = first[i];
    }
    return answer;
};

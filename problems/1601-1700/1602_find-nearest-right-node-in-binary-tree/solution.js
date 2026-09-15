/**
 * @param {TreeNode} root
 * @param {number} u
 * @return {TreeNode}
 */
var findNearestRightNode = function (root, u) {
    // Level-order BFS: drain the queue one level at a time, left child
    // before right, so a level's nodes come out in left-to-right order.
    // The node right after the one matching u is the answer.
    if (root === null) {
        return null;
    }
    let level = [root];
    while (level.length > 0) {
        let found = false;
        const next = [];
        for (const node of level) {
            if (found) {
                return node;
            }
            if (node.val === u) {
                found = true;
            }
            if (node.left !== null) next.push(node.left);
            if (node.right !== null) next.push(node.right);
        }
        if (found) {
            return null;
        }
        level = next;
    }
    return null;
};

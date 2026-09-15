/**
 * @param {TreeNode} root
 * @return {number}
 */
var deepestLeavesSum = function (root) {
    // Level-order sweep: levelSum is overwritten at every level, so when the
    // queue finally empties it holds exactly the deepest leaves' sum.
    if (root === null) {
        return 0;
    }
    let queue = [root];
    let levelSum = 0;
    while (queue.length > 0) {
        levelSum = 0;
        const next = [];
        for (const node of queue) {
            levelSum += node.val;
            if (node.left !== null) {
                next.push(node.left);
            }
            if (node.right !== null) {
                next.push(node.right);
            }
        }
        queue = next;
    }
    return levelSum;
};

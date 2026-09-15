/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function (root) {
    const largest = [];
    const queue = [];
    if (root !== null) {
        queue.push(root);
    }
    while (queue.length > 0) {
        // One round drains exactly one level: the nodes sitting in the
        // queue when the round starts. A level always holds at least one
        // node, so its first value seeds the running maximum — no
        // sentinel, which matters when a whole row sits at -2^31.
        let best = queue[0].val;
        const remaining = queue.length;
        for (let i = 0; i < remaining; ++i) {
            const node = queue.shift();
            if (node.val > best) {
                best = node.val;
            }
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        largest.push(best);
    }
    return largest;
};

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
    const levels = [];
    const queue = [];
    if (root !== null) {
        queue.push(root);
    }
    while (queue.length > 0) {
        // One round of the outer loop consumes exactly one level: the
        // nodes sitting in the queue when the round starts.
        const level = [];
        const remaining = queue.length;
        for (let i = 0; i < remaining; ++i) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        levels.push(level);
    }
    // Levels were collected root-first; the statement wants leaf-first.
    levels.reverse();
    return levels;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    const result = [];
    let node = root;
    // Loop invariant: the only memory the walk keeps is the cursor and
    // the predecessor it is currently hunting; the path back up to any
    // node still awaiting its visit is threaded into the tree's own
    // right pointers, to be cut again once the node has been read.
    while (node !== null) {
        if (node.left !== null) {
            // Hunt the inorder predecessor first — the rightmost node of
            // the left subtree — stopping early if the right spine
            // already ends in a thread pointing back here.
            let pred = node.left;
            while (pred.right !== null && pred.right !== node) {
                pred = pred.right;
            }
            if (pred.right === null) {
                // Fresh ground: thread the predecessor back to this node
                // and descend left, planning to return via the thread.
                pred.right = node;
                node = node.left;
            } else {
                // The thread says the left subtree is finished: read the
                // node, cut the thread, and step right.
                result.push(node.val);
                pred.right = null;
                node = node.right;
            }
        } else {
            result.push(node.val);
            node = node.right;
        }
    }
    return result;
};

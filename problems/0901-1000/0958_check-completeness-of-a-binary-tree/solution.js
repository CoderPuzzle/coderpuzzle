/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isCompleteTree = function (root) {
    // Number the positions the way a heap numbers them — root at 1,
    // children of slot i at 2i and 2i+1. Reading the queue front-first
    // surfaces nodes in exactly slot order (absent children ride along as
    // null placeholders), so the first null read is the first unoccupied
    // slot, and any real node after it sits beyond a hole that
    // completeness cannot afford.
    const pending = [root];
    let head = 0;
    let gapSeen = false;
    while (head < pending.length) {
        const node = pending[head];
        head++;
        if (node === null) {
            gapSeen = true;
        } else if (gapSeen) {
            return false;
        } else {
            pending.push(node.left, node.right);
        }
    }
    return true;
};

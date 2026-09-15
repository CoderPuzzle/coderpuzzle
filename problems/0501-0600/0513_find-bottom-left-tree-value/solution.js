/**
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function (root) {
    // Children enter right-first, so every row drains right-to-left and the
    // last node dequeued overall is the leftmost node of the deepest row:
    // each dequeue overwrites the answer and the final row wins. The read
    // index walks the array in place instead of shifting the queue.
    const queue = [root];
    let answer = root.val;
    for (let i = 0; i < queue.length; i++) {
        const node = queue[i];
        answer = node.val;
        if (node.right !== null) {
            queue.push(node.right);
        }
        if (node.left !== null) {
            queue.push(node.left);
        }
    }
    return answer;
};

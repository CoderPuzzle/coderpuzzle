function findBottomLeftValue(root: TreeNode | null): number {
    if (root === null) {
        return 0; // the tree holds at least one node, so this never fires
    }
    // Children enter right-first, so every row drains right-to-left and the
    // last node dequeued overall is the leftmost node of the deepest row:
    // each dequeue overwrites the answer and the final row wins. The read
    // index walks the array in place instead of shifting the queue.
    const queue: TreeNode[] = [root];
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
}

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
    // The half-built tree's right spine holds exactly the still-open
    // maxima — values strictly decreasing from the root down — so it
    // lives on a stack. A new value dominates every smaller top: each
    // popped subtree is finished and can only hang left of it, and the
    // last one out (the run's largest) is its left child.
    const stack = [];
    for (const value of nums) {
        const node = new TreeNode(value);
        let last = null;
        while (stack.length > 0 && stack[stack.length - 1].val < value) {
            last = stack.pop();
        }
        node.left = last;
        if (stack.length > 0) {
            // Whatever survives is larger, so the new node is its right
            // child — this link is rewritten only after the previous
            // child was popped and re-hung one level down.
            stack[stack.length - 1].right = node;
        }
        stack.push(node);
    }
    // The bottom of the stack is the largest value ever seen: the root.
    return stack[0];
};

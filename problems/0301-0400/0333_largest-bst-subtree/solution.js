/**
 * @param {TreeNode} root
 * @return {number}
 */
var largestBSTSubtree = function (root) {
    // Post-order, one pass: every subtree reports whether it is a BST,
    // its size, and its min/max value; a node is a BST exactly when both
    // children are BSTs and left.max < node.val < right.min, so each node
    // is judged from its two child reports alone. The traversal carries
    // its own stack of frames: the tree may be a single 10^4-node chain,
    // whose judgement nests 10000 calls — over the 512k V8 stack this
    // judge runs Node with — so every runtime iterates instead.
    let best = 0;
    // An absent child is an empty BST: size 0, and never a violation at
    // its parent — the ±Infinity range makes both bounds checks pass.
    // Report = [is_bst, size, min, max].
    const empty = [true, 0, Infinity, -Infinity];
    // Frame = [node, state, left report, right report]; state counts the
    // children still to visit: 0 = left pending, 1 = right pending,
    // 2 = ready to judge the node itself.
    const stack = [];
    if (root !== null) {
        stack.push([root, 0, empty, empty]);
    }
    while (stack.length > 0) {
        const frame = stack[stack.length - 1];
        if (frame[1] === 0) {
            frame[1] = 1;
            if (frame[0].left !== null) {
                stack.push([frame[0].left, 0, empty, empty]);
            }
        } else if (frame[1] === 1) {
            frame[1] = 2;
            if (frame[0].right !== null) {
                stack.push([frame[0].right, 0, empty, empty]);
            }
        } else {
            stack.pop();
            const node = frame[0];
            const left = frame[2];
            const right = frame[3];
            let report;
            if (left[0] && right[0] && left[3] < node.val && node.val < right[2]) {
                const size = 1 + left[1] + right[1];
                if (size > best) {
                    best = size;
                }
                report = [true, size, Math.min(node.val, left[2]), Math.max(node.val, right[3])];
            } else {
                // Size and range are junk here: the parent sees the
                // false flag first and never reads them.
                report = [false, 0, 0, 0];
            }
            if (stack.length > 0) {
                const parent = stack[stack.length - 1];
                if (parent[1] === 1) {
                    parent[2] = report;
                } else {
                    parent[3] = report;
                }
            }
        }
    }
    return best;
};

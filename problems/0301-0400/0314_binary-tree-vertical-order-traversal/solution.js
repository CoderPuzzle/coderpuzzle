/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalOrder = function (root) {
    if (root === null) {
        return [];
    }
    // (node, column) pairs advance level by level: dequeue order is
    // top-to-bottom, and within a row left-to-right — exactly the ordering
    // the answer needs, so appending as we dequeue is enough. The read
    // index walks the array in place instead of shifting the queue.
    const columns = new Map();
    const queue = [[root, 0]];
    let leftmost = 0;
    let rightmost = 0;
    for (let i = 0; i < queue.length; i++) {
        const [node, column] = queue[i];
        if (!columns.has(column)) {
            columns.set(column, []);
        }
        columns.get(column).push(node.val);
        leftmost = Math.min(leftmost, column);
        rightmost = Math.max(rightmost, column);
        if (node.left !== null) {
            queue.push([node.left, column - 1]);
        }
        if (node.right !== null) {
            queue.push([node.right, column + 1]);
        }
    }
    // The visited columns form one contiguous range (columns only ever move
    // by one), so the minimum-to-maximum sweep misses nothing.
    const out = [];
    for (let column = leftmost; column <= rightmost; column++) {
        out.push(columns.get(column));
    }
    return out;
};

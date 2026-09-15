/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargestLevelSum = function (root, k) {
    // One breadth-first sweep, swapping a fresh array in per level and
    // never recursing: a degenerate tree runs 10^5 nodes deep, past any
    // recursion budget. Every level sum stays <= 10^11, far below 2^53,
    // so Number addition and the numeric comparator are exact.
    const sums = [];
    let level = [root];
    while (level.length > 0) {
        let total = 0;
        const nxt = [];
        for (const node of level) {
            total += node.val;
            if (node.left !== null) nxt.push(node.left);
            if (node.right !== null) nxt.push(node.right);
        }
        sums.push(total);
        level = nxt;
    }
    if (sums.length < k) return -1;
    sums.sort((a, b) => b - a);
    return sums[k - 1];
};

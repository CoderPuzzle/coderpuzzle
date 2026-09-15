/**
 * @param {TreeNode} root
 * @return {number}
 */
var minimumLevel = function (root) {
    // One breadth-first pass groups nodes level by level; each level's
    // sum competes against the running minimum with a strict less-than,
    // so on a tie the earliest — lowest — level stays the answer. An
    // explicit queue, never recursion: a skewed tree runs 10^5 nodes
    // deep. Level sums reach 10^5 * 10^9 = 10^14, exact in a Number
    // because every intermediate stays below 2^53.
    let bestLevel = 1;
    let bestSum = Infinity;
    let level = 1;
    let pending = [root];
    while (pending.length > 0) {
        let total = 0;
        const next = [];
        for (const node of pending) {
            total += node.val;
            if (node.left !== null) next.push(node.left);
            if (node.right !== null) next.push(node.right);
        }
        if (total < bestSum) {
            bestSum = total;
            bestLevel = level;
        }
        pending = next;
        ++level;
    }
    return bestLevel;
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxProduct = function (root) {
    // Iterative post-order computes every subtree sum; each non-root sum s
    // scores the cut s * (total - s), maximized before the modulo. Sums fit
    // a double exactly (< 5e8) but the product reaches ~6.25e16 > 2^53, so
    // the multiplication happens in BigInt and the modulo is applied last.
    const sums = new Map();
    const stack = [[root, false]];
    while (stack.length > 0) {
        const [cur, expanded] = stack.pop();
        if (cur === null) continue;
        if (expanded) {
            sums.set(cur, cur.val + (sums.get(cur.left) || 0) + (sums.get(cur.right) || 0));
        } else {
            stack.push([cur, true]);
            stack.push([cur.left, false]);
            stack.push([cur.right, false]);
        }
    }
    const total = sums.get(root);
    let best = 0n;
    for (const [node, part] of sums) {
        if (node !== root) {
            const product = BigInt(part) * BigInt(total - part);
            if (product > best) best = product;
        }
    }
    return Number(best % 1000000007n);
};

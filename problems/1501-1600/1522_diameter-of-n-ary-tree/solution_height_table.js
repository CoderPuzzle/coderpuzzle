/**
 * @param {Node} root
 * @return {number}
 */
var diameter = function (root) {
    if (root === null) return 0;

    // Pass one: every node's height -- its longest downward arm in edges
    // -- materialized into a table keyed by the node.
    const height = new Map();
    const measure = (node) => {
        let tallest = -1;
        for (const child of node.children) {
            tallest = Math.max(tallest, measure(child));
        }
        height.set(node, tallest + 1);
        return tallest + 1;
    };
    measure(root);

    // Pass two: the widest bend at each node pairs its two tallest child
    // arms; absent arms read -1, so a leaf scores 0.
    let best = 0;
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        let first = -1;
        let second = -1;
        for (const child of node.children) {
            stack.push(child);
            const arm = height.get(child);
            if (arm > first) {
                second = first;
                first = arm;
            } else if (arm > second) {
                second = arm;
            }
        }
        best = Math.max(best, first + second + 2);
    }
    return best;
};

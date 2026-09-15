/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var averageOfSubtree = function (root) {
    let count = 0;
    const sums = new Map();
    const sizes = new Map();
    const stack = [[root, false]];
    while (stack.length > 0) {
        const [node, visited] = stack.pop();
        if (node === null) {
            continue;
        }
        if (visited) {
            let s = node.val;
            let n = 1;
            for (const child of [node.left, node.right]) {
                if (child !== null) {
                    s += sums.get(child);
                    n += sizes.get(child);
                }
            }
            sums.set(node, s);
            sizes.set(node, n);
            if (Math.floor(s / n) === node.val) {
                count++;
            }
        } else {
            stack.push([node, true]);
            stack.push([node.left, false]);
            stack.push([node.right, false]);
        }
    }
    return count;
};

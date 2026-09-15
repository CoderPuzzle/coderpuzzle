/**
 * @param {TreeNode} root
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
var getDirections = function (root, startValue, destValue) {
    const parent = new Map([[root.val, 0]]);
    const incoming = new Map();
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        if (node.left !== null) {
            parent.set(node.left.val, node.val);
            incoming.set(node.left.val, "L");
            stack.push(node.left);
        }
        if (node.right !== null) {
            parent.set(node.right.val, node.val);
            incoming.set(node.right.val, "R");
            stack.push(node.right);
        }
    }

    const distance = new Map();
    let node = startValue;
    let steps = 0;
    while (node !== 0) {
        distance.set(node, steps++);
        node = parent.get(node);
    }

    const downward = [];
    node = destValue;
    while (!distance.has(node)) {
        downward.push(incoming.get(node));
        node = parent.get(node);
    }
    downward.reverse();
    return "U".repeat(distance.get(node)) + downward.join("");
};

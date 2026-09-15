/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function (root1, root2) {
    // Iterative in-order walks produce two sorted lists (no recursion, so a
    // 5000-node skewed tree cannot overflow the stack), then a linear merge.
    const inorder = (root) => {
        const values = [];
        const stack = [];
        let node = root;
        while (stack.length > 0 || node !== null) {
            while (node !== null) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            values.push(node.val);
            node = node.right;
        }
        return values;
    };
    const first = inorder(root1);
    const second = inorder(root2);
    const merged = [];
    let i = 0;
    let j = 0;
    while (i < first.length && j < second.length) {
        if (first[i] <= second[j]) {
            merged.push(first[i]);
            ++i;
        } else {
            merged.push(second[j]);
            ++j;
        }
    }
    while (i < first.length) merged.push(first[i++]);
    while (j < second.length) merged.push(second[j++]);
    return merged;
};

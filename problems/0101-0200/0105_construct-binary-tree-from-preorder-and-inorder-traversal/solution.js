/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    // Value -> inorder index: makes each split lookup O(1) instead of a
    // linear scan. Values are unique, so a hit is exactly one split point.
    const index = new Map();
    for (let i = 0; i < inorder.length; i++) {
        index.set(inorder[i], i);
    }
    // Single shared cursor consuming preorder strictly left to right,
    // one value per recursive call (captured by the closure).
    let position = 0;

    const build = (low, high) => {
        // Empty inorder range <=> missing child, so base cases need no
        // special casing.
        if (low >= high) return null;
        // The first unconsumed preorder value is the root of this subtree:
        // preorder lists root, then the whole left subtree, then the right
        // -- exactly the order the recursion asks for root values.
        const value = preorder[position];
        position++;
        const node = new TreeNode(value);
        const mid = index.get(value);
        // Inorder visits left, root, right: [low, mid) is the left
        // subtree and [mid + 1, high) the right.
        node.left = build(low, mid);
        node.right = build(mid + 1, high);
        return node;
    };

    return build(0, inorder.length);
};

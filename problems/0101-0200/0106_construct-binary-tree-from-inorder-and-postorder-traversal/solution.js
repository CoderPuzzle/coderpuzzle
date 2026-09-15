/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
    // Value -> inorder index: makes each split lookup O(1) instead of a
    // linear scan. Values are unique, so a hit is exactly one split point.
    const index = new Map();
    for (let i = 0; i < inorder.length; i++) {
        index.set(inorder[i], i);
    }
    // Postorder ends with the root, and the reversed array lists root, right
    // subtree, left subtree -- so a cursor walking postorder backwards hands
    // out subtree roots in exactly the order the frames below claim them.
    let position = postorder.length - 1;
    // A dummy parent lets the real root pass through the same attach logic
    // as every other node; the answer is dummy.left.
    const dummy = new TreeNode(0);
    // Frames are [parent, attachLeft, low, high] over inorder ranges.
    // Popping a frame claims at most one root value from the cursor, so an
    // explicit stack -- not recursion -- drives the build: the constraint
    // ceiling allows a 3000-node chain, and recursion that deep is not safe
    // in every judge language.
    const stack = [[dummy, true, 0, inorder.length]];
    while (stack.length > 0) {
        const [parent, attachLeft, low, high] = stack.pop();
        if (low >= high) {
            // Empty inorder range <=> missing subtree.
            continue;
        }
        const value = postorder[position];
        position--;
        const node = new TreeNode(value);
        if (attachLeft) {
            parent.left = node;
        } else {
            parent.right = node;
        }
        const mid = index.get(value);
        // Inorder visits left, root, right: [low, mid) is the left subtree
        // and [mid + 1, high) the right. Left is pushed first so the right
        // frame pops -- and its root is consumed -- first.
        stack.push([node, true, low, mid]);
        stack.push([node, false, mid + 1, high]);
    }
    return dummy.left;
};

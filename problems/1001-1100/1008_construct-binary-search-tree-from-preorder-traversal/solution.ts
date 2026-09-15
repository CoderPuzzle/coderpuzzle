function bstFromPreorder(preorder: number[]): TreeNode | null {
    let index = 0;

    function build(low: number, high: number): TreeNode | null {
        if (index === preorder.length) {
            return null;
        }
        const value = preorder[index];
        // outside this subtree's bounds: the value belongs to some
        // ancestor's right subtree — peek but do not consume
        if (value < low || value > high) {
            return null;
        }
        index++;
        const node = new TreeNode(value);
        // preorder emits root, then the whole left subtree, then the
        // right one, so claiming left first matches the array order
        node.left = build(low, value - 1);
        node.right = build(value + 1, high);
        return node;
    }

    return build(-Infinity, Infinity);
}

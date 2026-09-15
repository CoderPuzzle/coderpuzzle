class Frame {
    node: TreeNode;
    index: number;

    constructor(node: TreeNode, index: number) {
        this.node = node;
        this.index = index;
    }
}

function isValidSequence(root: TreeNode | null, arr: number[]): boolean {
    if (root === null) {
        return false;
    }
    const n = arr.length;
    // Explicit stack of (node, index): a chain thousands deep must not
    // recurse, so the walk keeps its own frame list.
    const stack: Frame[] = [new Frame(root, 0)];
    while (stack.length > 0) {
        const { node, index: i } = stack.pop()!;
        if (node.val !== arr[i]) {
            continue;
        }
        if (i === n - 1) {
            // The array is consumed: valid only at a leaf.
            if (node.left === null && node.right === null) {
                return true;
            }
            continue;
        }
        if (node.left !== null) {
            stack.push(new Frame(node.left, i + 1));
        }
        if (node.right !== null) {
            stack.push(new Frame(node.right, i + 1));
        }
    }
    return false;
}

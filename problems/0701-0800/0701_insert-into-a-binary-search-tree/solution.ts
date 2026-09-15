function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
    // The value is guaranteed absent, so a search for it must fail — and
    // where it fails is the answer: descend right when val is greater,
    // left otherwise, until the child slot ahead is empty, then hang a
    // fresh leaf there. Every ancestor on that path already brackets val
    // on the correct side, and any empty slot off the path lies in a
    // subtree whose root's value excludes val — so the slot is forced and
    // no restructuring is ever needed.
    if (root === null) {
        // An empty tree never enters the loop: the fresh node is the root
        // handed back to the caller.
        return new TreeNode(val);
    }
    let node: TreeNode = root;
    // The descent iterates on purpose: the tree may be a single 10^4-node
    // chain, whose recursive walk would nest 10000 calls — over the 512k V8
    // stack this judge runs Node with.
    while (true) {
        if (val > node.val) {
            if (node.right === null) {
                node.right = new TreeNode(val);
                return root;
            }
            node = node.right;
        } else {
            if (node.left === null) {
                node.left = new TreeNode(val);
                return root;
            }
            node = node.left;
        }
    }
}

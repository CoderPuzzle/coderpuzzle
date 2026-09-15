/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {TreeNode[]}
 */
var splitBST = function (root, target) {
    // The split boundary is one root-to-null path: step right whenever
    // a node's value is at most target, left whenever it is greater.
    // Only the nodes on that path ever change children — every subtree
    // hanging off it keeps its parent, which is exactly the structure
    // preservation the statement demands.
    const small = new TreeNode();
    const large = new TreeNode();
    // Two dangling tails mark where the next path node on each side must
    // attach. A node <= target joins the first tree, and the next
    // small-side node on the path is always its right descendant, so the
    // tail advances to its freshly emptied right child; a node > target
    // mirrors this on the left. One walk, no recursion, two sentinel
    // nodes — the whole working set.
    let smallTail = small;
    let largeTail = large;
    let node = root;
    while (node !== null) {
        if (node.val <= target) {
            const following = node.right;
            node.right = null;
            smallTail.right = node;
            smallTail = node;
            node = following;
        } else {
            const following = node.left;
            node.left = null;
            largeTail.left = node;
            largeTail = node;
            node = following;
        }
    }
    return [small.right, large.left];
};

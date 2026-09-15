class Solution {

    public int lowestCommonAncestor(TreeNode root, int p, int q) {
        // Plain descent, no stack or parent pointers: two comparisons per
        // level decide which side both targets lie on.
        TreeNode node = root;
        while (node != null) {
            if (p < node.val && q < node.val) {
                node = node.left;
            } else if (p > node.val && q > node.val) {
                node = node.right;
            } else {
                // First node where the targets split sides (or equals one of
                // them): every strict ancestor keeps both in one subtree.
                return node.val;
            }
        }
        return -1;
    }
}

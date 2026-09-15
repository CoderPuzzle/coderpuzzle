class Solution {

    public boolean btreeGameWinningMove(TreeNode root, int n, int x) {
        TreeNode target = find(root, x);
        int left = count(target.left);
        int right = count(target.right);
        int above = n - left - right - 1;
        // Grabbing the largest of the three regions wins iff it alone holds
        // the majority of all nodes.
        return Math.max(left, Math.max(right, above)) * 2 > n;
    }

    private TreeNode find(TreeNode node, int x) {
        if (node == null || node.val == x) return node;
        TreeNode hit = find(node.left, x);
        return hit != null ? hit : find(node.right, x);
    }

    private int count(TreeNode node) {
        if (node == null) return 0;
        return 1 + count(node.left) + count(node.right);
    }
}

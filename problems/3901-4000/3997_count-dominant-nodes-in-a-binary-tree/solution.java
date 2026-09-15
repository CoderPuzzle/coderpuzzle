class Solution {

    int[] go(TreeNode n) {
        if (n == null) return new int[] { -1, 0 };
        int[] a = go(n.left),
            b = go(n.right);
        int m = Math.max(n.val, Math.max(a[0], b[0]));
        return new int[] { m, a[1] + b[1] + (n.val == m ? 1 : 0) };
    }

    public int countDominantNodes(TreeNode root) {
        return go(root)[1];
    }
}

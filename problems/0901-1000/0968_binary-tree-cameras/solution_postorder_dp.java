class Solution {

    private static final int INF = 1_000_000;

    public int minCameraCover(TreeNode root) {
        int[] best = dfs(root);
        return Math.min(best[0], best[1]);
    }

    // Triple of minimum monitor counts for the subtree rooted at `node`:
    // [0] the root holds a monitor, [1] the root is covered without one,
    // [2] the root waits uncovered for its parent.
    private int[] dfs(TreeNode node) {
        if (node == null) {
            // A missing child is free whenever any state is allowed and can
            // never be the monitor holder, so it folds in as {INF, 0, INF}.
            return new int[] { INF, 0, INF };
        }
        int[] left = dfs(node.left);
        int[] right = dfs(node.right);
        // A monitor placed here observes both children, so each child may
        // sit in any of its three states.
        int withMonitor = 1 + tripleMin(left) + tripleMin(right);
        // Coverage without own monitor must arrive from a child, and the
        // other child is then on its own — no monitor here can help it.
        int covered = Math.min(left[0] + Math.min(right[0], right[1]), right[0] + Math.min(left[0], left[1]));
        // Staying uncovered forbids monitors here and at both children, so
        // each child must already be covered from below.
        int uncovered = Math.min(left[0], left[1]) + Math.min(right[0], right[1]);
        return new int[] { withMonitor, covered, uncovered };
    }

    private int tripleMin(int[] t) {
        return Math.min(t[0], Math.min(t[1], t[2]));
    }
}

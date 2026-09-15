class Solution {
  public:
    int minCameraCover(TreeNode *root) {
        array<int, 3> best = dfs(root);
        return min(best[0], best[1]);
    }

  private:
    static const int INF = 1000000;

    // Triple of minimum monitor counts for the subtree rooted at `node`:
    // [0] the root holds a monitor, [1] the root is covered without one,
    // [2] the root waits uncovered for its parent.
    array<int, 3> dfs(TreeNode *node) {
        if (node == nullptr) {
            // A missing child is free whenever any state is allowed and can
            // never be the monitor holder, so it folds in as {INF, 0, INF}.
            return {INF, 0, INF};
        }
        array<int, 3> left = dfs(node->left);
        array<int, 3> right = dfs(node->right);
        // A monitor placed here observes both children, so each child may
        // sit in any of its three states.
        int with_monitor = 1 + triple_min(left) + triple_min(right);
        // Coverage without own monitor must arrive from a child, and the
        // other child is then on its own — no monitor here can help it.
        int covered = min(left[0] + min(right[0], right[1]), right[0] + min(left[0], left[1]));
        // Staying uncovered forbids monitors here and at both children, so
        // each child must already be covered from below.
        int uncovered = min(left[0], left[1]) + min(right[0], right[1]);
        return {with_monitor, covered, uncovered};
    }

    int triple_min(const array<int, 3> &t) { return min(t[0], min(t[1], t[2])); }
};

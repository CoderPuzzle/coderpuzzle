/**
 * @param {TreeNode} root
 * @return {number}
 */
var minCameraCover = function (root) {
    const INF = 1000000;

    function dfs(node) {
        // Triple of minimum monitor counts for the subtree rooted at `node`:
        // [0] the root holds a monitor, [1] the root is covered without one,
        // [2] the root waits uncovered for its parent.
        if (node === null) {
            // A missing child is free whenever any state is allowed and can
            // never be the monitor holder, so it folds in as [INF, 0, INF].
            return [INF, 0, INF];
        }
        const left = dfs(node.left);
        const right = dfs(node.right);
        // A monitor placed here observes both children, so each child may
        // sit in any of its three states.
        const withMonitor = 1 + Math.min(...left) + Math.min(...right);
        // Coverage without own monitor must arrive from a child, and the
        // other child is then on its own — no monitor here can help it.
        const covered = Math.min(left[0] + Math.min(right[0], right[1]), right[0] + Math.min(left[0], left[1]));
        // Staying uncovered forbids monitors here and at both children, so
        // each child must already be covered from below.
        const uncovered = Math.min(left[0], left[1]) + Math.min(right[0], right[1]);
        return [withMonitor, covered, uncovered];
    }

    // The root has no parent to wait for, so it must already be covered.
    const [withMonitor, covered] = dfs(root);
    return Math.min(withMonitor, covered);
};

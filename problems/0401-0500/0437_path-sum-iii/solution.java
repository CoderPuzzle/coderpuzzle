import java.util.HashMap;
import java.util.Map;

class Solution {

    public int pathSum(TreeNode root, int targetSum) {
        // counter maps root-to-node prefix sums seen on the current path to
        // their counts; {0: 1} counts paths starting at a node itself.
        Map<Long, Long> counter = new HashMap<>();
        counter.put(0L, 1L);
        return (int) dfs(root, 0L, targetSum, counter);
    }

    private long dfs(TreeNode node, long running, int targetSum, Map<Long, Long> counter) {
        if (node == null) {
            return 0;
        }
        running += node.val;
        // A path ending here with the target starts at an ancestor whose
        // prefix equals running - targetSum (prefix(v) - prefix(u) trick).
        long total = counter.getOrDefault(running - targetSum, 0L);
        // Register this prefix only after the lookup, then recurse.
        counter.merge(running, 1L, Long::sum);
        total += dfs(node.left, running, targetSum, counter);
        total += dfs(node.right, running, targetSum, counter);
        // Undo on backtrack: left-subtree prefixes must not pair with
        // right-subtree nodes, so lookups see true ancestors only.
        counter.merge(running, -1L, Long::sum);
        return total;
    }
}

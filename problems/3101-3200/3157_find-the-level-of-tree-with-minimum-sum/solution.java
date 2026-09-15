import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int minimumLevel(TreeNode root) {
        // One breadth-first pass groups nodes level by level; each level's
        // sum competes against the running minimum with a strict
        // less-than, so on a tie the earliest — lowest — level stays the
        // answer. An explicit queue, never recursion: a skewed tree runs
        // 10^5 nodes deep. Level sums reach 10^5 * 10^9 = 10^14, past
        // int range: accumulate in a long.
        int bestLevel = 1;
        long bestSum = Long.MAX_VALUE;
        int level = 1;
        Deque<TreeNode> pending = new ArrayDeque<>();
        pending.add(root);
        while (!pending.isEmpty()) {
            long total = 0L;
            int size = pending.size();
            for (int i = 0; i < size; ++i) {
                TreeNode node = pending.poll();
                total += node.val;
                if (node.left != null) pending.add(node.left);
                if (node.right != null) pending.add(node.right);
            }
            if (total < bestSum) {
                bestSum = total;
                bestLevel = level;
            }
            ++level;
        }
        return bestLevel;
    }
}

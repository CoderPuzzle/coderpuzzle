import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[][] levelOrder(TreeNode root) {
        // Handle the empty tree up front, before the queue exists.
        if (root == null) {
            return new int[0][];
        }
        List<List<Integer>> result = new ArrayList<>();
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        // Loop invariant: at the top of each round the queue holds exactly
        // one level's nodes and nothing else.
        while (!queue.isEmpty()) {
            // Snapshot the size now: children enqueued below belong to the
            // NEXT level, so draining exactly `size` nodes keeps levels
            // separated without any sentinel markers.
            int size = queue.size();
            List<Integer> level = new ArrayList<>(size);
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                // Skipping null children on enqueue keeps the invariant;
                // left-then-right order preserves reading order.
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
            result.add(level);
        }
        int[][] out = new int[result.size()][];
        for (int i = 0; i < result.size(); i++) {
            List<Integer> level = result.get(i);
            int[] row = new int[level.size()];
            for (int j = 0; j < level.size(); j++) {
                row[j] = level.get(j);
            }
            out[i] = row;
        }
        return out;
    }
}

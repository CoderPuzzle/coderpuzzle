import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[][] levelOrderBottom(TreeNode root) {
        List<List<Integer>> levels = new ArrayList<>();
        // Deque used as a queue: add at the tail, poll from the head.
        Deque<TreeNode> queue = new ArrayDeque<>();
        if (root != null) {
            queue.add(root);
        }
        while (!queue.isEmpty()) {
            // One round of the outer loop consumes exactly one level: the
            // nodes sitting in the queue when the round starts.
            List<Integer> level = new ArrayList<>();
            int remaining = queue.size();
            for (int i = 0; i < remaining; ++i) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            levels.add(level);
        }
        // Levels were collected root-first; the statement wants leaf-first.
        Collections.reverse(levels);
        int[][] result = new int[levels.size()][];
        for (int i = 0; i < levels.size(); ++i) {
            List<Integer> level = levels.get(i);
            int[] row = new int[level.size()];
            for (int j = 0; j < level.size(); ++j) {
                row[j] = level.get(j);
            }
            result[i] = row;
        }
        return result;
    }
}

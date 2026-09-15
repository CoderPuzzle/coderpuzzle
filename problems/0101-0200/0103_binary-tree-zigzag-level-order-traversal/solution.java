import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[][] zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return new int[0][];
        // Deque in FIFO mode: add to the tail, iterate head to tail, so a
        // scan of `queue` sees the level in left-to-right order.
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        // Loop invariant: `queue` holds exactly one level's nodes, left to
        // right; `leftToRight` says which way that level is emitted.
        boolean leftToRight = true;
        while (!queue.isEmpty()) {
            List<Integer> level = new ArrayList<>();
            for (TreeNode node : queue) {
                level.add(node.val);
            }
            if (!leftToRight) {
                // Collected left to right, so reversing yields right to left.
                Collections.reverse(level);
            }
            result.add(level);
            // Spread the next level: children enter left child first, which
            // keeps the queue ordered left to right for the round to come.
            Deque<TreeNode> next = new ArrayDeque<>();
            for (TreeNode node : queue) {
                if (node.left != null) next.add(node.left);
                if (node.right != null) next.add(node.right);
            }
            queue = next;
            leftToRight = !leftToRight;
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

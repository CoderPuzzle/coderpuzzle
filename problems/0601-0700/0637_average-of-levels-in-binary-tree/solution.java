import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public double[] averageOfLevels(TreeNode root) {
        List<Double> averages = new ArrayList<>();
        // Deque used as a queue: add at the tail, poll from the head.
        Deque<TreeNode> queue = new ArrayDeque<>();
        if (root != null) {
            queue.add(root);
        }
        while (!queue.isEmpty()) {
            // One round drains exactly one level: the nodes sitting in the
            // queue when the round starts. Children appended during the
            // round belong to the next level, and the count is fixed up
            // front. The sum runs in long — 10^4 values of magnitude 2^31
            // stay far inside it — so the only rounding anywhere is the
            // single division that closes the round.
            long total = 0;
            int remaining = queue.size();
            for (int i = 0; i < remaining; ++i) {
                TreeNode node = queue.poll();
                total += node.val;
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            averages.add((double) total / remaining);
        }
        double[] result = new double[averages.size()];
        for (int i = 0; i < averages.size(); ++i) {
            result[i] = averages.get(i);
        }
        return result;
    }
}

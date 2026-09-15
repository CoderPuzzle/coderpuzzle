import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] largestValues(TreeNode root) {
        List<Integer> largest = new ArrayList<>();
        // Deque used as a queue: add at the tail, poll from the head.
        Deque<TreeNode> queue = new ArrayDeque<>();
        if (root != null) {
            queue.add(root);
        }
        while (!queue.isEmpty()) {
            // One round drains exactly one level: the nodes sitting in the
            // queue when the round starts. A level always holds at least one
            // node, so its first value seeds the running maximum — no
            // sentinel, which matters when a whole row sits at -2^31.
            int best = queue.peekFirst().val;
            int remaining = queue.size();
            for (int i = 0; i < remaining; ++i) {
                TreeNode node = queue.poll();
                if (node.val > best) {
                    best = node.val;
                }
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            largest.add(best);
        }
        int[] result = new int[largest.size()];
        for (int i = 0; i < largest.size(); ++i) {
            result[i] = largest.get(i);
        }
        return result;
    }
}

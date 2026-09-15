import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] rightSideView(TreeNode root) {
        List<Integer> view = new ArrayList<>();
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
            // A level was collected left to right, so its last value is the
            // one the right side sees.
            view.add(level.get(level.size() - 1));
        }
        int[] result = new int[view.size()];
        for (int i = 0; i < view.size(); ++i) {
            result[i] = view.get(i);
        }
        return result;
    }
}

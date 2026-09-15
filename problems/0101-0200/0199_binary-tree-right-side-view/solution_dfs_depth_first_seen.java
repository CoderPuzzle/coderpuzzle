import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] rightSideView(TreeNode root) {
        List<Integer> view = new ArrayList<>();
        // Depth-first with the right child tried first: at every depth the
        // first node popped is the rightmost one there, the node the right
        // edge sees. Parallel stacks carry each node's depth alongside it.
        Deque<TreeNode> stack = new ArrayDeque<>();
        Deque<Integer> depths = new ArrayDeque<>();
        if (root != null) {
            stack.push(root);
            depths.push(0);
        }
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            int depth = depths.pop();
            // A depth earns its entry only on that first arrival; every
            // later node popped at the same depth sits further left.
            if (depth == view.size()) {
                view.add(node.val);
            }
            // Left pushed before right, so the right child pops first.
            if (node.left != null) {
                stack.push(node.left);
                depths.push(depth + 1);
            }
            if (node.right != null) {
                stack.push(node.right);
                depths.push(depth + 1);
            }
        }
        int[] result = new int[view.size()];
        for (int i = 0; i < view.size(); ++i) {
            result[i] = view.get(i);
        }
        return result;
    }
}

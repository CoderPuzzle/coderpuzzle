import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public TreeNode findNearestRightNode(TreeNode root, int u) {
        // Level-order BFS: drain the queue one level at a time, left child
        // before right, so a level's nodes come out in left-to-right order.
        // The node right after the one matching u is the answer.
        if (root == null) {
            return null;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            boolean found = false;
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (found) {
                    return node;
                }
                if (node.val == u) {
                    found = true;
                }
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
            if (found) {
                return null;
            }
        }
        return null;
    }
}

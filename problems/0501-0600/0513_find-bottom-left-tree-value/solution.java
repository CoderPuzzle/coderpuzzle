import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int findBottomLeftValue(TreeNode root) {
        // Children enter right-first, so every row drains right-to-left and
        // the last node dequeued overall is the leftmost node of the deepest
        // row: each dequeue overwrites the answer and the final row wins.
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        int answer = root.val;
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            answer = node.val;
            if (node.right != null) {
                queue.add(node.right);
            }
            if (node.left != null) {
                queue.add(node.left);
            }
        }
        return answer;
    }
}

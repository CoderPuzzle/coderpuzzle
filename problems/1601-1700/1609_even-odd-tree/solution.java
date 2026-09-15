import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean isEvenOddTree(TreeNode root) {
        if (root == null) return true;
        int level = 0;
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            Integer prev = null;
            for (int s = 0; s < size; s++) {
                TreeNode node = queue.poll();
                if (level % 2 == 0) {
                    if (node.val % 2 == 0 || (prev != null && node.val <= prev)) return false;
                } else {
                    if (node.val % 2 != 0 || (prev != null && node.val >= prev)) return false;
                }
                prev = node.val;
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            level++;
        }
        return true;
    }
}

import java.util.ArrayDeque;
import java.util.Queue;

class Solution {

    public int deepestLeavesSum(TreeNode root) {
        // Level-order sweep: levelSum is overwritten at every level, so when
        // the queue finally empties it holds exactly the deepest leaves' sum.
        if (root == null) {
            return 0;
        }
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        int levelSum = 0;
        while (!queue.isEmpty()) {
            levelSum = 0;
            for (int size = queue.size(); size > 0; --size) {
                TreeNode node = queue.remove();
                levelSum += node.val;
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
        }
        return levelSum;
    }
}

import java.util.ArrayList;
import java.util.List;

class Solution {

    public int maxLevelSum(TreeNode root) {
        List<TreeNode> frontier = new ArrayList<>();
        frontier.add(root);
        int bestLevel = 1;
        long bestSum = root.val;
        int level = 1;
        while (!frontier.isEmpty()) {
            long total = 0;
            for (TreeNode node : frontier) total += node.val;
            // Strict > keeps the SMALLEST level on ties.
            if (total > bestSum) {
                bestSum = total;
                bestLevel = level;
            }
            List<TreeNode> next = new ArrayList<>();
            for (TreeNode node : frontier) {
                if (node.left != null) next.add(node.left);
                if (node.right != null) next.add(node.right);
            }
            frontier = next;
            level++;
        }
        return bestLevel;
    }
}

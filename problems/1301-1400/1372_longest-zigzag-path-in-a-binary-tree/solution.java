import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.Map;

/**
 * Definition for a binary tree node.
 * public class TreeNode { int val; TreeNode left; TreeNode right; TreeNode() {} TreeNode(int val) { this.val = val; } }
 */
class Solution {

    public int longestZigZag(TreeNode root) {
        if (root == null) return 0;

        // Iterative post-order: state 0 expands children, state 1 combines.
        // runs stores each node's [left-arrival, right-arrival] run lengths.
        int best = 0;
        Map<TreeNode, int[]> runs = new HashMap<>();
        ArrayDeque<Object[]> stack = new ArrayDeque<>();
        stack.push(new Object[] { root, Integer.valueOf(0) });
        while (!stack.isEmpty()) {
            Object[] frame = stack.pop();
            TreeNode node = (TreeNode) frame[0];
            int state = (Integer) frame[1];
            if (state == 1) {
                int leftRun = node.left != null ? 1 + runs.get(node.left)[1] : 0;
                int rightRun = node.right != null ? 1 + runs.get(node.right)[0] : 0;
                runs.put(node, new int[] { leftRun, rightRun });
                best = Math.max(best, Math.max(leftRun, rightRun));
                continue;
            }
            stack.push(new Object[] { node, Integer.valueOf(1) });
            if (node.left != null) stack.push(new Object[] { node.left, Integer.valueOf(0) });
            if (node.right != null) stack.push(new Object[] { node.right, Integer.valueOf(0) });
        }
        return best;
    }
}

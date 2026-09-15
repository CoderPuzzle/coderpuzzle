import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean isBalanced(TreeNode root) {
        if (root == null) return true;
        // Bottom-up height check: `heights` maps each node to its subtree
        // height, or to -1 once an imbalance is found anywhere inside it.
        Map<TreeNode, Integer> heights = new HashMap<>();
        // Explicit post-order stack: a node is settled only after both of
        // its children's heights are known — no recursion, so a 5000-node
        // skewed chain cannot overflow any call stack.
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.peek();
            TreeNode left = node.left,
                right = node.right;
            boolean settled =
                (left == null || heights.containsKey(left)) && (right == null || heights.containsKey(right));
            if (settled) {
                stack.pop();
                int leftHeight = left == null ? 0 : heights.get(left);
                int rightHeight = right == null ? 0 : heights.get(right);
                // -1 propagates: a subtree that contains an imbalance can
                // never regain balance higher up, so it fails every ancestor.
                if (leftHeight == -1 || rightHeight == -1 || Math.abs(leftHeight - rightHeight) > 1) {
                    heights.put(node, -1);
                } else {
                    heights.put(node, 1 + Math.max(leftHeight, rightHeight));
                }
            } else {
                if (left != null && !heights.containsKey(left)) stack.push(left);
                if (right != null && !heights.containsKey(right)) stack.push(right);
            }
        }
        return heights.get(root) != -1;
    }
}

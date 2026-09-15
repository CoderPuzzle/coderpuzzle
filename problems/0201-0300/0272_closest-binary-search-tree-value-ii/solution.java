import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] closestKValues(TreeNode root, double target, int k) {
        // Explicit-stack inorder: the BST flattened to its sorted values, with
        // no recursion that a 10^4-node chain could overflow.
        List<Integer> values = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode node = root;
        while (!stack.isEmpty() || node != null) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            values.add(node.val);
            node = node.right;
        }
        // Over sorted values the distance to target is V-shaped, so the k
        // closest form one window: start at the split and grow it, each step
        // taking the nearer frontier. A tie goes left — the smaller value —
        // so the picks come out in the statement's pinned order directly.
        int left = 0;
        while (left < values.size() && values.get(left) < target) {
            left++;
        }
        int right = left;
        left--;
        int[] result = new int[k];
        for (int i = 0; i < k; ++i) {
            if (
                right == values.size() ||
                (left >= 0 && Math.abs(values.get(left) - target) <= Math.abs(values.get(right) - target))
            ) {
                result[i] = values.get(left--);
            } else {
                result[i] = values.get(right++);
            }
        }
        return result;
    }
}

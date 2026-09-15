import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Solution {

    public boolean checkEquivalence(TreeNode root1, TreeNode root2) {
        // The only operator is '+', commutative and associative, so two
        // expression trees agree on every variable assignment exactly
        // when they carry the same multiset of leaf variables, whatever
        // their shape. -1 marks an operator node (always 2 children);
        // 0-25 marks a leaf's encoded letter (always 0 children).
        return Arrays.equals(leafCounts(root1), leafCounts(root2));
    }

    private int[] leafCounts(TreeNode root) {
        int[] counts = new int[26];
        Deque<TreeNode> stack = new ArrayDeque<>();
        if (root != null) stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node.left == null && node.right == null) {
                counts[node.val]++;
            } else {
                stack.push(node.left);
                stack.push(node.right);
            }
        }
        return counts;
    }
}

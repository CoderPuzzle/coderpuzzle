import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;

class Solution {

    public boolean twoSumBSTs(TreeNode root1, TreeNode root2, int target) {
        List<Integer> a = inorder(root1);
        List<Integer> b = inorder(root2);
        int i = 0,
            j = b.size() - 1;
        while (i < a.size() && j >= 0) {
            long total = (long) a.get(i) + b.get(j);
            if (total == target) return true;
            if (total < target) ++i;
            else --j;
        }
        return false;
    }

    private List<Integer> inorder(TreeNode root) {
        // Iterative in-order: a degenerate 5000-node tree would recurse past
        // the smallest judged stacks.
        List<Integer> values = new ArrayList<>();
        ArrayDeque<TreeNode> stack = new ArrayDeque<>();
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
        return values;
    }
}

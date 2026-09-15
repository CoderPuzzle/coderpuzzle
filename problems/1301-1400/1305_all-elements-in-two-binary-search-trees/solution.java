import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] getAllElements(TreeNode root1, TreeNode root2) {
        // Iterative in-order walks produce two sorted lists (no recursion, so
        // a 5000-node skewed tree cannot overflow the stack), then a merge.
        List<Integer> first = inorder(root1);
        List<Integer> second = inorder(root2);
        List<Integer> merged = new ArrayList<>(first.size() + second.size());
        int i = 0;
        int j = 0;
        while (i < first.size() && j < second.size()) {
            if (first.get(i) <= second.get(j)) {
                merged.add(first.get(i++));
            } else {
                merged.add(second.get(j++));
            }
        }
        while (i < first.size()) merged.add(first.get(i++));
        while (j < second.size()) merged.add(second.get(j++));
        int[] result = new int[merged.size()];
        for (int k = 0; k < result.length; ++k) {
            result[k] = merged.get(k);
        }
        return result;
    }

    private List<Integer> inorder(TreeNode root) {
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
        return values;
    }
}

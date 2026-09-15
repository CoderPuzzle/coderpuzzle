import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public TreeNode balanceBST(TreeNode root) {
        // phase 1: iterative in-order walk flattens the BST into sorted
        // values (explicit stack dodges recursion limits on chain inputs)
        List<Integer> values = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;
        while (!stack.isEmpty() || current != null) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            values.add(current.val);
            current = current.right;
        }
        return build(values, 0, values.size() - 1);
    }

    // midpoint as root leaves at most half the range per side, so subtree
    // depths differ by <= 1 (build recursion is O(log n) deep)
    private TreeNode build(List<Integer> values, int lo, int hi) {
        if (lo > hi) {
            return null;
        }
        int mid = lo + (hi - lo) / 2;
        TreeNode node = new TreeNode(values.get(mid));
        node.left = build(values, lo, mid - 1);
        node.right = build(values, mid + 1, hi);
        return node;
    }
}

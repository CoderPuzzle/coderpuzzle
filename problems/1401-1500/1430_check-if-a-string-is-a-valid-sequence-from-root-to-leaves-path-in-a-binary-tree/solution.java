import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean isValidSequence(TreeNode root, int[] arr) {
        if (root == null) {
            return false;
        }
        int n = arr.length;
        // Explicit stack of (node, index): a chain thousands deep must not
        // recurse, so the walk keeps its own frame list.
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Integer> indexes = new ArrayDeque<>();
        nodes.push(root);
        indexes.push(0);
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.pop();
            int i = indexes.pop();
            if (node.val != arr[i]) {
                continue;
            }
            if (i == n - 1) {
                // The array is consumed: valid only at a leaf.
                if (node.left == null && node.right == null) {
                    return true;
                }
                continue;
            }
            if (node.left != null) {
                nodes.push(node.left);
                indexes.push(i + 1);
            }
            if (node.right != null) {
                nodes.push(node.right);
                indexes.push(i + 1);
            }
        }
        return false;
    }
}

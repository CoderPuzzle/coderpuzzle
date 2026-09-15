import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int pseudoPalindromicPaths(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int count = 0;
        // Explicit stack: the tree may be a chain 10^5 deep, too deep for
        // recursion under the small run-time stacks.
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Integer> masks = new ArrayDeque<>();
        nodes.push(root);
        masks.push(1 << (root.val - 1));
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.pop();
            int mask = masks.pop();
            if (node.left == null && node.right == null) {
                // At most one set bit <=> at most one odd digit count.
                if ((mask & (mask - 1)) == 0) {
                    count++;
                }
                continue;
            }
            if (node.left != null) {
                nodes.push(node.left);
                masks.push(mask ^ (1 << (node.left.val - 1)));
            }
            if (node.right != null) {
                nodes.push(node.right);
                masks.push(mask ^ (1 << (node.right.val - 1)));
            }
        }
        return count;
    }
}

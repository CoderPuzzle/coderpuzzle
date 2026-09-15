import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int kthSmallest(TreeNode root, int k) {
        // In-order traversal of a BST visits values in ascending order, so
        // the kth visit is the kth smallest. The explicit stack simulates the
        // recursion, keeping space proportional to the tree height.
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode node = root;
        while (node != null || !stack.isEmpty()) {
            // Push and descend the left spine as far as possible.
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            // Left spine exhausted: popping is the "visit".
            node = stack.pop();
            k--;
            // Early stop: the unvisited remainder is never touched.
            if (k == 0) {
                return node.val;
            }
            node = node.right;
        }
        return -1;
    }
}

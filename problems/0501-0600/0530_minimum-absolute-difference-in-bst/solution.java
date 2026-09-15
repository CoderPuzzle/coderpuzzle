import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int getMinimumDifference(TreeNode root) {
        // An inorder walk of a BST emits values in ascending order, and a
        // sorted sequence keeps its closest pair next to each other: for any
        // two values with a third between them, that middle value is closer
        // to one end than the outer pair is wide. The minimum absolute
        // difference is therefore always a gap between consecutively visited
        // values, and one pass holding just the previously emitted value
        // sees every candidate. The traversal carries its own stack of
        // nodes: the tree may be a single 10^4-node chain, whose walk would
        // nest 10000 calls — over this judge's 512k Java thread stack — so
        // every runtime iterates instead.
        int best = Integer.MAX_VALUE;
        Integer prev = null;
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;
        while (current != null || !stack.isEmpty()) {
            // Descend the left spine stacking every node, then visit each
            // popped node and descend its right child.
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            if (prev != null) {
                best = Math.min(best, current.val - prev);
            }
            prev = current.val;
            current = current.right;
        }
        return best;
    }
}

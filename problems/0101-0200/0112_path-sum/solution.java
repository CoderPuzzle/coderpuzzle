import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean hasPathSum(TreeNode root, int targetSum) {
        // The empty tree has no root-to-leaf path at all, so no
        // targetSum — not even 0 — can be matched.
        if (root == null) return false;
        // Loop invariant: the stacks hold (node, remaining) pairs where
        // remaining is targetSum minus the sum of the values strictly
        // above `node`, so a leaf settles its whole path in one compare.
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Integer> remaining = new ArrayDeque<>();
        nodes.push(root);
        remaining.push(targetSum);
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.pop();
            int rest = remaining.pop();
            if (node.left == null && node.right == null) {
                // The path ends here, so it qualifies exactly when the
                // leaf itself covers what is still owed.
                if (rest == node.val) return true;
            } else {
                // An internal node never decides: only leaves can match,
                // even when the running sum already equals targetSum.
                if (node.left != null) {
                    nodes.push(node.left);
                    remaining.push(rest - node.val);
                }
                if (node.right != null) {
                    nodes.push(node.right);
                    remaining.push(rest - node.val);
                }
            }
        }
        return false;
    }
}

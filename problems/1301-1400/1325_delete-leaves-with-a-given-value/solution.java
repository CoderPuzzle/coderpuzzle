import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public TreeNode removeLeafNodes(TreeNode root, int target) {
        // Post-order prune with an explicit stack (a 3000-node chain would
        // overflow any recursion budget): children are judged before the node
        // itself, so the whole cascade collapses in one pass. ArrayDeque
        // rejects nulls, so the root's "no parent" is a sentinel node.
        if (root == null) {
            return null;
        }
        final TreeNode none = new TreeNode(0);
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<TreeNode> parents = new ArrayDeque<>();
        Deque<Integer> sides = new ArrayDeque<>();
        Deque<Boolean> expanded = new ArrayDeque<>();
        nodes.push(root);
        parents.push(none);
        sides.push(0);
        expanded.push(false);
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.pop();
            TreeNode parent = parents.pop();
            int side = sides.pop();
            if (!expanded.pop()) {
                nodes.push(node);
                parents.push(parent);
                sides.push(side);
                expanded.push(true);
                if (node.left != null) {
                    nodes.push(node.left);
                    parents.push(node);
                    sides.push(0);
                    expanded.push(false);
                }
                if (node.right != null) {
                    nodes.push(node.right);
                    parents.push(node);
                    sides.push(1);
                    expanded.push(false);
                }
                continue;
            }
            if (node.left == null && node.right == null && node.val == target) {
                if (parent == none) {
                    return null;
                }
                if (side == 0) {
                    parent.left = null;
                } else {
                    parent.right = null;
                }
            }
        }
        return root;
    }
}

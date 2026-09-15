import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public TreeNode lcaDeepestLeaves(TreeNode root) {
        if (root == null) return null;
        // A pre-order stack walk lists parents before children, so the
        // reversed list settles every child's height before its parent.
        Deque<TreeNode> order = new ArrayDeque<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            order.addLast(node);
            if (node.right != null) stack.push(node.right);
            if (node.left != null) stack.push(node.left);
        }
        Map<TreeNode, Integer> height = new HashMap<>();
        java.util.Iterator<TreeNode> descending = order.descendingIterator();
        while (descending.hasNext()) {
            TreeNode node = descending.next();
            int best = -1;
            if (node.left != null) best = Math.max(best, height.get(node.left));
            if (node.right != null) best = Math.max(best, height.get(node.right));
            height.put(node, best + 1);
        }
        // Descend toward the taller child; a tie means both sides reach the
        // deepest leaves, so this node is their lowest common ancestor.
        TreeNode node = root;
        while (true) {
            int leftH = node.left == null ? -1 : height.get(node.left);
            int rightH = node.right == null ? -1 : height.get(node.right);
            if (leftH > rightH) node = node.left;
            else if (rightH > leftH) node = node.right;
            else return node;
        }
    }
}

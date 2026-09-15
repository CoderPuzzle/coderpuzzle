import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] binaryTreePaths(TreeNode root) {
        List<String> paths = new ArrayList<>();
        // The constraints guarantee at least one node, so root is never null.
        walk(root, "", paths);
        return paths.toArray(new String[0]);
    }

    // Pre-order walk carrying the half-built string: each step appends
    // "->" and the child's value, and a leaf commits the whole path.
    private void walk(TreeNode node, String path, List<String> paths) {
        String extended = path + node.val;
        // A leaf is a node with no children — both absent. A node with
        // only one child is a pass-through, never a terminal.
        if (node.left == null && node.right == null) {
            paths.add(extended);
            return;
        }
        // Left subtree before right, so paths are emitted in the order
        // the pinned depth-first walk meets the leaves.
        if (node.left != null) walk(node.left, extended + "->", paths);
        if (node.right != null) walk(node.right, extended + "->", paths);
    }
}

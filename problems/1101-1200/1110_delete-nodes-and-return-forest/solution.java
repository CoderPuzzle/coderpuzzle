import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public List<TreeNode> delNodes(TreeNode root, int[] to_delete) {
        Set<Integer> deleted = new HashSet<>();
        for (int value : to_delete) deleted.add(value);
        List<TreeNode> forest = new ArrayList<>();
        TreeNode remaining = dfs(root, deleted, forest);
        // The one surviving root no deletion created is the original root.
        if (remaining != null) forest.add(remaining);
        return forest;
    }

    private TreeNode dfs(TreeNode node, Set<Integer> deleted, List<TreeNode> forest) {
        if (node == null) return null;
        // Recurse into both children first; the pruned results reattach
        // below, so deletions deep in the tree are already settled.
        node.left = dfs(node.left, deleted, forest);
        node.right = dfs(node.right, deleted, forest);
        if (deleted.contains(node.val)) {
            // This node vanishes; whichever children survived are cut
            // loose here and become new tree roots.
            if (node.left != null) forest.add(node.left);
            if (node.right != null) forest.add(node.right);
            return null;
        }
        return node;
    }
}

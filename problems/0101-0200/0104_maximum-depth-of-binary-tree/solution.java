import java.util.ArrayList;
import java.util.List;

class Solution {

    public int maxDepth(TreeNode root) {
        // Loop invariant: `level` holds exactly one level's nodes, so one
        // full round of rebuilding it counts exactly one level of depth.
        int depth = 0;
        List<TreeNode> level = new ArrayList<>();
        if (root != null) level.add(root);
        while (!level.isEmpty()) {
            depth++;
            // Collect only the real children, so nodes of two levels never
            // mix inside one frontier and a leaf contributes nothing.
            List<TreeNode> next = new ArrayList<>();
            for (TreeNode node : level) {
                if (node.left != null) next.add(node.left);
                if (node.right != null) next.add(node.right);
            }
            level = next;
        }
        return depth;
    }
}

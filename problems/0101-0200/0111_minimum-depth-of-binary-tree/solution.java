import java.util.ArrayList;
import java.util.List;

class Solution {

    public int minDepth(TreeNode root) {
        // Loop invariant: `frontier` holds exactly one level's nodes, and
        // every node above them is internal, so the first leaf met in
        // level order sits at the minimum depth.
        if (root == null) return 0;
        int depth = 0;
        List<TreeNode> frontier = new ArrayList<>();
        frontier.add(root);
        while (!frontier.isEmpty()) {
            depth++;
            List<TreeNode> next = new ArrayList<>();
            for (TreeNode node : frontier) {
                if (node.left == null && node.right == null) {
                    // A leaf at this depth ends the search: BFS never
                    // visits below the minimum depth, which is the point.
                    return depth;
                }
                if (node.left != null) next.add(node.left);
                if (node.right != null) next.add(node.right);
            }
            frontier = next;
        }
        return depth;
    }
}

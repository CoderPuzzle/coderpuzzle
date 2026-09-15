import java.util.ArrayList;
import java.util.List;

class Solution {

    public int heightOfTree(TreeNode root) {
        if (root == null) {
            return 0;
        }
        // A leaf of the special tree is the one node the display cannot
        // mark: the ring gives every leaf both children, and the previous
        // leaf's right child points back at the leaf itself. A wave only
        // descends from the nodes the test clears, so the ring never
        // joins a wave and every reached node is visited once.
        List<TreeNode> frontier = new ArrayList<>();
        frontier.add(root);
        int height = 0;
        while (true) {
            List<TreeNode> wave = new ArrayList<>();
            for (TreeNode node : frontier) {
                if (node.left != null && node.left.right == node) {
                    continue;
                }
                if (node.left != null) {
                    wave.add(node.left);
                }
                if (node.right != null) {
                    wave.add(node.right);
                }
            }
            if (wave.isEmpty()) {
                return height;
            }
            height++;
            frontier = wave;
        }
    }
}

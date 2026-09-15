import java.util.ArrayList;
import java.util.List;

class Solution {

    public List<TreeNode> generateTrees(int n) {
        return build(1, n);
    }

    private List<TreeNode> build(int lo, int hi) {
        List<TreeNode> trees = new ArrayList<>();
        // An empty range still offers one choice: the null subtree.
        if (lo > hi) {
            trees.add(null);
            return trees;
        }
        for (int root = lo; root <= hi; ++root) {
            List<TreeNode> lefts = build(lo, root - 1);
            List<TreeNode> rights = build(root + 1, hi);
            // Left choices vary slower than right choices, so the loop
            // nesting emits the trees in the order the statement pins.
            for (TreeNode left : lefts) {
                for (TreeNode right : rights) {
                    trees.add(new TreeNode(root, left, right));
                }
            }
        }
        return trees;
    }
}

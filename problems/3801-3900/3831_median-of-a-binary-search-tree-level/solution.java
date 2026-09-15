import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int levelMedian(TreeNode root, int level) {
        // Descend one frontier at a time: every pass replaces the current
        // level's nodes with their children, so after `level` passes the
        // frontier IS the queried level. If it empties first, that level
        // does not exist and -1 is the answer. Plain loops over an
        // explicit frontier — no recursion — so a 200,000-node chain is
        // as safe as a bushy tree.
        List<TreeNode> frontier = new ArrayList<>();
        if (root != null) {
            frontier.add(root);
        }
        for (int depth = 0; depth < level && !frontier.isEmpty(); depth++) {
            List<TreeNode> next = new ArrayList<>(2 * frontier.size());
            for (TreeNode node : frontier) {
                if (node.left != null) {
                    next.add(node.left);
                }
                if (node.right != null) {
                    next.add(node.right);
                }
            }
            frontier = next;
        }
        if (frontier.isEmpty()) {
            return -1;
        }
        // The upper median sits at index size / 2 of the sorted level
        // values: the exact middle for odd counts, the larger of the two
        // middle elements for even counts.
        List<Integer> values = new ArrayList<>(frontier.size());
        for (TreeNode node : frontier) {
            values.add(node.val);
        }
        Collections.sort(values);
        return values.get(values.size() / 2);
    }
}

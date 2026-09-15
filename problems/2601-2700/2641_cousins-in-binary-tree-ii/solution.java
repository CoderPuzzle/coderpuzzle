import java.util.ArrayList;
import java.util.List;

class Solution {

    public TreeNode replaceValueInTree(TreeNode root) {
        // A node's new value is (sum of its level) - (its own original value
        // plus its sibling's). Two-phase breadth-first passes read a whole
        // level of children with their original values first — recording
        // where each parent's sibling group ends — then write the cousin
        // sums back group by group. Iterative on purpose: chains can run
        // 10^5 nodes deep, far past comfortable recursion. Level sums stay
        // below 10^5 * 10^4, but long keeps the additions worry-free.
        List<TreeNode> row = new ArrayList<>();
        root.val = 0;
        row.add(root);
        while (!row.isEmpty()) {
            List<TreeNode> children = new ArrayList<>();
            List<Integer> ends = new ArrayList<>();
            long childSum = 0;
            for (TreeNode node : row) {
                if (node.left != null) {
                    children.add(node.left);
                    childSum += node.left.val;
                }
                if (node.right != null) {
                    children.add(node.right);
                    childSum += node.right.val;
                }
                ends.add(children.size());
            }
            int index = 0;
            for (int end : ends) {
                if (end > index) {
                    long pairSum = 0;
                    for (int k = index; k < end; ++k) pairSum += children.get(k).val;
                    long newValue = childSum - pairSum;
                    for (int k = index; k < end; ++k) children.get(k).val = (int) newValue;
                }
                index = end;
            }
            row = children;
        }
        return root;
    }
}

import java.util.ArrayList;
import java.util.List;

class Solution {

    public TreeNode recoverFromPreorder(String traversal) {
        // Parse the string into (depth, value) pairs: a run of dashes gives
        // the depth, then a run of digits gives the value (values are
        // guaranteed positive, so no '-' ever appears inside a digit run).
        int n = traversal.length();
        int i = 0;
        List<TreeNode> stack = new ArrayList<>();
        while (i < n) {
            int depth = 0;
            while (i < n && traversal.charAt(i) == '-') {
                depth++;
                i++;
            }
            int j = i;
            while (j < n && Character.isDigit(traversal.charAt(j))) {
                j++;
            }
            int value = Integer.parseInt(traversal.substring(i, j));
            i = j;
            // The node at this depth replaces everything deeper than it on
            // the current path; whatever remains on top is its parent.
            while (stack.size() > depth) {
                stack.remove(stack.size() - 1);
            }
            TreeNode node = new TreeNode(value);
            if (!stack.isEmpty()) {
                TreeNode parent = stack.get(stack.size() - 1);
                if (parent.left == null) {
                    parent.left = node;
                } else {
                    parent.right = node;
                }
            }
            stack.add(node);
        }
        return stack.isEmpty() ? null : stack.get(0);
    }
}

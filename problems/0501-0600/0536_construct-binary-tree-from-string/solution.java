import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public TreeNode str2tree(String s) {
        // The parens spell a preorder walk: every integer opens a node, and
        // every parenthesized group is one whole subtree written right after
        // the node that owns it. The stack holds the ancestors still open
        // for children, so one left-to-right scan decides each node in the
        // very order its pieces appear.
        Deque<TreeNode> stack = new ArrayDeque<>();
        int n = s.length();
        int i = 0;
        while (i < n) {
            char ch = s.charAt(i);
            if (ch == '(') {
                i++;
            } else if (ch == ')') {
                // A group just closed: the subtree on top is finished and
                // belongs to the node underneath — in the left slot if that
                // is still open, otherwise the right.
                TreeNode child = stack.pop();
                if (!stack.isEmpty()) {
                    TreeNode parent = stack.peek();
                    if (parent.left == null) {
                        parent.left = child;
                    } else {
                        parent.right = child;
                    }
                }
                i++;
            } else {
                // Anything else starts a value: a run of digits with an
                // optional leading '-', up to the next parenthesis.
                int j = i;
                while (j < n && s.charAt(j) != '(' && s.charAt(j) != ')') {
                    j++;
                }
                stack.push(new TreeNode(Integer.parseInt(s.substring(i, j))));
                i = j;
            }
        }
        // Every node but the root is closed by its group's ')', so exactly
        // the root remains — or nothing, for the empty string.
        return stack.isEmpty() ? null : stack.peek();
    }
}

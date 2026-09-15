import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public String tree2str(TreeNode root) {
        // The answer is a preorder walk written under two paren rules: a node
        // with any child opens a group for it, and a group is dropped only
        // when the child is absent — except that an absent left child beside
        // a present right one leaves its "()" placeholder so the two groups
        // stay tell-apart. The stack interleaves those literal parens with
        // the pending nodes in exactly the order they must be written, so one
        // pop-and-emit loop produces the whole string.
        // Iterative on purpose: the 10'000-node chain the constraints allow
        // overflows the small stacks the judge hands this runtime; the
        // explicit stack is one entry per pending node or paren and never
        // nests a call.
        StringBuilder result = new StringBuilder();
        // TreeNodes and the literal "(" / ")" markers share the stack.
        Deque<Object> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            Object item = stack.pop();
            if (item instanceof String) {
                result.append((String) item);
                continue;
            }
            TreeNode node = (TreeNode) item;
            result.append(node.val);
            if (node.left != null || node.right != null) {
                if (node.right != null) {
                    // The right group is written second, so it is pushed
                    // first and pops after the left group is finished.
                    stack.push(")");
                    stack.push(node.right);
                    stack.push("(");
                    if (node.left == null) {
                        // A right child with no left one: the empty pair
                        // marks where the left group would have been.
                        result.append("()");
                    }
                }
                if (node.left != null) {
                    stack.push(")");
                    stack.push(node.left);
                    stack.push("(");
                }
            }
        }
        return result.toString();
    }
}

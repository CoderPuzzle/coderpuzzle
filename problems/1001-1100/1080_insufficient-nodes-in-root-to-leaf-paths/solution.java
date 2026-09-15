import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    private static final class Frame {

        final TreeNode node;
        final int remaining;
        final TreeNode parent;
        final boolean isLeft;
        final boolean revisited;

        Frame(TreeNode node, int remaining, TreeNode parent, boolean isLeft, boolean revisited) {
            this.node = node;
            this.remaining = remaining;
            this.parent = parent;
            this.isLeft = isLeft;
            this.revisited = revisited;
        }
    }

    public TreeNode sufficientSubset(TreeNode root, int limit) {
        // Post-order with an explicit stack. Each frame is (node, remaining,
        // parent, isLeft, revisited): the first visit pushes the children
        // with the budget reduced by the node's value, and the second visit
        // decides keep-or-prune once the children are pruned in place. A
        // leaf survives iff its value clears the remaining budget; an
        // internal node survives iff at least one child survived.
        Deque<Frame> stack = new ArrayDeque<>();
        stack.push(new Frame(root, limit, null, false, false));
        TreeNode result = null;
        while (!stack.isEmpty()) {
            Frame top = stack.pop();
            TreeNode node = top.node;
            if (node == null) continue;
            if (!top.revisited) {
                if (node.left == null && node.right == null) {
                    if (node.val < top.remaining) {
                        if (top.parent == null) {
                            result = null;
                        } else if (top.isLeft) {
                            top.parent.left = null;
                        } else {
                            top.parent.right = null;
                        }
                    } else if (top.parent == null) {
                        result = node;
                    }
                    continue;
                }
                stack.push(new Frame(node, top.remaining, top.parent, top.isLeft, true));
                stack.push(new Frame(node.right, top.remaining - node.val, node, false, false));
                stack.push(new Frame(node.left, top.remaining - node.val, node, true, false));
            } else if (node.left == null && node.right == null) {
                // Both children were pruned, so no leaf below reaches limit.
                if (top.parent == null) {
                    result = null;
                } else if (top.isLeft) {
                    top.parent.left = null;
                } else {
                    top.parent.right = null;
                }
            } else if (top.parent == null) {
                result = node;
            }
        }
        return result;
    }
}

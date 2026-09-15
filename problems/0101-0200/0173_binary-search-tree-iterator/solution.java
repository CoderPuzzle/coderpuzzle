import java.util.ArrayDeque;
import java.util.Deque;

class BSTIterator {

    private final Deque<TreeNode> stack = new ArrayDeque<>();

    // Push the left spine of the root: the stack top is the smallest
    // unvisited node and the stack holds exactly one root-to-node path
    // (O(h) memory).
    public BSTIterator(TreeNode root) {
        pushSpine(root);
    }

    private void pushSpine(TreeNode node) {
        // Everything on this path is smaller than what lies below it, so the
        // last one pushed is the next value in order.
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }

    public int next() {
        TreeNode node = stack.pop();
        // The popped node's right subtree holds the values that come next;
        // its left spine is the front of that block.
        pushSpine(node.right);
        return node.val;
    }

    public boolean hasNext() {
        return !stack.isEmpty();
    }
}

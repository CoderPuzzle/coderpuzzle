import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class BSTIterator {

    private final List<Integer> values = new ArrayList<>();
    private int index = -1;

    // Iterative in-order traversal (explicit stack, so depth never risks
    // the call stack) collects the ascending values once. index points at
    // the current value, starting at -1 for "before the first value".
    public BSTIterator(TreeNode root) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode node = root;
        while (!stack.isEmpty() || node != null) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            values.add(node.val);
            node = node.right;
        }
    }

    public boolean hasNext() {
        return index + 1 < values.size();
    }

    public int next() {
        index++;
        return values.get(index);
    }

    public boolean hasPrev() {
        return index > 0;
    }

    public int prev() {
        index--;
        return values.get(index);
    }
}

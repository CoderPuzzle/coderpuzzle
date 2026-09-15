import java.util.ArrayDeque;
import java.util.Deque;

class FindElements {

    private final TreeNode root;

    // Constructor: iterative recovery pass. The root is 0; a child of x
    // is 2x + 1 (left) or 2x + 2 (right), so one BFS fixes every value.
    public FindElements(TreeNode root) {
        this.root = root;
        root.val = 0;
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node.left != null) {
                node.left.val = 2 * node.val + 1;
                queue.add(node.left);
            }
            if (node.right != null) {
                node.right.val = 2 * node.val + 2;
                queue.add(node.right);
            }
        }
    }

    // With w = target + 1, stepping left doubles w (append bit 0) and
    // stepping right doubles w and adds one (append bit 1), so the bits
    // after the leading one, read highest-first, give the moves.
    public boolean find(int target) {
        int path = target + 1;
        int top = 31 - Integer.numberOfLeadingZeros(path);
        TreeNode node = root;
        for (int bit = top - 1; bit >= 0 && node != null; --bit) {
            node = ((path >> bit) & 1) == 1 ? node.right : node.left;
        }
        return node != null;
    }
}

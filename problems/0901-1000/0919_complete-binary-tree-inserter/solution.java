import java.util.ArrayDeque;
import java.util.Deque;

class CBTInserter {

    private final TreeNode root;
    private final Deque<TreeNode> pending = new ArrayDeque<>();

    // One level-order pass queues every node that still has a free child
    // slot. BFS visits parents left-to-right, so the queue front is always
    // the parent of the next complete position.
    public CBTInserter(TreeNode root) {
        this.root = root;
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node.left == null || node.right == null) {
                pending.addLast(node);
            }
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
    }

    public int insert(int v) {
        TreeNode parent = pending.peekFirst();
        TreeNode node = new TreeNode(v);
        if (parent.left == null) {
            parent.left = node;
        } else {
            parent.right = node;
            pending.pollFirst();
        }
        pending.addLast(node);
        return parent.val;
    }

    public TreeNode get_root() {
        return root;
    }
}

import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int[] closestKValues(TreeNode root, double target, int k) {
        // One descent from the root sorts the tree around target. A node at
        // or below target is a candidate predecessor and anything nearer to
        // target on that side lives in its right subtree, so the walk steps
        // right after pushing it; a node above target mirrors onto the
        // successor stack and steps left. Each stack ends with its side's
        // nearest value on top, the rest of the side ordered underneath.
        Deque<TreeNode> predecessors = new ArrayDeque<>();
        Deque<TreeNode> successors = new ArrayDeque<>();
        TreeNode node = root;
        while (node != null) {
            if (node.val <= target) {
                predecessors.push(node);
                node = node.right;
            } else {
                successors.push(node);
                node = node.left;
            }
        }
        // Each pick pops the nearer top — a tie goes to the predecessor,
        // which holds the smaller value — then restores its stack by pushing
        // the popped node's inner spine: the right edge of a predecessor's
        // left subtree, the left edge of a successor's right subtree. Each
        // side sweeps outward from target one value at a time, so picks come
        // out ordered exactly as the statement pins them.
        int[] result = new int[k];
        for (int i = 0; i < k; ++i) {
            boolean takePredecessor =
                successors.isEmpty() ||
                (!predecessors.isEmpty() &&
                    Math.abs(predecessors.peek().val - target) <= Math.abs(successors.peek().val - target));
            if (takePredecessor) {
                TreeNode picked = predecessors.pop();
                result[i] = picked.val;
                TreeNode child = picked.left;
                while (child != null) {
                    predecessors.push(child);
                    child = child.right;
                }
            } else {
                TreeNode picked = successors.pop();
                result[i] = picked.val;
                TreeNode child = picked.right;
                while (child != null) {
                    successors.push(child);
                    child = child.left;
                }
            }
        }
        return result;
    }
}

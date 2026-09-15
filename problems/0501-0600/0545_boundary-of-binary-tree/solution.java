import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] boundaryOfBinaryTree(TreeNode root) {
        // Left boundary: start at the root's left child and keep descending,
        // left child when present and otherwise the right child, stopping
        // before any leaf — the leftmost leaf prints in the leaves alone.
        List<Integer> boundary = new ArrayList<>();
        boundary.add(root.val);
        TreeNode node = root.left;
        while (node != null && !isLeaf(node)) {
            boundary.add(node.val);
            node = node.left != null ? node.left : node.right;
        }

        // Leaves left to right: an explicit-stack pre-order seeded with the
        // root's children (the root is never a leaf here, and being skipped
        // at the seed it cannot print twice), right child pushed first so
        // pops run left to right. The stack replaces recursion, so a
        // 10^4-deep chain costs no call stack.
        Deque<TreeNode> stack = new ArrayDeque<>();
        if (root.right != null) {
            stack.push(root.right);
        }
        if (root.left != null) {
            stack.push(root.left);
        }
        while (!stack.isEmpty()) {
            node = stack.pop();
            if (isLeaf(node)) {
                boundary.add(node.val);
                continue;
            }
            if (node.right != null) {
                stack.push(node.right);
            }
            if (node.left != null) {
                stack.push(node.left);
            }
        }

        // Right boundary: the mirror walk from the root's right child —
        // right child preferred, stopped before its leaf — collected on the
        // way down and emitted reversed.
        List<Integer> right = new ArrayList<>();
        node = root.right;
        while (node != null && !isLeaf(node)) {
            right.add(node.val);
            node = node.right != null ? node.right : node.left;
        }
        int[] values = new int[boundary.size() + right.size()];
        for (int i = 0; i < boundary.size(); i++) {
            values[i] = boundary.get(i);
        }
        for (int i = 0; i < right.size(); i++) {
            values[boundary.size() + i] = right.get(right.size() - 1 - i);
        }
        return values;
    }

    private boolean isLeaf(TreeNode node) {
        return node.left == null && node.right == null;
    }
}

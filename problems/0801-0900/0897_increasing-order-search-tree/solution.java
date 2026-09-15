import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public TreeNode increasingBST(TreeNode root) {
        // The required tree's values, read from its root down its only
        // right links, are ascending — exactly the order an in-order walk
        // of a binary search tree visits. So the answer is that walk,
        // relinked: the leftmost node (visited first) becomes the root,
        // every left link is severed, every right link points at the next
        // visited node. The traversal carries its own stack of deferred
        // nodes rather than recursing, so no runtime call stack is touched
        // at all: the stack holds the current left spine only.
        List<TreeNode> nodes = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;
        while (current != null || !stack.isEmpty()) {
            // Descend one left spine, deferring every node on it.
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            // The stack top is now the leftmost unvisited node: visit it
            // and continue the walk in its right subtree.
            TreeNode node = stack.pop();
            nodes.add(node);
            current = node.right;
        }
        // Relink the visit order into the spine: the last node keeps no
        // right child, and no node keeps a left child.
        for (int i = 0; i < nodes.size(); i++) {
            TreeNode node = nodes.get(i);
            node.left = null;
            node.right = i + 1 < nodes.size() ? nodes.get(i + 1) : null;
        }
        return nodes.isEmpty() ? null : nodes.get(0);
    }
}

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    // a node paired with the parent it hangs from — the parent is what the
    // fix needs when the sweep finds the defect
    private record Frame(TreeNode node, TreeNode parent) {}

    public TreeNode correctBinaryTree(TreeNode root, int fromNode, int toNode) {
        // The tree arrives clean — the defect exists only after the
        // custom-testing step — so the first walk rebuilds it: every node
        // recorded by value, the fromNode node's empty right slot pointed
        // at the toNode node. The correction is a breadth-first sweep that
        // takes each level right to left, marking nodes seen on enqueue and
        // carrying each node's parent alongside it. toNode sits right of
        // fromNode on the same depth, so by the time fromNode is dequeued
        // its right child is already seen — and no other node can pass
        // that test, because in a tree every child is enqueued exactly
        // once, by its own parent; only the wired edge breaks that.
        Map<Integer, TreeNode> byValue = new HashMap<>();
        Deque<TreeNode> walk = new ArrayDeque<>();
        walk.push(root);
        while (!walk.isEmpty()) {
            TreeNode node = walk.pop();
            if (node == null) {
                continue;
            }
            byValue.put(node.val, node);
            if (node.left != null) {
                walk.push(node.left);
            }
            if (node.right != null) {
                walk.push(node.right);
            }
        }
        byValue.get(fromNode).right = byValue.get(toNode);
        Set<TreeNode> seen = new HashSet<>();
        seen.add(root);
        Deque<Frame> pending = new ArrayDeque<>();
        pending.add(new Frame(root, null));
        while (!pending.isEmpty()) {
            Frame frame = pending.poll();
            if (frame.node().right != null && seen.contains(frame.node().right)) {
                // detach the offender through the parent beside it
                if (frame.parent().left == frame.node()) {
                    frame.parent().left = null;
                } else {
                    frame.parent().right = null;
                }
                return root;
            }
            if (frame.node().right != null) {
                seen.add(frame.node().right);
                pending.add(new Frame(frame.node().right, frame.node()));
            }
            if (frame.node().left != null) {
                seen.add(frame.node().left);
                pending.add(new Frame(frame.node().left, frame.node()));
            }
        }
        return root;
    }
}

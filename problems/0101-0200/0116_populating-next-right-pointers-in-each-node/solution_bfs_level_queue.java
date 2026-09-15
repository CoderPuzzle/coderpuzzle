import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public NodeWithNext connect(NodeWithNext root) {
        if (root == null) return null;
        Deque<NodeWithNext> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            // Snapshot the width now: children added below belong to the
            // next level, so draining exactly this many nodes walks one
            // level per round.
            int width = queue.size();
            NodeWithNext previous = null;
            for (int i = 0; i < width; i++) {
                NodeWithNext node = queue.poll();
                // The node dequeued just before this one is exactly its
                // right-hand neighbor; the level's last node finds no
                // successor and keeps its empty `next`.
                if (previous != null) previous.next = node;
                previous = node;
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
        }
        return root;
    }
}

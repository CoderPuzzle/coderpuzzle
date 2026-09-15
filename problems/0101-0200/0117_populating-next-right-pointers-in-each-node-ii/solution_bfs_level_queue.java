import java.util.ArrayDeque;
import java.util.Queue;

class Solution {

    public NodeWithNext connect(NodeWithNext root) {
        if (root == null) {
            return null;
        }
        Queue<NodeWithNext> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            // queue.size() is this level's width; children added inside the
            // loop belong to the next level and never enter this round.
            int size = queue.size();
            NodeWithNext previous = null;
            for (int i = 0; i < size; i++) {
                NodeWithNext node = queue.poll();
                // Link to whoever is polled next within the same level; the
                // level's last node keeps the empty next it started with.
                if (previous != null) previous.next = node;
                previous = node;
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
        }
        return root;
    }
}

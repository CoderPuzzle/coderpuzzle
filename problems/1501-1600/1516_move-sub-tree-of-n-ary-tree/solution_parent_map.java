import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public Node moveSubTree(Node root, Node p, Node q) {
        // Pass one records every node's parent in a registry keyed by value
        // (the values are unique; the root has no entry); pass two probes
        // p's subtree for q. The surgery is the same three edits either way
        // -- the registry is what answers the lookups.
        Map<Integer, Node> parent = new HashMap<>();
        ArrayDeque<Node> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            Node node = stack.pop();
            for (Node child : node.children) {
                parent.put(child.val, node);
                stack.push(child);
            }
        }
        boolean below = false;
        ArrayDeque<Node> probe = new ArrayDeque<>();
        probe.push(p);
        while (!probe.isEmpty()) {
            Node node = probe.pop();
            if (node == q) {
                below = true;
                break;
            }
            for (Node child : node.children) probe.push(child);
        }
        // p already hangs exactly where the move wants it: nothing to do.
        for (Node child : q.children) if (child == p) return root;
        if (below) {
            parent.get(q.val).children.remove(q);
            if (!parent.containsKey(p.val)) {
                // p is the root: q takes over
                q.children.add(p);
                return q;
            }
            Node holder = parent.get(p.val);
            holder.children.set(holder.children.indexOf(p), q);
            q.children.add(p);
            return root;
        }
        parent.get(p.val).children.remove(p);
        q.children.add(p);
        return root;
    }
}

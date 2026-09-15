import java.util.ArrayDeque;

class Solution {

    public Node moveSubTree(Node root, Node p, Node q) {
        // One sweep gathers the facts the rewiring needs: p's parent, q's
        // parent, and whether q sits inside p's subtree -- depth counts how
        // many levels below p the walk currently is (0 means outside).
        Node pParent = null,
            qParent = null;
        boolean qBelow = false;
        ArrayDeque<Object[]> stack = new ArrayDeque<>();
        stack.push(new Object[] { root, null, 0 });
        while (!stack.isEmpty()) {
            Object[] top = stack.pop();
            Node node = (Node) top[0],
                parent = (Node) top[1];
            int depth = (Integer) top[2];
            if (node == p) pParent = parent;
            if (node == q) {
                qParent = parent;
                qBelow = depth > 0;
            }
            int next = depth > 0 || node == p ? depth + 1 : 0;
            for (Node child : node.children) stack.push(new Object[] { child, node, next });
        }
        // p already hangs exactly where the move wants it: nothing to do.
        for (Node child : q.children) if (child == p) return root;
        if (qBelow) {
            // Case 1: q travels inside p's subtree, so free q and re-hang it
            // where p stood -- in p's parent's children list, or at the root
            // when p is the root -- before p becomes q's last child.
            qParent.children.remove(q);
            if (pParent == null) {
                q.children.add(p);
                return q;
            }
            pParent.children.set(pParent.children.indexOf(p), q);
            q.children.add(p);
            return root;
        }
        // Cases 2 and 3: a plain re-attachment of p (with its subtree).
        pParent.children.remove(p);
        q.children.add(p);
        return root;
    }
}

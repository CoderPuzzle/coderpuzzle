import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public Node findRoot(List<Node> tree) {
        // Indegree zero: every node except the root appears exactly once as
        // someone's child. Collect all the nodes, then discard every node
        // seen as a child — the one survivor is the root.
        Set<Node> survivors = new HashSet<>(tree);
        for (Node node : tree) {
            for (Node child : node.children) {
                survivors.remove(child);
            }
        }
        return survivors.iterator().next();
    }
}

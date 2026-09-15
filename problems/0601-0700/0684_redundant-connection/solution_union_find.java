import java.util.HashMap;
import java.util.Map;

class Solution {

    private final Map<Integer, Integer> parent = new HashMap<>();

    public int[] findRedundantConnection(int[][] edges) {
        parent.clear();
        // A tree plus one extra edge has exactly one cycle; the first edge
        // failing the union test is the one that closes it.
        for (int[] edge : edges) {
            if (!union(edge[0], edge[1])) {
                return edge;
            }
        }
        return new int[0];
    }

    private int find(int node) {
        int root = node;
        while (parent.get(root) != root) {
            root = parent.get(root);
        }
        // Second walk repoints every visited node at the root (path
        // compression), flattening the structure for later finds.
        while (parent.get(node) != root) {
            int next = parent.get(node);
            parent.put(node, root);
            node = next;
        }
        return root;
    }

    private boolean union(int a, int b) {
        // Unseen nodes register lazily on first touch.
        parent.putIfAbsent(a, a);
        parent.putIfAbsent(b, b);
        int ra = find(a);
        int rb = find(b);
        // Equal roots mean this edge would reconnect one component: the cycle.
        if (ra == rb) {
            return false;
        }
        parent.put(ra, rb);
        return true;
    }
}

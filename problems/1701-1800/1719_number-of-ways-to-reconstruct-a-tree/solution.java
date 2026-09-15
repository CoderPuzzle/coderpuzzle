import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int checkWays(int[][] pairs) {
        // The pair set of any valid tree is exactly its ancestor pairs, so
        // a node's adjacency names all of its ancestors and all of its
        // descendants at once. The root pairs with every other value, so
        // the largest degree must be V-1, where V is the number of
        // distinct values. Walk the values in decreasing degree order,
        // placing each one: every neighbor of v that is already placed
        // has degree at least v's, hence is an ancestor of v in every
        // valid tree, and the smallest-degree such neighbor is the
        // deepest one — v's parent. An ancestor's adjacency must then
        // swallow v's whole adjacency minus the parent itself; a
        // neighbor of v outside the parent's adjacency means no tree
        // realizes the pairs (0). A parent whose degree equals v's
        // differs from v exactly by the pair between them — the two can
        // be swapped, so more than one tree exists (2). Otherwise every
        // parent is forced and exactly one tree exists (1).
        boolean[][] adj = new boolean[501][501];
        int[] deg = new int[501];
        for (int[] pair : pairs) {
            int x = pair[0];
            int y = pair[1];
            adj[x][y] = true;
            adj[y][x] = true;
            deg[x]++;
            deg[y]++;
        }
        List<Integer> order = new ArrayList<>();
        for (int v = 1; v <= 500; v++) {
            if (deg[v] > 0) {
                order.add(v);
            }
        }
        order.sort((a, b) -> Integer.compare(deg[b], deg[a]));
        boolean[] placed = new boolean[501];
        placed[order.get(0)] = true;
        if (deg[order.get(0)] != order.size() - 1) {
            return 0;
        }
        boolean multiple = false;
        for (int i = 1; i < order.size(); i++) {
            int v = order.get(i);
            int parent = 0;
            for (int u = 1; u <= 500; u++) {
                if (adj[v][u] && placed[u] && (parent == 0 || deg[u] < deg[parent])) {
                    parent = u;
                }
            }
            if (parent == 0) {
                return 0;
            }
            boolean contained = true;
            for (int w = 1; w <= 500; w++) {
                if (adj[v][w] && w != parent && !adj[parent][w]) {
                    contained = false;
                    break;
                }
            }
            if (!contained) {
                return 0;
            }
            if (deg[parent] == deg[v]) {
                multiple = true;
            }
            placed[v] = true;
        }
        return multiple ? 2 : 1;
    }
}

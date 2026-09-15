import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] findMinHeightTrees(int n, int[][] edges) {
        // A one- or two-node tree is its own center; the general loop would
        // also mishandle two nodes that are each other's leaves.
        if (n <= 2) {
            int[] r = new int[n];
            for (int i = 0; i < n; i++) r[i] = i;
            return r;
        }
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i < n; i++) adjacency.add(new ArrayList<>());
        int[] degree = new int[n];
        for (int[] e : edges) {
            int a = e[0],
                b = e[1];
            adjacency.get(a).add(b);
            adjacency.get(b).add(a);
            degree[a]++;
            degree[b]++;
        }
        // Peel the tree from the outside in, topological-sort style: delete
        // all current leaves at once, each layer shortening every longest
        // root-to-leaf distance of the remaining core.
        Deque<Integer> leaves = new ArrayDeque<>();
        for (int i = 0; i < n; i++) if (degree[i] == 1) leaves.add(i);
        int remaining = n;
        // The MHT root is the middle of the diameter path: one node when the
        // diameter has an even edge count, two adjacent middles when odd.
        while (remaining > 2) {
            // k snapshots the layer at round start, so leaves enqueued
            // during the round wait for the next round.
            for (int k = leaves.size(); k > 0; k--) {
                int leaf = leaves.poll();
                remaining--;
                // The popped leaf's own degree is never zeroed; a popped
                // node is not examined again, so it is harmless.
                for (int neighbor : adjacency.get(leaf)) {
                    degree[neighbor]--;
                    if (degree[neighbor] == 1) leaves.add(neighbor);
                }
            }
        }
        // The one or two survivors are the centroids (MHT roots).
        int[] result = new int[leaves.size()];
        int idx = 0;
        for (int v : leaves) result[idx++] = v;
        Arrays.sort(result);
        return result;
    }
}

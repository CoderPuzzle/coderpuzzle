import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.BitSet;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[][] getAncestors(int n, int[][] edges) {
        // Kahn's order over the graph's natural direction: a node is dequeued
        // only once every incoming edge is consumed, so all of its direct
        // parents are final and its ancestor set is the union of each parent
        // plus that parent's already-computed set.
        List<List<Integer>> children = new ArrayList<>();
        List<List<Integer>> parents = new ArrayList<>();
        for (int i = 0; i < n; ++i) {
            children.add(new ArrayList<>());
            parents.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            children.get(edge[0]).add(edge[1]);
            parents.get(edge[1]).add(edge[0]);
        }
        int[] indegree = new int[n];
        for (int i = 0; i < n; ++i) {
            indegree[i] = parents.get(i).size();
        }
        BitSet[] ancestors = new BitSet[n];
        Deque<Integer> queue = new ArrayDeque<>();
        for (int v = 0; v < n; ++v) {
            if (indegree[v] == 0) {
                queue.addLast(v);
            }
        }
        while (!queue.isEmpty()) {
            int node = queue.pollFirst();
            BitSet set = new BitSet(n);
            for (int parent : parents.get(node)) {
                set.set(parent);
                set.or(ancestors[parent]);
            }
            ancestors[node] = set;
            for (int child : children.get(node)) {
                if (--indegree[child] == 0) {
                    queue.addLast(child);
                }
            }
        }
        int[][] answer = new int[n][];
        for (int v = 0; v < n; ++v) {
            List<Integer> row = new ArrayList<>();
            for (int u = ancestors[v].nextSetBit(0); u >= 0; u = ancestors[v].nextSetBit(u + 1)) {
                row.add(u);
            }
            answer[v] = row.stream().mapToInt(Integer::intValue).toArray();
        }
        return answer;
    }
}

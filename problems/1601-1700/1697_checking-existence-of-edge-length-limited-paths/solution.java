import java.util.Arrays;
import java.util.Comparator;

class Solution {

    public boolean[] distanceLimitedPathsExist(int n, int[][] edgeList, int[][] queries) {
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
        // Answer offline: the edge sets usable under growing limits are
        // nested, so union-find only ever grows. Sorting query indices (not
        // the queries) lets answers return to their original positions.
        int[][] edges = edgeList.clone();
        Arrays.sort(edges, Comparator.comparingInt(e -> e[2]));
        Integer[] order = new Integer[queries.length];
        for (int i = 0; i < order.length; i++) {
            order[i] = i;
        }
        Arrays.sort(order, Comparator.comparingInt(i -> queries[i][2]));
        boolean[] answer = new boolean[queries.length];
        int ei = 0;
        for (int qi : order) {
            int p = queries[qi][0];
            int q = queries[qi][1];
            int limit = queries[qi][2];
            // Union every edge strictly below the limit — the strict <
            // excludes edges of weight exactly equal to it.
            while (ei < edges.length && edges[ei][2] < limit) {
                int ra = find(parent, edges[ei][0]);
                int rb = find(parent, edges[ei][1]);
                if (ra != rb) {
                    parent[ra] = rb;
                }
                ei++;
            }
            // The query reduces to a connectivity check.
            answer[qi] = find(parent, p) == find(parent, q);
        }
        return answer;
    }

    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}

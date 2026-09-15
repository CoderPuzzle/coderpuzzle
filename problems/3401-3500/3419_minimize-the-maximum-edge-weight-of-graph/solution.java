import java.util.ArrayList;
import java.util.List;

class Solution {

    public int minMaxWeight(int n, int[][] edges, int threshold) {
        // Invert: "0 reachable from all" becomes "0 reaches all" in rev.
        List<int[]>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        int maxw = 0;
        for (int[] e : edges) {
            adj[e[1]].add(new int[] { e[0], e[2] });
            if (e[2] > maxw) maxw = e[2];
        }

        int[] stack = new int[n];
        boolean[] seen = new boolean[n];
        int reachable = check(adj, n, maxw, seen, stack);
        if (reachable != n) return -1;
        int lo = 0,
            hi = maxw;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (check(adj, n, mid, seen, stack) == n) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }

    private int check(List<int[]>[] adj, int n, int limit, boolean[] seen, int[] stack) {
        java.util.Arrays.fill(seen, false);
        seen[0] = true;
        int sp = 0,
            count = 1;
        stack[sp++] = 0;
        while (sp > 0) {
            int x = stack[--sp];
            for (int[] nw : adj[x]) {
                if (!seen[nw[0]] && nw[1] <= limit) {
                    seen[nw[0]] = true;
                    count++;
                    stack[sp++] = nw[0];
                }
            }
        }
        return count;
    }
}

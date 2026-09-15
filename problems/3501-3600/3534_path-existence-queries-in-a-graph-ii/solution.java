import java.util.Arrays;

class Solution {

    public int[] pathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries) {
        // In value-sorted order each node reaches a contiguous range of
        // positions, so the farthest position reachable in k hops composes
        // monotonically and binary lifting on the one-hop reach returns hop
        // counts in O(log n) per query.
        Integer[] orderBoxed = new Integer[n];
        for (int i = 0; i < n; i++) orderBoxed[i] = i;
        Arrays.sort(orderBoxed, (a, b) -> nums[a] - nums[b]);
        int[] order = new int[n];
        for (int pos = 0; pos < n; pos++) order[pos] = orderBoxed[pos];
        int[] rank = new int[n],
            comp = new int[n],
            reach = new int[n];
        for (int pos = 0; pos < n; pos++) rank[order[pos]] = pos;
        for (int pos = 1; pos < n; pos++) comp[pos] =
            comp[pos - 1] + (nums[order[pos]] - nums[order[pos - 1]] > maxDiff ? 1 : 0);
        for (int i = 0, j = 0; i < n; i++) {
            if (j < i) j = i;
            while (j + 1 < n && nums[order[j + 1]] - nums[order[i]] <= maxDiff) j++;
            reach[i] = j;
        }

        // up[k][i] = farthest position reachable from i in at most 2^k hops.
        int logn = 1;
        while (1 << logn < n) logn++;
        logn++;
        int[][] up = new int[logn][];
        up[0] = reach;
        for (int k = 1; k < logn; k++) {
            up[k] = new int[n];
            for (int i = 0; i < n; i++) up[k][i] = up[k - 1][up[k - 1][i]];
        }

        int[] answer = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            int su = rank[queries[i][0]],
                sv = rank[queries[i][1]];
            if (comp[su] != comp[sv]) answer[i] = -1;
            else if (su == sv) answer[i] = 0;
            else {
                if (su > sv) {
                    int t = su;
                    su = sv;
                    sv = t;
                }
                int hops = 0;
                for (int k = logn - 1; k >= 0; k--) {
                    if (up[k][su] < sv) {
                        su = up[k][su];
                        hops += 1 << k;
                    }
                }
                answer[i] = hops + 1;
            }
        }
        return answer;
    }
}

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] countPairs(int n, int[][] edges, int[] queries) {
        // Degrees count every parallel edge separately, so for a pair (a, b)
        // the degree sum counts an edge shared by both endpoints twice:
        // incident(a, b) = deg[a] + deg[b] - mult(a, b).
        int[] deg = new int[n + 1];
        HashMap<Long, Integer> mult = new HashMap<>();
        for (int[] e : edges) {
            int u = e[0],
                v = e[1];
            deg[u]++;
            deg[v]++;
            long key = u < v ? (long) u * (n + 1) + v : (long) v * (n + 1) + u;
            mult.merge(key, 1, Integer::sum);
        }
        int[] d = new int[n];
        for (int i = 1; i <= n; ++i) d[i - 1] = deg[i];
        Arrays.sort(d);
        // For each pair joined by at least one edge, s is the degree sum and
        // t the true incident count. A query k overcounts exactly the pairs
        // with t <= k < s, so the fix adds #{s <= k} - #{t <= k}.
        int p = mult.size();
        int[] sVals = new int[p];
        int[] tVals = new int[p];
        int idx = 0;
        for (Map.Entry<Long, Integer> en : mult.entrySet()) {
            long key = en.getKey();
            int a = (int) (key / (n + 1)),
                b = (int) (key % (n + 1));
            int s = deg[a] + deg[b];
            sVals[idx] = s;
            tVals[idx++] = s - en.getValue();
        }
        Arrays.sort(sVals);
        Arrays.sort(tVals);
        int[] answer = new int[queries.length];
        for (int j = 0; j < queries.length; ++j) {
            int k = queries[j];
            // Two pointers over the sorted degrees count every unordered
            // pair whose degree sum is strictly above k.
            int lo = 0,
                hi = n - 1,
                total = 0;
            while (lo < hi) {
                if (d[lo] + d[hi] > k) {
                    total += hi - lo;
                    hi--;
                } else {
                    lo++;
                }
            }
            total += upperBound(sVals, k) - upperBound(tVals, k);
            answer[j] = total;
        }
        return answer;
    }

    // Index of the first element strictly greater than key.
    private static int upperBound(int[] a, int key) {
        int lo = 0,
            hi = a.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (a[mid] <= key) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}

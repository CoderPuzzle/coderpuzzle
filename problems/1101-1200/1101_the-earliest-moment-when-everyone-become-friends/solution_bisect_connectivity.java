import java.util.Arrays;
import java.util.Comparator;

class Solution {

    public int earliestAcq(int[][] logs, int n) {
        // Replay order first: the bisection asks prefix questions of the
        // chronologically sorted logs.
        int[][] sorted = logs.clone();
        Arrays.sort(sorted, Comparator.comparingInt(a -> a[0]));
        // Links never disappear, so once connected always connected: the
        // predicate is monotone in k and the smallest true k can be bisected.
        int m = sorted.length;
        if (!connected(sorted, n, m)) {
            return -1;
        }
        int lo = 1,
            hi = m;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (connected(sorted, n, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        // The last event of the surviving prefix carries the answer's moment.
        return sorted[lo - 1][0];
    }

    // Predicate for the bisection: does the prefix of the k soonest logs
    // already hold all n elements in one group? A fresh union-find per probe.
    private boolean connected(int[][] sorted, int n, int k) {
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
        // The component counter tracks the group count so no global scan is
        // ever needed.
        int components = n;
        for (int i = 0; i < k; i++) {
            int rx = find(parent, sorted[i][1]);
            int ry = find(parent, sorted[i][2]);
            // Redundant (already-connected) logs merge nothing.
            if (rx != ry) {
                parent[rx] = ry;
                components--;
            }
        }
        return components == 1;
    }

    // Path-halving find keeps the trees shallow within one probe.
    private int find(int[] parent, int a) {
        while (parent[a] != a) {
            parent[a] = parent[parent[a]];
            a = parent[a];
        }
        return a;
    }
}

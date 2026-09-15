import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean canTraverseAllPairs(int[] nums) {
        int n = nums.length;
        if (n == 1) return true;
        // 1 has no prime factors, so it can never share an edge.
        for (int x : nums) {
            if (x == 1) return false;
        }

        // Sieve smallest prime factors once so any value decomposes into its
        // distinct primes by repeated SPF division.
        int maxv = 0;
        for (int x : nums) maxv = Math.max(maxv, x);
        int[] spf = new int[maxv + 1];
        for (int i = 0; i <= maxv; i++) spf[i] = i;
        for (int i = 2; (long) i * i <= maxv; i++) {
            if (spf[i] == i) {
                for (int j = i * i; j <= maxv; j += i) {
                    if (spf[j] == j) spf[j] = i;
                }
            }
        }

        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        // Each prime is a hub chaining its indices: union against the
        // previous claimer, then take ownership — consecutive links keep a
        // prime's indices mutually connected with linearly many unions
        // instead of quadratic.
        Map<Integer, Integer> last = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int v = nums[i];
            while (v > 1) {
                int p = spf[v];
                Integer j = last.get(p);
                if (j != null) union(parent, i, j);
                last.put(p, i);
                while (v % p == 0) v /= p;
            }
        }

        // All indices mutually reachable iff one component holds them all.
        int root = find(parent, 0);
        for (int i = 1; i < n; i++) {
            if (find(parent, i) != root) return false;
        }
        return true;
    }

    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int[] parent, int a, int b) {
        int ra = find(parent, a),
            rb = find(parent, b);
        if (ra != rb) parent[ra] = rb;
    }
}

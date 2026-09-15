class Solution {

    private int[] parent;
    private int[] size;

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int a, int b) {
        int ra = find(a),
            rb = find(b);
        if (ra == rb) return;
        if (size[ra] < size[rb]) {
            int t = ra;
            ra = rb;
            rb = t;
        }
        parent[rb] = ra;
        size[ra] += size[rb];
    }

    public int largestComponentSize(int[] nums) {
        // Two values land in one component exactly when a chain of shared
        // prime factors links them: sharing a factor greater than 1 means
        // sharing a prime, and every path in the graph alternates values
        // with the primes they share. A smallest-prime-factor sieve up to
        // the largest value factorizes each number in a handful of
        // divisions, a union-find keyed by factor unions every value with
        // each of its primes, and the largest class counted over the
        // values is the answer — the value 1, having no prime factor,
        // stays a singleton.
        int m = 0;
        for (int v : nums) m = Math.max(m, v);

        int[] spf = new int[m + 1];
        for (int i = 0; i <= m; i++) spf[i] = i;
        for (int i = 2; i * i <= m; i++) {
            if (spf[i] == i) {
                for (int j = i * i; j <= m; j += i) {
                    if (spf[j] == j) spf[j] = i;
                }
            }
        }

        parent = new int[m + 1];
        for (int i = 0; i <= m; i++) parent[i] = i;
        size = new int[m + 1];
        java.util.Arrays.fill(size, 1);

        for (int v : nums) {
            int x = v;
            while (x > 1) {
                int p = spf[x];
                union(v, p);
                while (x % p == 0) x /= p;
            }
        }

        java.util.HashMap<Integer, Integer> counts = new java.util.HashMap<>();
        int best = 0;
        for (int v : nums) {
            int c = counts.merge(find(v), 1, Integer::sum);
            if (c > best) best = c;
        }
        return best;
    }
}

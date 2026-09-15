import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public long countPaths(int n, int[][] edges) {
        // sieve of primes up to n
        boolean[] prime = new boolean[n + 1];
        Arrays.fill(prime, true);
        prime[0] = false;
        if (n >= 1) prime[1] = false;
        for (int p = 2; (long) p * p <= n; p++) {
            if (prime[p]) {
                for (int m = p * p; m <= n; m += p) prime[m] = false;
            }
        }

        List<Integer>[] graph = new ArrayList[n + 1];
        for (int i = 0; i <= n; i++) graph[i] = new ArrayList<>();
        for (int[] e : edges) {
            graph[e[0]].add(e[1]);
            graph[e[1]].add(e[0]);
        }

        int[] parent = new int[n + 1];
        int[] order = new int[n];
        int m = 0;
        order[m++] = 1;
        for (int i = 0; i < m; i++) {
            int x = order[i];
            for (int y : graph[x]) {
                if (y != parent[x]) {
                    parent[y] = x;
                    order[m++] = y;
                }
            }
        }

        // dp0[x] / dp1[x] = number of nodes y in subtree(x) whose path x..y
        // contains 0 / exactly 1 prime node.
        long[] dp0 = new long[n + 1];
        long[] dp1 = new long[n + 1];
        long ans = 0;
        for (int i = n - 1; i >= 0; i--) {
            int x = order[i];
            if (prime[x]) {
                dp0[x] = 0;
                dp1[x] = 1;
            } else {
                dp0[x] = 1;
                dp1[x] = 0;
            }
            long total0 = prime[x] ? 0 : 1;
            long total1 = prime[x] ? 1 : 0;
            for (int y : graph[x]) {
                if (parent[y] != x) continue;
                long c0, c1;
                if (prime[x]) {
                    c0 = 0;
                    c1 = dp0[y];
                } else {
                    c0 = dp0[y];
                    c1 = dp1[y];
                }
                if (prime[x]) {
                    // need f(a) + f(b) == 2 (both endpoints one prime)
                    ans += total1 * c1;
                } else {
                    ans += total0 * c1 + total1 * c0;
                }
                total0 += c0;
                total1 += c1;
                if (prime[x]) {
                    dp1[x] += dp0[y];
                } else {
                    dp0[x] += dp0[y];
                    dp1[x] += dp1[y];
                }
            }
        }
        return ans;
    }
}

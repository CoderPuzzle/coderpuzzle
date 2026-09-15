class Solution {
  public:
    long long countPaths(int n, vector<vector<int>> &edges) {
        // sieve of primes up to n
        vector<char> prime(n + 1, 1);
        prime[0] = 0;
        if (n >= 1)
            prime[1] = 0;
        for (int p = 2; (long long)p * p <= n; p++) {
            if (prime[p]) {
                for (int m = p * p; m <= n; m += p)
                    prime[m] = 0;
            }
        }

        vector<vector<int>> graph(n + 1);
        for (auto &e : edges) {
            graph[e[0]].push_back(e[1]);
            graph[e[1]].push_back(e[0]);
        }

        vector<int> parent(n + 1, 0), order;
        order.reserve(n);
        order.push_back(1);
        for (size_t i = 0; i < order.size(); i++) {
            int x = order[i];
            for (int y : graph[x]) {
                if (y != parent[x]) {
                    parent[y] = x;
                    order.push_back(y);
                }
            }
        }

        // dp0[x] / dp1[x] = number of nodes y in subtree(x) whose path x..y
        // contains 0 / exactly 1 prime node.
        vector<long long> dp0(n + 1, 0), dp1(n + 1, 0);
        long long ans = 0;
        for (int i = (int)order.size() - 1; i >= 0; i--) {
            int x = order[i];
            if (prime[x]) {
                dp0[x] = 0;
                dp1[x] = 1;
            } else {
                dp0[x] = 1;
                dp1[x] = 0;
            }
            long long total0 = prime[x] ? 0 : 1;
            long long total1 = prime[x] ? 1 : 0;
            for (int y : graph[x]) {
                if (parent[y] != x)
                    continue;
                long long c0, c1;
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
};

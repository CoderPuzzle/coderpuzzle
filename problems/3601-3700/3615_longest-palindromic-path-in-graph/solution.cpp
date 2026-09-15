class Solution {
  public:
    int maxLen(int n, vector<vector<int>> &edges, string label) {
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        vector<int> codes(n);
        for (int i = 0; i < n; i++)
            codes[i] = (unsigned char)label[i];
        size_t memoSize = ((size_t)1 << n) * (size_t)n * (size_t)n;
        vector<signed char> memo(memoSize, -1);

        // dp(mask, left, right): best length reachable when mask is the visited
        // set and left/right are the path endpoints. Invariant: the visited
        // nodes spell a palindrome read from left to right.
        function<int(int, int, int)> dp = [&](int mask, int left, int right) -> int {
            size_t idx = ((size_t)mask * n + left) * n + right;
            if (memo[idx] != -1)
                return (int)memo[idx];
            // The standing path already spells a palindrome, so its length is
            // the floor every extension must beat.
            int best = __builtin_popcount((unsigned)mask);
            // Grow outward by one matched pair: u glues onto the left end, v
            // onto the right end; they must be distinct, unvisited, and equally
            // labeled so the path stays palindromic.
            for (int u : adj[left]) {
                if ((mask >> u) & 1)
                    continue;
                for (int v : adj[right]) {
                    if (u == v || ((mask >> v) & 1))
                        continue;
                    if (codes[u] != codes[v])
                        continue;
                    int cand = dp(mask | (1 << u) | (1 << v), u, v);
                    if (cand > best)
                        best = cand;
                }
            }
            memo[idx] = (signed char)best;
            return best;
        };

        // Every palindrome has a center: seed odd paths from each single node
        // and even paths from each equal-label adjacent pair.
        int answer = 1;
        for (int i = 0; i < n; i++) {
            int length = dp(1 << i, i, i);
            if (length > answer)
                answer = length;
        }
        for (auto &e : edges) {
            int u = e[0], v = e[1];
            if (codes[u] == codes[v]) {
                int length = dp((1 << u) | (1 << v), u, v);
                if (length > answer)
                    answer = length;
            }
        }
        return answer;
    }
};

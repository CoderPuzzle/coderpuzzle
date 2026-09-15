class Solution {
    static constexpr long long MOD = 1000000007LL;
    static constexpr long long NEG = -(long long)1e18;

    // res[c] = max over x subset of c of a[x] + b[c^x]
    static void subsetConvolve(const vector<long long> &a, const vector<long long> &b, vector<long long> &res) {
        for (int c = 0; c < 1024; c++) {
            long long best = NEG;
            int x = c;
            while (true) {
                int y = c ^ x;
                long long v = a[x] + b[y];
                if (v > best)
                    best = v;
                if (x == 0)
                    break;
                x = (x - 1) & c;
            }
            res[c] = best;
        }
    }

  public:
    int goodSubtreeSum(vector<int> &vals, vector<int> &par) {
        int n = vals.size();
        vector<vector<int>> children(n);
        for (int i = 1; i < n; i++) {
            children[par[i]].push_back(i);
        }

        vector<int> umask(n);
        vector<char> selectable(n);
        for (int i = 0; i < n; i++) {
            int mask = 0;
            bool seen[10] = {false};
            bool distinct = true;
            for (char ch : to_string(vals[i])) {
                int d = ch - '0';
                if (seen[d])
                    distinct = false;
                seen[d] = true;
                mask |= 1 << d;
            }
            umask[i] = mask;
            selectable[i] = distinct;
        }

        // post-order
        vector<int> order;
        order.reserve(n);
        vector<int> stack;
        stack.push_back(0);
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            order.push_back(u);
            for (int v : children[u])
                stack.push_back(v);
        }

        vector<vector<long long>> dp(n);
        vector<long long> comb(1024), tmp(1024);
        long long total = 0;
        for (int idx = n - 1; idx >= 0; idx--) {
            int u = order[idx];
            fill(comb.begin(), comb.end(), NEG);
            comb[0] = 0;
            for (int c : children[u]) {
                subsetConvolve(comb, dp[c], tmp);
                swap(comb, tmp);
            }

            vector<long long> du(comb);
            if (selectable[u]) {
                int mu = umask[u];
                for (int mask = 0; mask < 1024; mask++) {
                    if ((mask & mu) == mu) {
                        int rest = mask ^ mu;
                        if (comb[rest] != NEG) {
                            long long val = comb[rest] + vals[u];
                            if (val > du[mask])
                                du[mask] = val;
                        }
                    }
                }
            }
            dp[u] = move(du);
            long long best = dp[u][0];
            for (int m = 1; m < 1024; m++) {
                if (dp[u][m] > best)
                    best = dp[u][m];
            }
            total += best;
        }
        return (int)(total % MOD);
    }
};

class Solution {
  public:
    int waysToBuildRooms(vector<int> &prevRoom) {
        const long long MOD = 1000000007LL;
        int n = (int)prevRoom.size();
        vector<vector<int>> children(n);
        for (int i = 1; i < n; i++)
            children[prevRoom[i]].push_back(i);

        vector<long long> fact(n + 1), invfact(n + 1);
        fact[0] = 1;
        for (int i = 1; i <= n; i++)
            fact[i] = fact[i - 1] * i % MOD;
        // Division becomes multiplication: one Fermat exponentiation inverts
        // fact[n], then invfact[i-1] = invfact[i]*i fills the table backwards —
        // avoiding one modpow per node.
        invfact[n] = modpow(fact[n], MOD - 2, MOD);
        for (int i = n; i >= 1; i--)
            invfact[i - 1] = invfact[i] * i % MOD;

        // Recursion is off the table (n up to 1e5): stack-driven preorder puts
        // parents before descendants, so the reverse walk is a post-order.
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

        vector<int> size(n, 1);
        vector<long long> ways(n, 1);
        // Bottom-up: ways[u] = (size(u)-1)! * prod(ways[v] / size[v]!) — build u
        // first, then multinomial-interleave the children's already-valid orders.
        for (int oi = (int)order.size() - 1; oi >= 0; oi--) {
            int u = order[oi];
            int total = 0;
            long long w = 1;
            for (int v : children[u]) {
                total += size[v];
                w = w * invfact[size[v]] % MOD;
                w = w * ways[v] % MOD;
            }
            size[u] = total + 1;
            ways[u] = fact[total] * w % MOD;
        }
        return (int)ways[0];
    }

  private:
    static long long modpow(long long base, long long exp, long long mod) {
        long long result = 1;
        base %= mod;
        while (exp > 0) {
            if (exp & 1)
                result = result * base % mod;
            base = base * base % mod;
            exp >>= 1;
        }
        return result;
    }
};

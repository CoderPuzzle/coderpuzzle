class Solution {
  public:
    vector<int> queryConversions(vector<vector<int>> &conversions, vector<vector<int>> &queries) {
        const long long mod = 1'000'000'007LL;
        int n = static_cast<int>(conversions.size()) + 1;
        // The edges form a tree rooted at unit 0. from_root[u] is the number
        // of units of type u equivalent to one unit of type 0: the residue
        // of the product of factors along the path from the root. Residues
        // stay below 2^30, but products reach 2^60, so widen to long long.
        vector<vector<pair<int, int>>> children(n);
        for (const auto &edge : conversions) {
            children[edge[0]].push_back({edge[1], edge[2]});
        }
        vector<long long> from_root(n, 1);
        vector<int> stack;
        stack.reserve(n);
        stack.push_back(0);
        while (!stack.empty()) {
            int unit = stack.back();
            stack.pop_back();
            for (const auto &[child, factor] : children[unit]) {
                from_root[child] = from_root[unit] * factor % mod;
                stack.push_back(child);
            }
        }
        // 1 unit of type a equals from_root[b] / from_root[a] units of type
        // b. Every factor is < mod, so no residue is 0 and the Fermat
        // inverse always exists.
        vector<int> answer;
        answer.reserve(queries.size());
        for (const auto &query : queries) {
            int a = query[0];
            int b = query[1];
            answer.push_back(static_cast<int>(from_root[b] * power(from_root[a], mod - 2, mod) % mod));
        }
        return answer;
    }

  private:
    long long power(long long value, long long exponent, long long mod) {
        long long result = 1;
        while (exponent > 0) {
            if (exponent & 1)
                result = result * value % mod;
            value = value * value % mod;
            exponent >>= 1;
        }
        return result;
    }
};

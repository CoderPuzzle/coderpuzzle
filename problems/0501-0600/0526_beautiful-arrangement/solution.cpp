class Solution {
  public:
    int countArrangement(int n) {
        // candidates[p]: the values position p admits — the divisors of p
        // and the multiples of p up to n, the only values that can satisfy
        // either divisibility condition at that position.
        vector<vector<int>> candidates(n + 1);
        for (int p = 1; p <= n; ++p) {
            for (int v = 1; v <= n; ++v) {
                if (v % p == 0 || p % v == 0)
                    candidates[p].push_back(v);
            }
        }
        vector<bool> used(n + 1, false);
        return fill(1, n, candidates, used);
    }

  private:
    // Every position holds a value: one complete beautiful arrangement.
    int fill(int pos, int n, vector<vector<int>> &candidates, vector<bool> &used) {
        if (pos > n)
            return 1;
        int total = 0;
        for (int v : candidates[pos]) {
            if (!used[v]) {
                used[v] = true;
                total += fill(pos + 1, n, candidates, used);
                used[v] = false;
            }
        }
        return total;
    }
};

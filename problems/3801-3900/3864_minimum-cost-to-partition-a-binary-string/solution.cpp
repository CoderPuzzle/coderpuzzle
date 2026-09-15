class Solution {
  public:
    long long minCost(string s, int encCost, int flatCost) {
        // A segment's cost depends only on its length L and its count X of
        // ones: flatCost when X == 0, otherwise L * X * encCost. Because an
        // even segment may be split into two equal halves, the best value of
        // a segment is the cheaper of stopping here or paying for both
        // halves. The halves are disjoint intervals, so a plain recursion
        // visits each reachable segment exactly once and is O(n).
        int n = s.size();
        prefix.assign(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + (s[i] == '1' ? 1 : 0);
        }
        return solve(encCost, flatCost, 0, n);
    }

  private:
    vector<int> prefix;

    long long solve(int encCost, int flatCost, int l, int length) {
        int x = prefix[l + length] - prefix[l];
        long long best = x == 0 ? flatCost : 1LL * length * x * encCost;
        if (length % 2 == 0) {
            int half = length / 2;
            long long split = solve(encCost, flatCost, l, half) + solve(encCost, flatCost, l + half, half);
            if (split < best) {
                best = split;
            }
        }
        return best;
    }
};

class Solution {
  public:
    int integerBreak(int n) {
        // best[i]: the maximum product over all sums of two or more positive
        // integers totalling i. Build each i by choosing a first part j; the
        // remainder either stands whole as one part (the identity i - j, a
        // two-part sum) or breaks further (best[i - j], already two or more).
        vector<int> best(n + 1, 0);
        best[1] = 1;
        for (int i = 2; i <= n; ++i) {
            for (int j = 1; j < i; ++j) {
                // The inner max is the k >= 2 rule: i itself is never a legal
                // one-part product, only genuine splits enter the table.
                best[i] = max(best[i], j * max(best[i - j], i - j));
            }
        }
        return best[n];
    }
};

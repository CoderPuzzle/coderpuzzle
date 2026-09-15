class Solution {
  public:
    long long maxScore(vector<int> &a, vector<int> &b) {
        // dp[t][j] = best score using the first j elements of b with exactly
        // t picks made; dp[t][j] = max(dp[t][j-1], dp[t-1][j-1] + a[t-1] *
        // b[j]). Each row reads only the previous row, so four rolling
        // variables carry everything; update counts from high to low so each
        // element is consumed at most once. Scores reach +-4e10, past the
        // 32-bit range.
        const long long ninf = -(1LL << 62);
        long long d1 = ninf, d2 = ninf, d3 = ninf, d4 = ninf;
        for (int x : b) {
            if (d3 != ninf)
                d4 = max(d4, d3 + (long long)a[3] * x);
            if (d2 != ninf)
                d3 = max(d3, d2 + (long long)a[2] * x);
            if (d1 != ninf)
                d2 = max(d2, d1 + (long long)a[1] * x);
            d1 = max(d1, (long long)a[0] * x);
        }
        return d4;
    }
};

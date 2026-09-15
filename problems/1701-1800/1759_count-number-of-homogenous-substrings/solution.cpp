class Solution {
  public:
    int countHomogenous(string s) {
        // Each position is charged with the number of homogenous
        // substrings ending there — the current run length — so the
        // running total realizes the per-run triangle sums directly.
        const int MOD = 1'000'000'007;
        long long total = 0;
        int run = 0;
        char prev = 0;
        for (char c : s) {
            run = (c == prev) ? run + 1 : 1;
            prev = c;
            total = (total + run) % MOD;
        }
        return (int)total;
    }
};

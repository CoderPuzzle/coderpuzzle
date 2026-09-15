class Solution {
  public:
    int countDistinctStrings(string s, int k) {
        // Only the number of size-k windows matters: e = n - k + 1. Flipping
        // a window is an independent yes/no choice and each combination gives
        // a distinct string (hint 2), so the answer is 2^e mod 1e9+7.
        const long long MOD = 1000000007LL;
        long long base = 2;
        long long res = 1;
        for (int e = (int)s.size() - k + 1; e > 0; e >>= 1) {
            if (e & 1) {
                res = res * base % MOD;
            }
            base = base * base % MOD;
        }
        return (int)res;
    }
};

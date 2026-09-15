class Solution {
  public:
    int numWays(string s) {
        // A split into three equal-ones parts only exists when the total
        // number of '1's is a multiple of 3. With `total == 0` every
        // character is '0', so any pair of the n - 1 gaps between
        // characters is a valid pair of cut points: C(n - 1, 2) ways
        // (accumulated as int64_t since n can reach 1e5). Otherwise,
        // record the positions of every '1'; the first cut may land
        // anywhere between the k-th and (k + 1)-th one (a run of
        // trailing zeros widens that window), and likewise the second
        // cut between the 2k-th and (2k + 1)-th one. The two windows
        // never overlap, so the answer is the product of their widths.
        const int64_t MOD = 1'000'000'007;
        int n = static_cast<int>(s.size());
        vector<int> onesIdx;
        onesIdx.reserve(n);
        for (int i = 0; i < n; i++) {
            if (s[i] == '1') {
                onesIdx.push_back(i);
            }
        }
        int total = static_cast<int>(onesIdx.size());
        if (total % 3 != 0) {
            return 0;
        }
        if (total == 0) {
            int64_t ways = static_cast<int64_t>(n - 1) * (n - 2) / 2;
            return static_cast<int>(ways % MOD);
        }
        int k = total / 3;
        int64_t left = onesIdx[k] - onesIdx[k - 1];
        int64_t right = onesIdx[2 * k] - onesIdx[2 * k - 1];
        return static_cast<int>((left * right) % MOD);
    }
};

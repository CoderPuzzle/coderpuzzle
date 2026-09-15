class Solution {
  public:
    vector<bool> subsequenceSumAfterCapping(vector<int> &nums, int k) {
        int n = nums.size();
        int words = (k + 64) / 64;
        vector<unsigned long long> reach(words, 0), shifted(words, 0);
        reach[0] = 1ULL;
        vector<int> counts(n + 1, 0);
        for (int value : nums) {
            counts[value]++;
        }
        vector<bool> answer(n, false);
        int leq = 0;
        auto foldIn = [&](int x) {
            int wordShift = x >> 6;
            int bitShift = x & 63;
            for (int i = 0; i < words; i++) {
                int src = i - wordShift;
                unsigned long long value = 0ULL;
                if (src >= 0) {
                    value = reach[src] << bitShift;
                    if (bitShift != 0 && src >= 1) {
                        value |= reach[src - 1] >> (64 - bitShift);
                    }
                }
                shifted[i] = value;
            }
            for (int i = 0; i < words; i++) {
                reach[i] |= shifted[i];
            }
        };
        for (int x = 1; x <= n; x++) {
            for (int c = 0; c < counts[x]; c++) {
                foldIn(x);
            }
            leq += counts[x];
            int above = n - leq;
            bool found = false;
            for (long long m = 0, r = k; m <= above && r >= 0; m++, r -= x) {
                if ((reach[r >> 6] >> (r & 63)) & 1ULL) {
                    found = true;
                    break;
                }
            }
            answer[x - 1] = found;
        }
        return answer;
    }
};

class Solution {
  public:
    int longestSubsequence(string s, int k) {
        long long value = 0;
        int length = 0;
        for (int index = static_cast<int>(s.size()) - 1; index >= 0; --index) {
            if (s[index] == '0') {
                ++length;
                // k <= 1e9 < 2^30, so a cost of 2^length can never fit once
                // length reaches 30; skipping the shift keeps it defined.
            } else if (length < 30 && value + (1LL << length) <= k) {
                value += 1LL << length;
                ++length;
            }
        }
        return length;
    }
};

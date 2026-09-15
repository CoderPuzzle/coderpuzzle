class Solution {
  public:
    int findMinimumOperations(string s1, string s2, string s3) {
        // Deletions only ever shorten a string from the right, so the
        // final shared string is a prefix of each input — and it must be
        // non-empty. Every string is trimmed to the longest common
        // prefix, and each deletion is forced, so the operation count is
        // the sum of the three overshoot lengths.
        int limit = min({s1.size(), s2.size(), s3.size()});
        int common = 0;
        while (common < limit && s1[common] == s2[common] && s2[common] == s3[common]) {
            common += 1;
        }
        if (common == 0) {
            return -1;
        }
        return static_cast<int>(s1.size() + s2.size() + s3.size()) - 3 * common;
    }
};

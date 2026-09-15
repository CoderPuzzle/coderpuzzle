class Solution {
  public:
    vector<string> getWordsInLongestSubsequence(vector<string> &words, vector<int> &groups) {
        // dp[i] is the length of the longest valid subsequence ending at
        // index i; prev[i] remembers the predecessor that achieved it.
        // Scanning predecessors from i - 1 downward and updating only on a
        // strict improvement keeps the latest compatible index attaining the
        // maximum, which pins one deterministic answer out of the many the
        // statement permits.
        int n = (int)words.size();
        vector<int> dp(n, 1), prev(n, -1);
        for (int i = 0; i < n; ++i) {
            for (int j = i - 1; j >= 0; --j) {
                if (groups[j] == groups[i] || words[j].size() != words[i].size()) {
                    continue;
                }
                if (dp[j] + 1 <= dp[i]) {
                    continue;
                }
                // Hamming distance exactly 1: walk the equal-length strings
                // and stop at a second mismatch.
                int diffs = 0;
                for (size_t p = 0; p < words[j].size() && diffs < 2; ++p) {
                    if (words[j][p] != words[i][p])
                        ++diffs;
                }
                if (diffs == 1) {
                    dp[i] = dp[j] + 1;
                    prev[i] = j;
                }
            }
        }
        int best = n - 1;
        for (int i = n - 2; i >= 0; --i) {
            if (dp[i] > dp[best])
                best = i;
        }
        vector<string> answer;
        for (int i = best; i != -1; i = prev[i])
            answer.push_back(words[i]);
        reverse(answer.begin(), answer.end());
        return answer;
    }
};

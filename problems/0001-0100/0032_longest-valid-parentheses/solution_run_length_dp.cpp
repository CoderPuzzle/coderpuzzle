class Solution {
  public:
    int longestValidParentheses(string s) {
        // dp[k] is the length of the balanced run ending at index k - 1;
        // entry 0 grounds the table just off the front of the string, so even
        // the first character has a "run before it" of length zero to read.
        vector<int> dp(s.size() + 1, 0);
        int best = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            // An opener closes nothing, so no run ends on it and dp[i + 1]
            // keeps its zero.
            if (s[i] == '(') {
                continue;
            }
            // The run ending at the previous index has length dp[i], so index
            // i - 1 - dp[i] sits immediately to its left. A '(' there is
            // exactly this closer's partner: a '(' and a ')' with only
            // balanced material between them is what being matched means.
            int j = i - 1 - dp[i];
            if (j >= 0 && s[j] == '(') {
                // Jump the matched pair: both brackets, everything they
                // enclose, plus the run ending just before the opener chains
                // on, so "()()" records 4 at its second closer rather than
                // restarting at 2.
                dp[i + 1] = i - j + 1 + dp[j];
                best = max(best, dp[i + 1]);
            }
        }
        return best;
    }
};

class Solution {
  public:
    int longestValidSubstring(string word, vector<string> &forbidden) {
        unordered_set<string> banned(forbidden.begin(), forbidden.end());
        int maxLen = 0;
        for (const string &s : banned) {
            maxLen = max(maxLen, (int)s.size());
        }
        int n = word.size();
        int left = 0;
        int ans = 0;
        // Validity is hereditary (shrinking a valid window stays valid), so a
        // two-pointer sweep finds the longest valid substring.
        for (int right = 0; right < n; right++) {
            // Only suffixes ending at right can be forbidden, each at most
            // maxLen (<= 10) long; nothing before left - 1 can matter since
            // earlier occurrences were already excluded.
            int start = max(right - maxLen, left - 1);
            // Test suffixes shortest-first: the shortest match has the
            // latest start, so jumping left past it yields the largest
            // window that excludes every forbidden occurrence.
            for (int j = right; j > start; j--) {
                if (banned.count(word.substr(j, right + 1 - j))) {
                    left = j + 1;
                    break;
                }
            }
            ans = max(ans, right - left + 1);
        }
        return ans;
    }
};

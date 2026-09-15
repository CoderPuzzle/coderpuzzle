class Solution {
  public:
    bool wordBreak(string s, vector<string> &wordDict) {
        unordered_set<string> words(wordDict.begin(), wordDict.end());
        int n = (int)s.size();
        // reachable[i]: the prefix s[0..i) can be segmented; the empty prefix
        // is trivially segmentable.
        vector<bool> reachable(n + 1, false);
        reachable[0] = true;
        for (int i = 1; i <= n; i++) {
            // Any segmentation of s[0..i) ends with a last word s[j..i).
            for (int j = 0; j < i; j++) {
                if (reachable[j] && words.find(s.substr(j, i - j)) != words.end()) {
                    reachable[i] = true;
                    // Only feasibility matters, so stop at the first split.
                    break;
                }
            }
        }
        return reachable[n];
    }
};

class Solution {
  public:
    vector<string> getLongestSubsequence(vector<string> &words, vector<int> &groups) {
        // Taking the first element of every maximal run of equal group values
        // pins one deterministic answer out of the many the statement permits.
        vector<string> result;
        result.push_back(words[0]);
        for (int i = 1; i < (int)groups.size(); ++i) {
            if (groups[i] != groups[i - 1])
                result.push_back(words[i]);
        }
        return result;
    }
};

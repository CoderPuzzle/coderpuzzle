class Solution {
  public:
    bool wordBreak(string s, vector<string> &wordDict) {
        // Bottom-up DP over prefix reachability: reachable[i] says the first i
        // characters of s split into dictionary words. The empty prefix is
        // reachable, and the answer is reachable[s.size()].
        unordered_set<string> words(wordDict.begin(), wordDict.end());
        vector<size_t> lengths;
        for (const string &word : words)
            lengths.push_back(word.size());
        sort(lengths.begin(), lengths.end());
        lengths.erase(unique(lengths.begin(), lengths.end()), lengths.end());
        vector<bool> reachable(s.size() + 1, false);
        reachable[0] = true;
        for (size_t i = 1; i <= s.size(); ++i) {
            for (size_t length : lengths) {
                if (length > i)
                    break;
                // Position i ends a word exactly when the prefix before it is
                // reachable and the slice ending here is a dictionary word.
                if (reachable[i - length] && words.count(s.substr(i - length, length))) {
                    reachable[i] = true;
                    break;
                }
            }
        }
        return reachable[s.size()];
    }
};

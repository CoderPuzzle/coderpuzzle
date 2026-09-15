class Solution {
  public:
    int longestStrChain(vector<string> &words) {
        // dedupe first (duplicates never extend each other), then process
        // shortest first: every one-deletion predecessor is already in dp
        // when its successor is reached
        unordered_set<string> unique(words.begin(), words.end());
        vector<string> sorted(unique.begin(), unique.end());
        sort(sorted.begin(), sorted.end(), [](const string &a, const string &b) { return a.size() < b.size(); });
        unordered_map<string, int> dp;
        int best = 0;
        for (const string &word : sorted) {
            // dp[word] = longest chain ending at word: 1 + the best value
            // among its one-deletion variants present in dp (1 = alone)
            int current = 1;
            for (size_t i = 0; i < word.size(); i++) {
                string predecessor = word.substr(0, i) + word.substr(i + 1);
                auto it = dp.find(predecessor);
                if (it != dp.end() && it->second + 1 > current) {
                    current = it->second + 1;
                }
            }
            dp[word] = current;
            if (current > best) {
                best = current;
            }
        }
        return best;
    }
};

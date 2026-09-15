class Solution {
  public:
    vector<string> wordBreak(string s, vector<string> &wordDict) {
        unordered_set<string> words(wordDict.begin(), wordDict.end());
        int n = s.size();
        // dp[i] holds every sentence for the prefix s.substr(0, i). Each entry
        // is built by appending one last word to a sentence of a shorter
        // prefix, so a prefix that cannot be segmented stays empty and every
        // split hanging off it is pruned before any substring is cut.
        vector<vector<string>> dp(n + 1);
        // The empty prefix segments into exactly one sentence: the empty one.
        dp[0].push_back("");
        for (int i = 1; i <= n; ++i) {
            // The split j runs downward, so the candidate last word
            // s.substr(j, i) is one character long first and grows: sentences
            // whose last word is shorter come first, and among equal last
            // words the sentences of dp[j] keep their own order. That is
            // exactly the order the statement pins, emitted for free — no
            // sorting pass at the end.
            for (int j = i - 1; j >= 0; --j) {
                if (dp[j].empty()) {
                    continue;
                }
                string last = s.substr(j, i - j);
                if (words.count(last) == 0) {
                    continue;
                }
                if (j == 0) {
                    dp[i].push_back(last);
                } else {
                    for (const string &head : dp[j]) {
                        dp[i].push_back(head + " " + last);
                    }
                }
            }
        }
        return dp[n];
    }
};

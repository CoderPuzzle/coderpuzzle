class Solution {
  public:
    int minimumCost(string sentence, int k) {
        vector<string> words;
        istringstream input(sentence);
        for (string word; input >> word;)
            words.push_back(word);

        int count = static_cast<int>(words.size());
        vector<long long> dp(count + 1, 0);
        for (int start = count - 1; start >= 0; --start) {
            long long best = numeric_limits<long long>::max();
            int rowLength = 0;
            for (int end = start; end < count; ++end) {
                rowLength += static_cast<int>(words[end].size()) + (end > start ? 1 : 0);
                if (rowLength > k)
                    break;
                long long candidate;
                if (end == count - 1) {
                    candidate = 0;
                } else {
                    long long unused = k - rowLength;
                    candidate = unused * unused + dp[end + 1];
                }
                best = min(best, candidate);
            }
            dp[start] = best;
        }
        return static_cast<int>(dp[0]);
    }
};

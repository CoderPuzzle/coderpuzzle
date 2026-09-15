class Solution {
  public:
    bool wordBreak(string s, vector<string> &wordDict) {
        unordered_set<string> words(wordDict.begin(), wordDict.end());
        int n = (int)s.size();
        // Only words short enough to fit can ever be a next piece.
        size_t maxLen = 0;
        for (const string &word : wordDict) {
            maxLen = max(maxLen, word.size());
        }
        // BFS over start indices: start positions reachable by segmenting a
        // prefix of s. visited keeps each index enqueued at most once.
        vector<char> visited(n + 1, 0);
        visited[0] = 1;
        vector<int> queue;
        queue.push_back(0);
        for (size_t head = 0; head < queue.size(); head++) {
            int i = queue[head];
            // Try every dictionary word as the next piece s[i..i+L).
            int limit = min((long long)maxLen, (long long)(n - i));
            for (int length = 1; length <= limit; length++) {
                if (words.count(s.substr(i, length))) {
                    int end = i + length;
                    // Reaching the far end means the whole string segments.
                    if (end == n) {
                        return true;
                    }
                    if (!visited[end]) {
                        visited[end] = 1;
                        queue.push_back(end);
                    }
                }
            }
        }
        // No reachable start ever crossed the finish line.
        return false;
    }
};

class Solution {
  public:
    int ladderLength(string beginWord, string endWord, vector<string> &wordList) {
        unordered_set<string> words(wordList.begin(), wordList.end());
        // No sequence can end outside the dictionary.
        if (!words.count(endWord))
            return 0;
        int length = (int)beginWord.size();

        // Bucket every word under each wildcard pattern ("hot" -> "*ot",
        // "h*t", "ho*"): all one-letter neighbors share one of its patterns.
        unordered_map<string, vector<string>> buckets;
        for (const string &word : wordList) {
            for (int i = 0; i < length; ++i)
                buckets[pattern(word, i)].push_back(word);
        }

        // Level-order BFS; steps starts at 1 because beginWord itself counts.
        unordered_set<string> visited{beginWord};
        vector<string> queue{beginWord};
        int steps = 1;
        while (!queue.empty()) {
            vector<string> next;
            for (const string &word : queue) {
                if (word == endWord)
                    return steps;
                for (int i = 0; i < length; ++i) {
                    auto found = buckets.find(pattern(word, i));
                    if (found == buckets.end())
                        continue;
                    // Each word is enqueued at most once.
                    for (const string &neighbor : found->second)
                        if (visited.insert(neighbor).second)
                            next.push_back(neighbor);
                    // Erase the bucket so it is read once overall and never
                    // re-read via a same-level word sharing the pattern.
                    buckets.erase(found);
                }
            }
            queue = move(next);
            ++steps;
        }
        return 0;
    }

  private:
    static string pattern(const string &word, int i) {
        string key = word;
        key[i] = '*';
        return key;
    }
};

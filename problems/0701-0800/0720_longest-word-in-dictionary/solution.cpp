class Solution {
  public:
    string longestWord(vector<string> &words) {
        // Sorted order visits every word after the word minus its last
        // character, so one sweep can grow the buildable set incrementally.
        sort(words.begin(), words.end());
        string best;
        unordered_set<string> buildable;
        for (const auto &word : words) {
            // Buildable by the statement's rule: the word minus its last
            // character is already buildable, and a lone letter carries the
            // empty prefix, so it needs nothing.
            if (word.size() == 1 || buildable.count(word.substr(0, word.size() - 1))) {
                buildable.insert(word);
                // Strictly longer only: among equal lengths the first word
                // in sorted order — the lexicographically smallest — wins.
                if (word.size() > best.size()) {
                    best = word;
                }
            }
        }
        // Nothing buildable at all: the statement's empty-string answer.
        return best;
    }
};

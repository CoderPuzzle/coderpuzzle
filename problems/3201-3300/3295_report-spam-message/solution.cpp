#include <unordered_set>

class Solution {
  public:
    bool reportSpam(vector<string> &message, vector<string> &bannedWords) {
        // A word is banned or it is not: collapse bannedWords into a hash set
        // (internal duplicates collapse harmlessly). Scan the message counting
        // every occurrence that lands in the set — the same banned word twice
        // in the message counts twice — and stop as soon as two matches have
        // been seen; on a 10^5-word message the early exit can skip the rest.
        unordered_set<string> banned(bannedWords.begin(), bannedWords.end());
        int count = 0;
        for (const string &word : message) {
            if (banned.count(word)) {
                if (++count == 2)
                    return true;
            }
        }
        return false;
    }
};

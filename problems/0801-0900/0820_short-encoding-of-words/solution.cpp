class Solution {
  public:
    int minimumLengthEncoding(vector<string> &words) {
        // A word needs no slot of its own when another word ends with
        // it: start from every word, then discard strict suffixes.
        unordered_set<string> keep(words.begin(), words.end());
        for (const string &w : words) {
            // Only proper suffixes (k >= 1) are removed, so w itself —
            // and duplicates of it — survive to share a single slot.
            for (int k = 1; k < (int)w.size(); k++) {
                keep.erase(w.substr(k));
            }
        }
        // Survivors are exactly the words no other word ends with; each
        // pays len + 1 for its terminating '#'.
        int total = 0;
        for (const string &w : keep) {
            total += (int)w.size() + 1;
        }
        return total;
    }
};

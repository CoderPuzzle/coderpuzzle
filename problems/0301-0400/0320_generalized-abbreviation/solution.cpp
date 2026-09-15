class Solution {
  public:
    vector<string> generateAbbreviations(string word) {
        // Each position doubles the possibilities: fold the character into
        // the running count, or keep the letter and flush the count first.
        // The abbreviate branch is tried first, so the results come out in
        // the canonical order the statement pins.
        vector<string> results;
        results.reserve(1 << word.size());
        walk(word, 0, "", 0, results);
        return results;
    }

  private:
    void walk(const string &word, int pos, const string &prefix, int count, vector<string> &results) {
        if (pos == static_cast<int>(word.size())) {
            results.push_back(count > 0 ? prefix + to_string(count) : prefix);
            return;
        }
        // Abbreviate: extend the running count.
        walk(word, pos + 1, prefix, count + 1, results);
        // Keep: flush the pending count, then the letter.
        string kept = prefix;
        if (count > 0) {
            kept += to_string(count);
        }
        kept += word[pos];
        walk(word, pos + 1, kept, 0, results);
    }
};

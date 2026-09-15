class Solution {
  public:
    vector<string> findAndReplacePattern(vector<string> &words, string pattern) {
        // Reduce the pattern to its first-appearance signature once; a
        // word matches exactly when its own signature is the same
        // sequence, so no letter-to-letter maps are ever built.
        vector<int> target = signature(pattern);
        vector<string> matches;
        for (const string &w : words) {
            if (signature(w) == target) {
                matches.push_back(w);
            }
        }
        return matches;
    }

  private:
    // Index each letter by its first appearance in s: "abb" -> [0, 1, 1].
    static vector<int> signature(const string &s) {
        unordered_map<char, int> first;
        vector<int> sig;
        sig.reserve(s.size());
        for (char c : s) {
            if (first.find(c) == first.end()) {
                first[c] = (int)first.size();
            }
            sig.push_back(first[c]);
        }
        return sig;
    }
};

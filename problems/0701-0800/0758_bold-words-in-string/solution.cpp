class Solution {
  public:
    string boldWords(vector<string> &words, string s) {
        // Mark every position of s covered by any keyword occurrence.
        int n = s.size();
        vector<bool> mask(n, false);
        for (const string &word : words) {
            // Restart one past each hit so self-overlapping occurrences
            // ("aa" inside "aaa") are all found.
            size_t start = s.find(word);
            while (start != string::npos) {
                for (size_t i = start; i < start + word.size(); ++i) {
                    mask[i] = true;
                }
                start = s.find(word, start + 1);
            }
        }
        // Wrap each maximal run of marked positions in exactly one pair.
        string out;
        out.reserve(n + 16);
        for (int i = 0; i < n; ++i) {
            if (mask[i] && (i == 0 || !mask[i - 1])) {
                out += "<b>";
            } else if (!mask[i] && i > 0 && mask[i - 1]) {
                out += "</b>";
            }
            out += s[i];
        }
        if (n > 0 && mask[n - 1]) {
            out += "</b>";
        }
        return out;
    }
};

class Solution {
  public:
    string oddString(vector<string> &words) {
        // Encode each word as its difference signature (the n-1 consecutive
        // letter differences); the odd word is the one whose signature
        // appears exactly once.
        unordered_map<string, int> count;
        vector<string> sigs;
        sigs.reserve(words.size());
        for (const string &w : words) {
            string sig;
            for (size_t i = 1; i < w.size(); ++i) {
                sig += to_string(w[i] - w[i - 1]) + ",";
            }
            sigs.push_back(sig);
            ++count[sig];
        }
        for (size_t i = 0; i < words.size(); ++i) {
            if (count[sigs[i]] == 1) {
                return words[i];
            }
        }
        return "";
    }
};

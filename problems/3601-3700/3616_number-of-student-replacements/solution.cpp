class Solution {
  public:
    int totalReplacements(vector<int> &ranks) {
        // One sweep: best is the smallest rank seen so far. A strictly
        // better (lower) arrival displaces it and counts as a replacement;
        // equal or worse ranks leave the selection untouched.
        int best = ranks[0];
        int replacements = 0;
        for (size_t i = 1; i < ranks.size(); ++i) {
            if (ranks[i] < best) {
                best = ranks[i];
                ++replacements;
            }
        }
        return replacements;
    }
};

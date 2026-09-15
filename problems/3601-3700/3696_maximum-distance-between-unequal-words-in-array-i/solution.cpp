class Solution {
  public:
    int maxDistance(vector<string> &words) {
        // Starting best at 0 bakes in the sentinel: only a genuinely
        // unequal pair can raise it, so an all-equal array (or a single
        // word, which has no pairs at all) returns 0 untouched.
        int best = 0;
        int n = (int)words.size();
        // Check every index pair once; each unequal pair contributes
        // j - i + 1, counting both endpoints.
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (words[i] != words[j]) {
                    best = max(best, j - i + 1);
                }
            }
        }
        return best;
    }
};

class Solution {
  public:
    int minimumTimeToInitialState(string word, int k) {
        // After t seconds exactly t*k original characters have been removed
        // from the front; additions only ever land behind the survivors.
        // The word reverts iff nothing survives (t*k >= n) or the surviving
        // suffix word[t*k:] equals the prefix it would occupy.
        int n = word.size();
        int t = 1;
        while (t * k < n && word.substr(0, n - t * k) != word.substr(t * k)) {
            ++t;
        }
        return t;
    }
};

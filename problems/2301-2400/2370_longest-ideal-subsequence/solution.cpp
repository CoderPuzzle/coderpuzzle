class Solution {
  public:
    int longestIdealString(string s, int k) {
        // best[c] = longest ideal subsequence so far ending with letter c.
        // Each character extends the best chain among letters within +/-k;
        // the window is at most 51 wide, so each step is constant time.
        int best[26] = {0};
        for (char ch : s) {
            int c = ch - 'a';
            int lo = std::max(0, c - k);
            int hi = std::min(25, c + k);
            int candidate = 0;
            for (int d = lo; d <= hi; ++d) {
                candidate = std::max(candidate, best[d]);
            }
            if (candidate + 1 > best[c]) {
                best[c] = candidate + 1;
            }
        }
        return *std::max_element(best, best + 26);
    }
};

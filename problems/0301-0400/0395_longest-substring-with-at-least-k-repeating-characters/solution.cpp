class Solution {
  public:
    int longestSubstring(string s, int k) { return longest(s, 0, (int)s.size(), k); }

  private:
    int longest(const string &s, int lo, int hi, int k) {
        if (lo >= hi)
            return 0;
        int counts[128] = {0};
        for (int i = lo; i < hi; i++) {
            counts[(unsigned char)s[i]]++;
        }
        // A character rarer than k inside this piece can never reach k by
        // shortening the substring, so it is a hard splitter.
        bool allFrequent = true;
        for (int c = 0; c < 128; c++) {
            if (counts[c] > 0 && counts[c] < k) {
                allFrequent = false;
                break;
            }
        }
        if (allFrequent)
            return hi - lo; // no splitter: whole piece valid
        int best = 0;
        int start = lo;
        // Recurse on the pieces between consecutive rare characters; each
        // level eliminates at least one letter, so depth is bounded by 26.
        for (int i = lo; i < hi; i++) {
            if (counts[(unsigned char)s[i]] < k) {
                best = max(best, longest(s, start, i, k));
                start = i + 1;
            }
        }
        best = max(best, longest(s, start, hi, k));
        return best;
    }
};

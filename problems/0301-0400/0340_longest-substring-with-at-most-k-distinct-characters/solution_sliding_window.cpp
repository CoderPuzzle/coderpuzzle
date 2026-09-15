class Solution {
  public:
    int lengthOfLongestSubstringKDistinct(string s, int k) {
        // counts holds the multiplicities inside the window [left, right];
        // erasing a key at zero keeps counts.size() = distinct symbols.
        unordered_map<char, int> counts;
        int left = 0;
        int best = 0;
        for (int right = 0; right < (int)s.size(); ++right) {
            counts[s[right]]++;
            // Shrink until valid: every superset of an invalid window is
            // invalid too, so shrinking from the left skips no candidate.
            while ((int)counts.size() > k) {
                char c = s[left];
                if (--counts[c] == 0) {
                    counts.erase(c);
                }
                ++left;
            }
            // Now the longest valid window ending at right is in hand.
            if (right - left + 1 > best) {
                best = right - left + 1;
            }
        }
        return best;
    }
};

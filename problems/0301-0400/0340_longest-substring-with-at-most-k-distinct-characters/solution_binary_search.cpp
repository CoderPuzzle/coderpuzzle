class Solution {
  public:
    int lengthOfLongestSubstringKDistinct(string s, int k) {
        // Feasibility of a fixed length: does any window of exactly L
        // symbols carry at most k distinct ones? One sweep maintains the
        // multiplicities of the current window, sliding its left edge out
        // one step behind its right edge.
        auto feasible = [&](int length) {
            if (length == 0) {
                return true;
            }
            unordered_map<char, int> counts;
            int distinct = 0;
            for (int i = 0; i < (int)s.size(); i++) {
                if (++counts[s[i]] == 1) {
                    distinct++;
                }
                if (i >= length && --counts[s[i - length]] == 0) {
                    distinct--;
                }
                if (i >= length - 1 && distinct <= k) {
                    return true;
                }
            }
            return false;
        };
        // A substring of a valid window is valid too, so feasibility is
        // monotone in the length — binary search for the longest feasible.
        int lo = 0, hi = (int)s.size();
        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (feasible(mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }
};

class Solution {
  public:
    int longestRepeatingSubstring(string s) {
        int n = s.size();
        // Monotone feasibility: a repeat of length L implies repeats of every
        // shorter length, so binary search the largest feasible length. The
        // upper-mid convention keeps the loop terminating; hi starts at n-1
        // because the whole string cannot repeat within itself.
        int lo = 0;
        int hi = n - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (hasRepeat(s, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

  private:
    // Exact check: every length-`length` window goes into a set, so a hit
    // means two identical substrings (overlaps allowed) — no hashing caveats.
    bool hasRepeat(const string &s, int length) {
        if (length == 0) {
            return true;
        }
        unordered_set<string> seen;
        for (int i = 0; i + length <= (int)s.size(); i++) {
            string piece = s.substr(i, length);
            if (!seen.insert(piece).second) {
                return true;
            }
        }
        return false;
    }
};

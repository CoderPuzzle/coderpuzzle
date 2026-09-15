class Solution {
  public:
    int largestVariance(string s) {
        vector<bool> present(26, false);
        for (char ch : s) {
            present[ch - 'a'] = true;
        }
        int answer = 0;
        // Variance = max over ordered pairs (high, low) of count(high) -
        // count(low), with both chars present in the substring. Map high to
        // +1, low to -1, everything else to 0, and run Kadane per pair.
        for (int high = 0; high < 26; high++) {
            if (!present[high]) {
                continue;
            }
            for (int low = 0; low < 26; low++) {
                if (!present[low] || high == low) {
                    continue;
                }
                int diff = 0;          // max subarray sum ending here (may lack `low`)
                bool has_low = false;  // whether diff_with_low has been initialized
                int diff_with_low = 0; // same but guaranteed to contain at least one `low`
                for (char c : s) {
                    int ch = c - 'a';
                    if (ch == high) {
                        diff += 1;
                        if (has_low) {
                            diff_with_low += 1;
                        }
                    } else if (ch == low) {
                        diff -= 1;
                        // Extend the best-with-low through this -1, or graft
                        // the entire no-`low` prefix ending here onto it —
                        // always at least as good as restarting from scratch.
                        if (has_low) {
                            diff_with_low = max(diff_with_low - 1, diff);
                        } else {
                            // First `low`: initialize with diff (which now
                            // includes this -1) so the low is truly inside.
                            diff_with_low = diff;
                            has_low = true;
                        }
                        diff = max(0, diff);
                    }
                    // else: neither char, both values unchanged
                    // Only the guaranteed-to-contain-low value is a legal
                    // variance candidate.
                    if (has_low && diff_with_low > answer) {
                        answer = diff_with_low;
                    }
                }
            }
        }
        return answer;
    }
};

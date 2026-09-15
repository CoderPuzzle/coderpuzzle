class Solution {
  public:
    string minWindow(string s, string t) {
        if (t.empty() || t.size() > s.size())
            return "";
        int quota[128] = {0};
        int kinds = 0;
        for (char ch : t) {
            if (quota[(unsigned char)ch]++ == 0)
                kinds++;
        }
        int n = (int)s.size();
        // Slide one window of exactly `length` across s. `below` counts
        // demanded letters still short of quota, so below == 0 means this
        // window covers t; letters absent from t never touch it.
        auto covers = [&](int length) -> int {
            int have[128] = {0};
            int below = kinds;
            for (int i = 0; i < length; i++) {
                unsigned char ch = s[i];
                if (quota[ch] > 0 && ++have[ch] == quota[ch])
                    below--;
            }
            if (below == 0)
                return 0;
            for (int start = 1; start + length <= n; start++) {
                unsigned char in = s[start + length - 1];
                if (quota[in] > 0 && ++have[in] == quota[in])
                    below--;
                unsigned char out = s[start - 1];
                // Dropping from exactly-at-quota to one short reopens the
                // debt; deeper surpluses change nothing.
                if (quota[out] > 0 && have[out]-- == quota[out])
                    below++;
                if (below == 0)
                    return start;
            }
            return -1;
        };
        // Coverage is monotone in the length: a covering window of length
        // L sits inside a covering window of length L + 1, so "some window
        // of length L covers t" is false below the answer and true from it
        // upward. Binary search for the smallest surviving length.
        int lo = (int)t.size(), hi = n;
        int bestStart = -1, bestLen = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int start = covers(mid);
            if (start >= 0) {
                bestStart = start;
                bestLen = mid;
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        // Within the minimal length the scan reports the leftmost cover,
        // the same window the shrinking sweep settles on.
        return bestStart < 0 ? "" : s.substr(bestStart, bestLen);
    }
};

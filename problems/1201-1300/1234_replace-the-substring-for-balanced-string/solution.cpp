class Solution {
  public:
    int balancedString(string s) {
        int n = (int)s.size();
        int target = n / 4;
        // Surplus letters are the only ones the window must cover.
        array<int, 128> total{};
        for (char ch : s)
            ++total[(unsigned char)ch];
        array<int, 128> need{};
        int kinds = 0;
        for (int c = 'A'; c <= 'Z'; ++c) {
            if (total[c] > target) {
                need[c] = total[c] - target;
                ++kinds;
            }
        }
        if (kinds == 0)
            return 0;
        array<int, 128> window{};
        int served = 0, best = n, left = 0;
        for (int right = 0; right < n; ++right) {
            int ch = (unsigned char)s[right];
            if (need[ch] > 0 && ++window[ch] == need[ch])
                ++served;
            while (served == kinds) {
                best = min(best, right - left + 1);
                int leftCh = (unsigned char)s[left];
                if (need[leftCh] > 0) {
                    if (window[leftCh] == need[leftCh])
                        --served;
                    --window[leftCh];
                }
                ++left;
            }
        }
        return best;
    }
};

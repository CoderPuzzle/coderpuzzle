#include <array>
#include <string>

class Solution {
  public:
    long long validSubstringCount(string word1, string word2) {
        // A window is valid exactly when its counts cover word2's counts.
        // Track how many required characters are still `missing`; when it
        // hits zero every extension r' >= r of the current right end works,
        // contributing n - r windows for this left end. The minimal right
        // end never decreases as l advances, so each character enters and
        // leaves the window once — linear overall. The answer reaches
        // ~n^2/2 = 5e11, so it is accumulated in a long long.
        const int n = (int)word1.size();
        array<int, 26> need{};
        for (char c : word2)
            need[c - 'a']++;
        int missing = 0;
        for (int c = 0; c < 26; ++c)
            missing += need[c];
        array<int, 26> have{};
        long long total = 0;
        int r = 0;
        for (int l = 0; l < n; ++l) {
            // Grow the window until it first covers word2.
            while (r < n && missing > 0) {
                int c = word1[r] - 'a';
                have[c]++;
                if (need[c] > 0 && have[c] <= need[c])
                    missing--;
                r++;
            }
            if (missing > 0)
                // No window starting at l (or any later l) can cover word2.
                break;
            total += n - (r - 1);
            // Drop word1[l] before moving to the next left end.
            int c = word1[l] - 'a';
            have[c]--;
            if (need[c] > 0 && have[c] < need[c])
                missing++;
        }
        return total;
    }
};

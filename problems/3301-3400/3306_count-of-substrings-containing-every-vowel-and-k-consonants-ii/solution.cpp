#include <array>
#include <string>

class Solution {
  public:
    long long countOfSubstrings(string word, int k) {
        // Count windows with all five vowels and >= c consonants, for c = k
        // and c = k + 1; their difference is the number with exactly k
        // consonants. For each left end l, grow r until the window first
        // qualifies; that minimal right end never moves backwards, so every
        // character enters and leaves the window once — linear overall. The
        // answer reaches ~n^2/2 = 2e10, so it is accumulated in a long long.
        auto vowelIndex = [](char c) -> int {
            switch (c) {
            case 'a':
                return 0;
            case 'e':
                return 1;
            case 'i':
                return 2;
            case 'o':
                return 3;
            case 'u':
                return 4;
            default:
                return -1;
            }
        };
        auto atLeast = [&](int need) {
            array<int, 5> have{};
            int distinct = 0;
            int cons = 0;
            long long total = 0;
            int r = 0;
            const int n = (int)word.size();
            for (int l = 0; l < n; ++l) {
                // Grow the window until it has every vowel and >= need consonants.
                while (r < n && (distinct < 5 || cons < need)) {
                    int v = vowelIndex(word[r]);
                    if (v >= 0) {
                        if (have[v]++ == 0)
                            distinct++;
                    } else {
                        cons++;
                    }
                    r++;
                }
                if (distinct < 5 || cons < need)
                    // No window starting at l (or any later l) can qualify.
                    break;
                total += n - (r - 1);
                // Drop word[l] before moving to the next left end.
                int v = vowelIndex(word[l]);
                if (v >= 0) {
                    if (--have[v] == 0)
                        distinct--;
                } else {
                    cons--;
                }
            }
            return total;
        };
        return atLeast(k) - atLeast(k + 1);
    }
};

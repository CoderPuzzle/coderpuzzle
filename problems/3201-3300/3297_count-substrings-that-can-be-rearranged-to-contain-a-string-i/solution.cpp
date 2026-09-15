#include <string>
#include <vector>

class Solution {
  public:
    long long validSubstringCount(std::string word1, std::string word2) {
        // need[c] is how many copies of c a valid window must contain, and
        // missing counts the distinct letters whose quota is not yet met.
        std::vector<int> need(26, 0);
        for (char ch : word2) {
            need[ch - 'a']++;
        }
        int missing = 0;
        for (int c = 0; c < 26; ++c) {
            if (need[c] > 0) {
                missing++;
            }
        }
        std::vector<int> window(26, 0);
        long long total = 0;
        int left = 0;
        int n = static_cast<int>(word1.size());
        for (int right = 0; right < n; ++right) {
            int ci = word1[right] - 'a';
            window[ci]++;
            if (window[ci] == need[ci]) {
                missing--;
            }
            if (missing == 0) {
                // Shrink while the left character is not load-bearing: its
                // removal leaves every quota intact. When this stops,
                // [left..right] is the minimal covering window ending at
                // right, so starts 0..left all yield valid substrings.
                while (window[word1[left] - 'a'] - 1 >= need[word1[left] - 'a']) {
                    window[word1[left] - 'a']--;
                    left++;
                }
                total += left + 1;
            }
        }
        return total;
    }
};

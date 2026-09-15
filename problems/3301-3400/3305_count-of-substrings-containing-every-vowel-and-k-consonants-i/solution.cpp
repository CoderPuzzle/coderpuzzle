#include <string>

class Solution {
  public:
    int countOfSubstrings(std::string word, int k) {
        // For each start, grow the window rightward maintaining a 5-bit
        // vowel mask and a running consonant total; count every end where
        // all five vowels are present and exactly k consonants are inside.
        int n = static_cast<int>(word.size());
        int total = 0;
        for (int start = 0; start < n; ++start) {
            int seen = 0;
            int consonants = 0;
            for (int end = start; end < n; ++end) {
                switch (word[end]) {
                case 'a':
                    seen |= 1 << 0;
                    break;
                case 'e':
                    seen |= 1 << 1;
                    break;
                case 'i':
                    seen |= 1 << 2;
                    break;
                case 'o':
                    seen |= 1 << 3;
                    break;
                case 'u':
                    seen |= 1 << 4;
                    break;
                default:
                    consonants++;
                    break;
                }
                if (seen == 31 && consonants == k) {
                    total++;
                }
            }
        }
        return total;
    }
};

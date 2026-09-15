class Solution {
  public:
    // One pass over vowel runs. A beautiful substring is a maximal run of
    // non-decreasing vowels containing all five; extend the run while the
    // next vowel is >= the current one, then score it.
    int longestBeautifulSubstring(string word) {
        const string ORDER = "aeiou";
        int best = 0;
        int n = word.size();
        int i = 0;
        while (i < n) {
            if (word[i] != 'a') {
                i++;
                continue;
            }
            int seen = 1; // bit 0 set: 'a' present
            int j = i + 1;
            while (j < n && word[j] >= word[j - 1]) {
                seen |= 1 << ORDER.find(word[j]);
                j++;
            }
            if (seen == 31) {
                best = max(best, j - i);
            }
            i = j > i ? j : i + 1;
        }
        return best;
    }
};

class Solution {
  public:
    int maxFreqSum(string s) {
        // One pass into 26 buckets, then the max over the vowel buckets and
        // the max over the consonant buckets. Missing letters (no vowels or
        // no consonants at all) stay at 0, matching the statement's rule.
        array<int, 26> counts{};
        for (char ch : s)
            counts[ch - 'a']++;
        int bestVowel = 0, bestConsonant = 0;
        for (int i = 0; i < 26; ++i) {
            char ch = 'a' + i;
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u')
                bestVowel = max(bestVowel, counts[i]);
            else
                bestConsonant = max(bestConsonant, counts[i]);
        }
        return bestVowel + bestConsonant;
    }
};

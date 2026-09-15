class Solution {
  public:
    string reverseVowels(string s) {
        // C++ strings are mutable, so this is the true in-place scan: two
        // pointers walk inward and only vowel positions are ever written.
        const string vowels = "aeiouAEIOU";
        int lo = 0, hi = (int)s.size() - 1;
        while (lo < hi) {
            // Advance whichever side does not sit on a vowel.
            if (vowels.find(s[lo]) == string::npos) {
                lo++;
            } else if (vowels.find(s[hi]) == string::npos) {
                hi--;
            } else {
                // Both ends hold a vowel: swap them and step both inward.
                swap(s[lo++], s[hi--]);
            }
        }
        return s;
    }
};

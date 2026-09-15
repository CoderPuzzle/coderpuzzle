class Solution {
  public:
    bool isVowel(char c) { return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'; }
    int beautifulSubstrings(string s, int k) {
        // Straight from the definition: for each start, extend the
        // substring while maintaining the vowel-minus-consonant balance.
        // Balance 0 means equal vowel and consonant counts, each equal to
        // half the length, so the divisibility test is
        // ((L / 2) * (L / 2)) % k == 0.
        int n = s.size();
        int total = 0;
        for (int i = 0; i < n; i++) {
            int balance = 0;
            for (int j = i; j < n; j++) {
                balance += isVowel(s[j]) ? 1 : -1;
                if (balance == 0) {
                    int half = (j - i + 1) / 2;
                    if ((half * half) % k == 0)
                        total++;
                }
            }
        }
        return total;
    }
};

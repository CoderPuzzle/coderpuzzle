class Solution {
  public:
    bool halvesAreAlike(string s) {
        // Only the vowel totals of the two halves matter — which vowel it
        // is, where it sits, and whether it is upper- or lowercase are all
        // irrelevant. One pass with a single counter: +1 for every vowel in
        // the first half, -1 for every vowel in the second; equal totals
        // land the counter back at exactly zero.
        int half = s.size() / 2;
        int balance = 0;
        for (size_t i = 0; i < s.size(); i++) {
            if (isVowel(s[i])) {
                balance += i < static_cast<size_t>(half) ? 1 : -1;
            }
        }
        return balance == 0;
    }

  private:
    static bool isVowel(char c) {
        switch (c) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
        case 'A':
        case 'E':
        case 'I':
        case 'O':
        case 'U':
            return true;
        default:
            return false;
        }
    }
};

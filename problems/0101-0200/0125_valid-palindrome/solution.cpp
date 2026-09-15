class Solution {
  public:
    bool isPalindrome(string s) {
        // Two pointers walk inward from both ends. Each skips the characters
        // the rules erase, so one lowercase comparison per surviving pair
        // decides the answer and no filtered copy of s is ever built.
        int left = 0, right = (int)s.size() - 1;
        while (left < right) {
            while (left < right && !isAlphanumeric(s[left]))
                left++;
            while (left < right && !isAlphanumeric(s[right]))
                right--;
            // Comparing lowercased characters applies the case rule in place;
            // digits lower to themselves, so one path covers both kinds.
            if (lower(s[left]) != lower(s[right]))
                return false;
            left++;
            right--;
        }
        return true;
    }

  private:
    // Explicit ASCII ranges instead of library helpers: digits, then letters.
    static bool isAlphanumeric(char c) {
        return (c >= '0' && c <= '9') || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    }

    // Uppercase folds onto lowercase by its distance from 'A'; every other
    // character, digits included, maps to itself.
    static char lower(char c) { return (c >= 'A' && c <= 'Z') ? (char)(c + 'a' - 'A') : c; }
};

class Solution {
  public:
    bool canConstruct(string s, int k) {
        // Splitting all of s across k palindromes needs one character per
        // string at minimum, and every letter with an odd count must anchor
        // the center of a different palindrome. Both bounds are achievable
        // simultaneously, so checking them is enough.
        if (static_cast<int>(s.size()) < k) {
            return false;
        }
        array<int, 26> counts{};
        for (char ch : s) {
            ++counts[ch - 'a'];
        }
        int odd = 0;
        for (int count : counts) {
            odd += count % 2;
        }
        return odd <= k;
    }
};

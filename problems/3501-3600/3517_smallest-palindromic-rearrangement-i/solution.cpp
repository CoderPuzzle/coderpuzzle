class Solution {
  public:
    string smallestPalindrome(string s) {
        // A palindrome is (half) + (odd char, at most one) + reverse(half),
        // and the half's multiset is forced: exactly count[c] // 2 of each
        // letter. So the smallest palindrome is the sorted half, mirrored.
        int counts[26] = {};
        for (char ch : s) {
            counts[ch - 'a'] += 1;
        }
        string half;
        char middle = 0;
        for (int i = 0; i < 26; ++i) {
            half.append(counts[i] / 2, char('a' + i));
            if (counts[i] % 2 == 1) {
                middle = char('a' + i);
            }
        }
        string tail(half.rbegin(), half.rend());
        return half + (middle ? string(1, middle) : string()) + tail;
    }
};

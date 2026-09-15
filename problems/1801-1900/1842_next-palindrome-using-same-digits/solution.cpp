#include <algorithm>

class Solution {
  public:
    // A palindrome is fully determined by its first half (the middle digit
    // of an odd-length palindrome is fixed by the multiset). The smallest
    // larger palindrome rearranging the same digits is the next
    // permutation of the first floor(n/2) digits, mirrored.
    string nextPalindrome(string num) {
        int n = num.size();
        if (n == 1) {
            return "";
        }
        string half = num.substr(0, n / 2);
        if (!next_permutation(half.begin(), half.end())) {
            return "";
        }
        string mirrored(half.rbegin(), half.rend());
        if (n % 2 == 0) {
            return half + mirrored;
        }
        return half + string(1, num[n / 2]) + mirrored;
    }
};

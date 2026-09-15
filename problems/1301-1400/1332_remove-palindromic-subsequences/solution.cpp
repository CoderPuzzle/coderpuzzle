class Solution {
  public:
    int removePalindromeSub(string s) {
        // One letter's positions form a palindrome by themselves, so two
        // steps always suffice; a single step works iff s is a palindrome.
        int left = 0;
        int right = (int)s.size() - 1;
        while (left < right) {
            if (s[left] != s[right]) {
                return 2;
            }
            ++left;
            --right;
        }
        return 1;
    }
};

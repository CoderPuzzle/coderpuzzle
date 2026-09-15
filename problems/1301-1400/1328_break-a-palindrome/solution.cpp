class Solution {
  public:
    string breakPalindrome(string &palindrome) {
        // One change in the first half decides lexicographic order; lower the
        // first non-'a' there to 'a'. All-'a' halves force the last spot to
        // 'b'; length 1 can never stop being a palindrome.
        int n = (int)palindrome.size();
        if (n == 1) {
            return "";
        }
        for (int i = 0; i < n / 2; ++i) {
            if (palindrome[i] != 'a') {
                palindrome[i] = 'a';
                return palindrome;
            }
        }
        palindrome[n - 1] = 'b';
        return palindrome;
    }
};

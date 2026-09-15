class Solution {

    public boolean isStrictlyPalindromic(int n) {
        // In base n - 2 the number n is always "12" (n = (n-2) + 2),
        // which is not palindromic, so nothing is strictly palindromic.
        return false;
    }
}

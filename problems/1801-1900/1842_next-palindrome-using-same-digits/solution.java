class Solution {

    // A palindrome is fully determined by its first half (the middle digit
    // of an odd-length palindrome is fixed by the multiset). The smallest
    // larger palindrome rearranging the same digits is the next
    // permutation of the first floor(n/2) digits, mirrored.
    public String nextPalindrome(String num) {
        int n = num.length();
        if (n == 1) {
            return "";
        }
        char[] half = num.substring(0, n / 2).toCharArray();
        int i = half.length - 2;
        while (i >= 0 && half[i] >= half[i + 1]) {
            i--;
        }
        if (i < 0) {
            return "";
        }
        int j = half.length - 1;
        while (half[j] <= half[i]) {
            j--;
        }
        char tmp = half[i];
        half[i] = half[j];
        half[j] = tmp;
        for (int lo = i + 1, hi = half.length - 1; lo < hi; lo++, hi--) {
            char t = half[lo];
            half[lo] = half[hi];
            half[hi] = t;
        }
        String h = new String(half);
        StringBuilder mirrored = new StringBuilder(h).reverse();
        if (n % 2 == 0) {
            return h + mirrored;
        }
        return h + num.charAt(n / 2) + mirrored;
    }
}

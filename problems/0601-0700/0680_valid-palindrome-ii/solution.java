class Solution {

    public boolean validPalindrome(String s) {
        // Walk two pointers inward while the outer pairs agree. The first
        // mismatch is the only place a deletion can matter: it must remove
        // one end of the broken pair, so the answer is whether the stretch
        // without the left char or the stretch without the right char is an
        // exact palindrome. An unbroken walk needs no deletion at all.
        int lo = 0,
            hi = s.length() - 1;
        while (lo < hi) {
            if (s.charAt(lo) != s.charAt(hi)) {
                return isPalindrome(s, lo + 1, hi) || isPalindrome(s, lo, hi - 1);
            }
            lo++;
            hi--;
        }
        return true;
    }

    // Exact palindrome test on the inclusive index range [lo, hi].
    private boolean isPalindrome(String s, int lo, int hi) {
        while (lo < hi) {
            if (s.charAt(lo) != s.charAt(hi)) {
                return false;
            }
            lo++;
            hi--;
        }
        return true;
    }
}

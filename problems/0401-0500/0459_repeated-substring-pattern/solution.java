class Solution {

    public boolean repeatedSubstringPattern(String s) {
        // Only a proper divisor length can work: the block must divide n and
        // be shorter than it, so s is at least two copies of the block.
        int n = s.length();
        for (int d = 1; d <= n / 2; ++d) {
            if (
                n % d == 0 &&
                s
                    .substring(0, d)
                    .repeat(n / d)
                    .equals(s)
            ) {
                return true;
            }
        }
        return false;
    }
}

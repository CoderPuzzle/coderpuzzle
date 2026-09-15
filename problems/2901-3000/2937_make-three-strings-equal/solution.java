class Solution {

    public int findMinimumOperations(String s1, String s2, String s3) {
        // Deletions only ever shorten a string from the right, so the
        // final shared string is a prefix of each input — and it must be
        // non-empty. Every string is trimmed to the longest common
        // prefix, and each deletion is forced, so the operation count is
        // the sum of the three overshoot lengths.
        int limit = Math.min(s1.length(), Math.min(s2.length(), s3.length()));
        int common = 0;
        while (common < limit && s1.charAt(common) == s2.charAt(common) && s2.charAt(common) == s3.charAt(common)) {
            common += 1;
        }
        if (common == 0) {
            return -1;
        }
        return s1.length() + s2.length() + s3.length() - 3 * common;
    }
}

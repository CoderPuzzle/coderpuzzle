class Solution {

    public int longestSubsequence(String s, int k) {
        // k <= 1e9 < 2^30, so a cost of 1L << length never fits once
        // length reaches 30; the cap keeps the shift small.
        long value = 0;
        int length = 0;
        for (int index = s.length() - 1; index >= 0; index--) {
            if (s.charAt(index) == '0') {
                length++;
            } else if (length < 30 && value + (1L << length) <= k) {
                value += 1L << length;
                length++;
            }
        }
        return length;
    }
}

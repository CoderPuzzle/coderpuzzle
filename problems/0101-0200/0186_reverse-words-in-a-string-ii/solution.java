class Solution {

    public String reverseWords(String s) {
        // Java strings are immutable, so the flips run on a char array — the
        // honest equivalent of the in-place algorithm.
        char[] chars = s.toCharArray();
        // Flip the whole text once: the words land in reverse order, each with
        // its letters backwards. Re-flipping every word restores the letters.
        reverseRange(chars, 0, chars.length - 1);
        int n = chars.length,
            start = 0;
        for (int stop = 0; stop <= n; ++stop) {
            // A word ends at each separating space (and at the end of the line).
            if (stop == n || chars[stop] == ' ') {
                reverseRange(chars, start, stop - 1);
                start = stop + 1;
            }
        }
        return new String(chars);
    }

    // Flip a range of the buffer in place, endpoints included.
    private static void reverseRange(char[] chars, int lo, int hi) {
        while (lo < hi) {
            char tmp = chars[lo];
            chars[lo++] = chars[hi];
            chars[hi--] = tmp;
        }
    }
}

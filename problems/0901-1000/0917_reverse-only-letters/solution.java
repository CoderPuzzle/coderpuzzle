class Solution {

    private static boolean isLetter(char c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    }

    public String reverseOnlyLetters(String s) {
        // Java strings are immutable, so the scan runs on a char array — the
        // honest equivalent of the in-place algorithm.
        char[] chars = s.toCharArray();
        int lo = 0,
            hi = chars.length - 1;
        while (lo < hi) {
            // Advance whichever side does not sit on a letter.
            if (!isLetter(chars[lo])) {
                lo++;
            } else if (!isLetter(chars[hi])) {
                hi--;
            } else {
                // Both ends hold a letter: swap them and step both inward.
                char tmp = chars[lo];
                chars[lo++] = chars[hi];
                chars[hi--] = tmp;
            }
        }
        return new String(chars);
    }
}

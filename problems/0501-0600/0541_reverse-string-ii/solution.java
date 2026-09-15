class Solution {

    public String reverseStr(String s, int k) {
        // Read the string as consecutive 2k-sized blocks: every block
        // contributes its first k characters reversed, its last k untouched.
        // Walking i in steps of 2k and reversing the window [i, min(i+k, n))
        // needs no special case for the tail — fewer than k characters left
        // makes the window short, so reversing it reverses all of them,
        // while k..2k-1 left makes the window exactly the first k of them.
        char[] chars = s.toCharArray();
        for (int i = 0; i < chars.length; i += 2 * k) {
            int end = Math.min(i + k, chars.length);
            for (int lo = i, hi = end - 1; lo < hi; ++lo, --hi) {
                char tmp = chars[lo];
                chars[lo] = chars[hi];
                chars[hi] = tmp;
            }
        }
        return new String(chars);
    }
}

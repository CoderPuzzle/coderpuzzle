class Solution {

    private static final String VOWELS = "aeiouAEIOU";

    public String reverseVowels(String s) {
        // Java strings are immutable, so the scan runs on a char array — the
        // honest equivalent of the in-place algorithm.
        char[] chars = s.toCharArray();
        int lo = 0,
            hi = chars.length - 1;
        while (lo < hi) {
            // Advance whichever side does not sit on a vowel.
            if (VOWELS.indexOf(chars[lo]) < 0) {
                lo++;
            } else if (VOWELS.indexOf(chars[hi]) < 0) {
                hi--;
            } else {
                // Both ends hold a vowel: swap them and step both inward.
                char tmp = chars[lo];
                chars[lo++] = chars[hi];
                chars[hi--] = tmp;
            }
        }
        return new String(chars);
    }
}

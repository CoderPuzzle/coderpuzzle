class Solution {

    public boolean canConstruct(String s, int k) {
        // Splitting all of s across k palindromes needs one character per
        // string at minimum, and every letter with an odd count must anchor
        // the center of a different palindrome. Both bounds are achievable
        // simultaneously, so checking them is enough.
        if (s.length() < k) {
            return false;
        }
        int[] counts = new int[26];
        for (int index = 0; index < s.length(); ++index) {
            ++counts[s.charAt(index) - 'a'];
        }
        int odd = 0;
        for (int count : counts) {
            if (count % 2 == 1) {
                ++odd;
            }
        }
        return odd <= k;
    }
}

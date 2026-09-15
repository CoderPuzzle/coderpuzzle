class Solution {

    public int longestPalindrome(String s) {
        // A palindrome's wings mirror, so every letter it uses must pair
        // with a same-letter partner on the other side — one slot per
        // letter, lowercase and uppercase separate because case matters.
        int[] counts = new int[52];
        for (int i = 0; i < s.length(); ++i) {
            char ch = s.charAt(i);
            if (ch <= 'Z') {
                counts[ch - 'A']++;
            } else {
                counts[26 + ch - 'a']++;
            }
        }
        // Pairs contribute one letter to each wing; at most one unpaired
        // letter can occupy the center, so add 1 exactly when some count
        // is odd and leave every other leftover unused.
        int pairs = 0;
        boolean hasOdd = false;
        for (int count : counts) {
            pairs += count / 2;
            if (count % 2 == 1) {
                hasOdd = true;
            }
        }
        return pairs * 2 + (hasOdd ? 1 : 0);
    }
}

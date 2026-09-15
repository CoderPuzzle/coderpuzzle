class Solution {

    // Consistency depends only on which letters a word uses, so fold allowed
    // into one 26-bit mask: bit i means 'a' + i may appear.
    public int countConsistentStrings(String allowed, String[] words) {
        int allowedMask = 0;
        for (int index = 0; index < allowed.length(); ++index) {
            allowedMask |= 1 << (allowed.charAt(index) - 'a');
        }
        int count = 0;
        for (String word : words) {
            int mask = 0;
            for (int index = 0; index < word.length(); ++index) {
                mask |= 1 << (word.charAt(index) - 'a');
            }
            // the word is consistent exactly when its mask holds no bit
            // outside allowedMask — one AND answers the subset question
            if ((mask & ~allowedMask) == 0) {
                ++count;
            }
        }
        return count;
    }
}

class Solution {

    public boolean checkStrings(String s1, String s2) {
        // Swapping indices whose distance is even keeps every character inside
        // its own index-parity class, and any two positions of one class are
        // directly swappable, so each class is freely rearrangeable. The strings
        // can therefore be made equal exactly when each parity class holds the
        // same multiset of characters in both strings.
        int[][] counts = new int[2][26];
        for (int index = 0; index < s1.length(); ++index) {
            ++counts[index % 2][s1.charAt(index) - 'a'];
        }
        for (int index = 0; index < s2.length(); ++index) {
            if (--counts[index % 2][s2.charAt(index) - 'a'] < 0) {
                // s2's parity class needs a copy this character s1 cannot supply.
                return false;
            }
        }
        return true;
    }
}

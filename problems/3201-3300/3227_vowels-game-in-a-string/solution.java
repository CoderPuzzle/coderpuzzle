class Solution {

    public boolean doesAliceWin(String s) {
        // Alice must remove an odd-vowel substring; Bob an even-vowel one.
        // With no vowel, every substring holds zero vowels and Alice is stuck
        // at her first move. An odd vowel total lets her delete the whole
        // string; an even positive total turns odd after she removes a single
        // vowel (count 1), and Bob's even removals never restore parity nor
        // empty the string — so Alice wins exactly when s contains a vowel.
        for (int i = 0; i < s.length(); ++i) {
            char c = s.charAt(i);
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                return true;
            }
        }
        return false;
    }
}

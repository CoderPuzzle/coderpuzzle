import java.util.Arrays;

class Solution {

    public int minimumKeypresses(String s) {
        // Each letter's press count is its position among the sorted
        // frequencies: the most frequent 9 are pressed once, the next 9
        // twice, and the remaining 8 three times.
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); ++i) {
            freq[s.charAt(i) - 'a']++;
        }
        Arrays.sort(freq);
        int presses = 0;
        for (int rank = 0; rank < 26; ++rank) {
            presses += freq[26 - 1 - rank] * (rank / 9 + 1);
        }
        return presses;
    }
}

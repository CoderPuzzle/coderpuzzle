import java.util.Arrays;

class Solution {

    public int maxSubstrings(String word) {
        // Substrings may not share an index, so this is interval
        // scheduling: taking the earliest-finishing valid substring at
        // each step can never push a later choice further right. Scan
        // once, remember each letter's first index inside the current
        // window, and when the running index reaches 3 past it, take that
        // substring and restart the window just past its end.
        int[] first = new int[26];
        Arrays.fill(first, -1);
        int count = 0;
        for (int i = 0; i < word.length(); i++) {
            int c = word.charAt(i) - 'a';
            if (first[c] < 0) {
                first[c] = i;
            }
            if (i - first[c] >= 3) {
                count++;
                Arrays.fill(first, -1);
            }
        }
        return count;
    }
}

import java.util.Arrays;

class Solution {

    public int countQuadruples(String firstString, String secondString) {
        // Only single-character pairs can be optimal: a longer match
        // shrinks to its two leading characters (same a, smaller j), and
        // each letter does best pairing its first occurrence here with
        // its last occurrence there.
        int n1 = firstString.length();
        int[] first = new int[26];
        int[] last = new int[26];
        Arrays.fill(first, -1);
        Arrays.fill(last, -1);
        for (int i = 0; i < n1; i++) {
            int c = firstString.charAt(i) - 'a';
            if (first[c] == -1) {
                first[c] = i;
            }
        }
        for (int a = 0; a < secondString.length(); a++) {
            last[secondString.charAt(a) - 'a'] = a;
        }
        int best = 0;
        int count = 0;
        boolean any = false;
        for (int c = 0; c < 26; c++) {
            if (first[c] == -1 || last[c] == -1) {
                continue;
            }
            int diff = first[c] - last[c];
            if (!any || diff < best) {
                any = true;
                best = diff;
                count = 1;
            } else if (diff == best) {
                count++;
            }
        }
        return count;
    }
}

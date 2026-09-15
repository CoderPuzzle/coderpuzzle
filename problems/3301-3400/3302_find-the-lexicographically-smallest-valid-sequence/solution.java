import java.util.Arrays;

class Solution {

    public int[] validSequence(String word1, String word2) {
        // last[j] anchors where word2[j:] is still exactly embeddable: one
        // right-to-left sweep matches the tail of word2 against word1 and
        // records, per slot, the index that consumed its character. The
        // forward walk then takes every exact match immediately and spends
        // the single allowed change only when the guard proves the rest of
        // word2 still fits exactly after it (last slot, or i before
        // last[j + 1]); a change already spent forbids further mismatches.
        int m = word2.length();
        int[] ans = new int[m];
        int[] last = new int[m];
        Arrays.fill(last, -1);
        int i = word1.length() - 1;
        int j = m - 1;
        while (i >= 0 && j >= 0) {
            if (word1.charAt(i) == word2.charAt(j)) {
                last[j--] = i;
            }
            --i;
        }
        boolean canChange = true;
        j = 0;
        for (i = 0; i < word1.length(); ++i) {
            if (j == m) {
                break;
            }
            if (word1.charAt(i) == word2.charAt(j)) {
                ans[j++] = i;
            } else if (canChange && (j == m - 1 || i < last[j + 1])) {
                canChange = false;
                ans[j++] = i;
            }
        }
        return j == m ? ans : new int[0];
    }
}

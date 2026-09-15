import java.util.Arrays;

class Solution {

    public String generateString(String str1, String str2) {
        // 'T' windows pin their characters outright: stamp str2 into each
        // one, refusing the instance when two stamps disagree.
        int n = str1.length(),
            m = str2.length();
        int total = n + m - 1;
        char[] word = new char[total];
        boolean[] covered = new boolean[total];
        Arrays.fill(word, '\0');
        for (int i = 0; i < n; ++i) {
            if (str1.charAt(i) == 'T') {
                for (int j = 0; j < m; ++j) {
                    int p = i + j;
                    if (word[p] != '\0' && word[p] != str2.charAt(j)) return "";
                    word[p] = str2.charAt(j);
                    covered[p] = true;
                }
            }
        }
        // Every other position takes 'a', the smallest character available.
        for (int p = 0; p < total; ++p) {
            if (word[p] == '\0') word[p] = 'a';
        }
        // Repair 'F' windows left to right: one that accidentally equals
        // str2 must differ somewhere, and bumping its rightmost free slot
        // from 'a' to 'b' is the smallest change that late in the string.
        char[] target = str2.toCharArray();
        for (int i = 0; i < n; ++i) {
            if (str1.charAt(i) == 'F' && Arrays.equals(word, i, i + m, target, 0, m)) {
                int j = i + m - 1;
                while (j >= i && covered[j]) --j;
                if (j < i) return ""; // fully pinned window that still matches
                word[j] = 'b';
            }
        }
        return new String(word);
    }
}

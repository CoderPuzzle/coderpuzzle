import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] wordSubsets(String[] words1, String[] words2) {
        // Collapse words2 to a single requirement vector: per letter, the
        // max count any one b demands. Covering the max covers every b,
        // because each b is checked independently by the definition.
        int[] need = new int[26];
        for (String b : words2) {
            int[] cb = counts(b);
            for (int i = 0; i < 26; i++) {
                need[i] = Math.max(need[i], cb[i]);
            }
        }

        // A word is universal iff its counts dominate the collapsed demand
        // everywhere; survivors keep their input order.
        List<String> universal = new ArrayList<>();
        for (String a : words1) {
            if (dominates(counts(a), need)) {
                universal.add(a);
            }
        }
        return universal.toArray(new String[0]);
    }

    // One slot per letter: "aba" -> [2, 1, 0, ...].
    private static int[] counts(String s) {
        int[] c = new int[26];
        for (int i = 0; i < s.length(); i++) {
            c[s.charAt(i) - 'a']++;
        }
        return c;
    }

    private static boolean dominates(int[] have, int[] need) {
        for (int i = 0; i < 26; i++) {
            if (have[i] < need[i]) {
                return false;
            }
        }
        return true;
    }
}

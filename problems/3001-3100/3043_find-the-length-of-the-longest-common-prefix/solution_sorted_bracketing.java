import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Solution {

    public int longestCommonPrefix(int[] arr1, int[] arr2) {
        // The deepest cross-array agreement is realized by two lexicographically
        // adjacent entries, so merge both arrays as source-tagged digit strings.
        List<String[]> entries = new ArrayList<>();
        for (int x : arr1) {
            entries.add(new String[] { Integer.toString(x), "0" });
        }
        for (int y : arr2) {
            entries.add(new String[] { Integer.toString(y), "1" });
        }
        // Sort as digit strings, never numerically: only lexicographic order
        // keeps a prefix family in one contiguous block.
        entries.sort(Comparator.comparing(e -> e[0]));
        int best = 0;
        for (int i = 1; i < entries.size(); i++) {
            String[] u = entries.get(i - 1);
            String[] v = entries.get(i);
            // Same-source neighbors cannot witness a cross pair.
            if (u[1].equals(v[1])) {
                continue;
            }
            int shared = 0;
            for (int j = 0; j < u[0].length() && j < v[0].length(); j++) {
                if (u[0].charAt(j) != v[0].charAt(j)) {
                    // Digits diverge: the run cannot extend past here.
                    break;
                }
                shared++;
            }
            if (shared > best) {
                best = shared;
            }
        }
        return best;
    }
}

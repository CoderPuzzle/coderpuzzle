import java.util.ArrayList;
import java.util.List;

class Solution {

    // Augment with '1' at both ends, then run-length encode the result. A
    // trade turns an internal '1'-run (one '0'-run on each side) plus both
    // flanking '0'-runs into '1's, gaining their combined length.
    public int maxActiveSectionsAfterTrade(String s) {
        String t = "1" + s + "1";
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            total += s.charAt(i) - '0';
        }
        List<Integer> runs = new ArrayList<>();
        int i = 0;
        while (i < t.length()) {
            int j = i;
            while (j < t.length() && t.charAt(j) == t.charAt(i)) {
                j++;
            }
            runs.add(j - i);
            i = j;
        }
        // Runs alternate starting with '1', so the internal '1'-runs sit at
        // even indices 2, 4, ..., size - 3 with a '0'-run on each side.
        int best = 0;
        for (int k = 2; k < runs.size() - 2; k += 2) {
            best = Math.max(best, runs.get(k - 1) + runs.get(k + 1));
        }
        return total + best;
    }
}

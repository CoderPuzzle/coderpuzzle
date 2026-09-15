import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maxSameLengthRuns(String s) {
        // One scan cuts s into maximal equal-letter runs; the answer is the
        // largest number of runs that share a single length.
        Map<Integer, Integer> counts = new HashMap<>();
        int n = s.length();
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && s.charAt(j) == s.charAt(i)) {
                j++;
            }
            int length = j - i;
            counts.merge(length, 1, Integer::sum);
            i = j;
        }
        int best = 0;
        for (int count : counts.values()) {
            best = Math.max(best, count);
        }
        return best;
    }
}

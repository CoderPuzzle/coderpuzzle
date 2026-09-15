import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] largeGroupPositions(String s) {
        // Groups are the maximal runs of one character. One scan keeps
        // start, the index where the current run began; whenever s[i]
        // differs from s[i-1] — or i reaches n, a virtual change that
        // closes the final run — the run [start, i-1] is complete, its
        // length i - start is tested against 3, and the interval is
        // appended. Runs close left to right, so the intervals come out
        // already sorted by start.
        List<int[]> groups = new ArrayList<>();
        int n = s.length();
        int start = 0;
        for (int i = 1; i <= n; ++i) {
            if (i == n || s.charAt(i) != s.charAt(i - 1)) {
                if (i - start >= 3) {
                    groups.add(new int[] { start, i - 1 });
                }
                start = i;
            }
        }
        return groups.toArray(new int[0][]);
    }
}

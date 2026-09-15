import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int maxSumSubmatrix(int[][] matrix, int k) {
        int m = matrix.length;
        int n = matrix[0].length;
        Long best = null;
        for (int top = 0; top < m; top++) {
            // colSum[c] = sum of column c between rows top..bottom, so
            // extending the bottom row is one O(n) update; any rectangle
            // in this row pair is a contiguous subarray of colSum.
            long[] colSum = new long[n];
            for (int bottom = top; bottom < m; bottom++) {
                for (int c = 0; c < n; c++) {
                    colSum[c] += matrix[bottom][c];
                }
                long prefix = 0;
                // 0 seeded so a subarray starting at the first column counts.
                List<Long> prefixes = new ArrayList<>();
                prefixes.add(0L);
                for (int c = 0; c < n; c++) {
                    prefix += colSum[c];
                    // Subarray sum = prefix - earlier prefix; the smallest
                    // earlier >= prefix - k maximizes it while staying <= k.
                    long target = prefix - k;
                    int position = Collections.binarySearch(prefixes, target);
                    if (position < 0) {
                        position = -(position + 1); // bisect_left insertion point
                    }
                    if (position < prefixes.size()) {
                        long candidate = prefix - prefixes.get(position);
                        if (best == null || candidate > best) {
                            best = candidate;
                        }
                    }
                    // Keep the list sorted for the next query.
                    int at = Collections.binarySearch(prefixes, prefix);
                    if (at < 0) {
                        at = -(at + 1);
                    }
                    prefixes.add(at, prefix);
                }
            }
        }
        return best.intValue();
    }
}

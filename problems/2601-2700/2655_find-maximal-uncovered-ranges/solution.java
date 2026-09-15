import java.util.Arrays;

class Solution {

    // n can be 10^9, so nothing may touch cells directly. Sorting by
    // start and sweeping a cursor turns every stretch the cursor skips
    // over into one maximal uncovered range: a gap is emitted whenever
    // the next sorted range begins beyond the cursor, and the cursor
    // then jumps past that range's end (overlaps merge implicitly).
    public int[][] findMaximalUncoveredRanges(int n, int[][] ranges) {
        int[][] rs = ranges.clone();
        Arrays.sort(rs, (a, b) -> Integer.compare(a[0], b[0]));
        int[][] tmp = new int[rs.length + 1][];
        int count = 0;
        int cur = 0;
        for (int[] r : rs) {
            int s = r[0];
            int e = r[1];
            if (s > cur) {
                // Cells [cur, s - 1] meet no covering range.
                tmp[count++] = new int[] { cur, s - 1 };
            }
            if (e + 1 > cur) cur = e + 1;
        }
        if (cur < n) {
            tmp[count++] = new int[] { cur, n - 1 };
        }
        return Arrays.copyOf(tmp, count);
    }
}

import java.util.Arrays;

class Solution {

    public int intersectionSizeTwo(int[][] intervals) {
        int n = intervals.length;
        int[][] ivs = new int[n][];
        for (int i = 0; i < n; i++) {
            ivs[i] = new int[] { intervals[i][0], intervals[i][1] };
        }
        Arrays.sort(ivs, (a, b) -> a[1] != b[1] ? Integer.compare(a[1], b[1]) : Integer.compare(b[0], a[0]));
        // Chosen points stay non-decreasing; points inside [s, e] are the
        // trailing run, so checking the last two suffices.
        int[] chosen = new int[2 * n];
        int m = 0;
        for (int[] iv : ivs) {
            int s = iv[0],
                e = iv[1];
            if (m >= 2 && chosen[m - 2] >= s) continue;
            if (m >= 1 && chosen[m - 1] >= s) {
                chosen[m++] = e;
            } else {
                chosen[m++] = e - 1;
                chosen[m++] = e;
            }
        }
        return m;
    }
}
